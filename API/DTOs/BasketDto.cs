using System;

namespace API.DTOs;

public class BasketDto
{
    public int Id { get; set; }
    public required string BasketId { get; set; }
    //1 to many
    public List<BasketItemDto> Items { get; set; } = [];
    public string? ClientSecret { get; set; }

    public string? PaymentIntentId { get; set; }
}
