using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers;
[Authorize]
public class OrdersController(StoreContext context) : BaseApiController
{
    [HttpGet]
    // khi dung projetToDto, enitty ko track dc , boi vi Lỗi này xảy ra khi bạn truy vấn một thực thể sở hữu (owned entity) mà không có thực thể cha (owner entity), trong khi Entity Framework đang theo dõi dữ liệu (tracking query). 
    public async Task<ActionResult<List<OrderDto>>> GetOrders()
    {
        var orders = await context.Orders
        .ProjectToDto()
        .Where(x => x.BuyerEmail == User.GetUsername())
        .ToListAsync();

        return orders;
    }
    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
    {
        var order = await context.Orders
         .ProjectToDto()
       .Where(x => x.BuyerEmail == User.GetUsername() && id == x.Id)
       .FirstOrDefaultAsync();
        if (order == null) return NotFound();
        return order;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null || basket.Items.Count == 0 || string.IsNullOrEmpty(basket.PaymentIntentId))
            return BadRequest("request is empty or not found");

        var items = CreateOrderItems(basket.Items);
        if (items == null) return BadRequest("Some items out of stock");
        var subtotal = items.Sum(x => x.Price * x.Quantity);

        var deliveryFee = CalculateDeliveryFee(subtotal);

        var order = await context.Orders
        .Include(x => x.OrderItems)
        .FirstOrDefaultAsync(x => x.PaymentIntentId == basket.PaymentIntentId);
        if (order == null)
        {
            order = new Order
            {
                OrderItems = items,
                BuyerEmail = User.GetUsername(),
                ShippingAddress = orderDto.ShippingAddress,
                SubTotal = subtotal,
                PaymentSummary = orderDto.PaymentSummary,
                PaymentIntentId = basket.PaymentIntentId
            };
            context.Orders.Add(order);
        }
        else
        {
            order.OrderItems = items;
        }


      
        var result = await context.SaveChangesAsync() > 0;
        if (!result) return BadRequest("Problem creating order");
        return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, order.ToDto());
    }

    private long CalculateDeliveryFee(long subtotal)
    {
        return subtotal > 1000 ? 0 : 500;
    }

    private List<OrderItem>? CreateOrderItems(List<BasketItem> items)
    {
        var orderItems = new List<OrderItem>();

        foreach (var item in items)
        {
            if (item.Product.QuanityInStock < item.Quantity)
                return null;

            var orderItem = new OrderItem
            {
                ItemOrdered = new ProductItemOrdered
                {
                    ProductId = item.ProductId,
                    PictureUrl = item.Product.PictureUrl,
                    Name = item.Product.Name
                },
                Price = item.Product.Price,
                Quantity = item.Quantity
            };
            orderItems.Add(orderItem);

            item.Product.QuanityInStock -= item.Quantity;
        }
        return orderItems;
    }
}
