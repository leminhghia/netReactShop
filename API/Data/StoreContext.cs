using System;
using API.Entities;
using API.Entities.OderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

// public class StoreContext(DbContextOptions options) : DbContext(options)
// {
//     public required DbSet<Product> Products { get; set; }
//     public required DbSet<Basket> Baskets { get; set; }


// }
public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }
    public required DbSet<Order> Orders { get; set; }

    // section 9 step 1
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
        .HasData(
            new IdentityRole { Id = "683ef5e6-a3c9-4be0-bded-0b64256e9f0a", Name = "Member", NormalizedName = "MEMBER" },
            new IdentityRole { Id = "7afca44c-517f-4632-b41e-cc774c90d0b4", Name = "Admin", NormalizedName = "ADMIN" }
        );
    }


}
