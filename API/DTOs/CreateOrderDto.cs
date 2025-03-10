using System;
using API.Entities.OderAggregate;

namespace API.DTOs;

public class CreateOrderDto
{
public required ShippingAddress ShippingAddress { get; set; }
public required PaymentSummary PaymentSummary { get; set; }

}

