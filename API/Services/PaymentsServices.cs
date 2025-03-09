using System;
using API.Entities;
using Stripe;

namespace API.Services;

public class PaymentsServices(IConfiguration config)
{
    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
    {
        System.Diagnostics.Debug.WriteLine($"Stripe API Key: {config["StripeSettings:SecretKey"]}");
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];

        var service = new PaymentIntentService();

        var intent = new PaymentIntent();

        var subtotal = basket.Items.Sum(x => x.Quantity * x.Product.Price);

        var deliveryFee = subtotal > 10000 ? 0 : 500;
        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = subtotal + deliveryFee,
                Currency = "usd",
                PaymentMethodTypes = ["card"]
            };
            intent = await service.CreateAsync(options);
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = subtotal + deliveryFee,

            };
           intent =  await service.UpdateAsync(basket.PaymentIntentId, options);
        }
                System.Diagnostics.Debug.WriteLine($"Stripe API Key: {config["StripeSettings:SecretKey"]}");

        return intent;
    }
}
