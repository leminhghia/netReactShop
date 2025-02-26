using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();
        if (basket == null) return NoContent();
        
        return basket.ToDto();
    }
    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {

        //get basket 
        var basket = await RetrieveBasket();
        //create bassket
        basket ??= CreateBasket();
        //get product
        var product = await context.Products.FindAsync(productId);
        if (product == null) return BadRequest("Problem adding item to baket");
        //add item to basket
        basket.AddItem(product, quantity);
        //savechange
        var result = await context.SaveChangesAsync() > 0;
        //http
        if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());

        return BadRequest("Problem updating basket");
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        //get basket
        var basket = await RetrieveBasket();
        if (basket == null) return BadRequest("Unable to retrieve basket");
        //remove the item or  reduce its quantity
        basket.RemoveItem(productId, quantity);
        //save change
         var result = await context.SaveChangesAsync() > 0;
        //http
        if (result) return Ok();

        return BadRequest("Problem updating basket");

    }

    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
        .Include(x => x.Items)
        .ThenInclude(x => x.Product)
        .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }

    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        var cookiesOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("basketId", basketId, cookiesOptions);
        var basket = new Basket { BasketId = basketId };
        context.Baskets.Add(basket);
        return basket;
    }


}
