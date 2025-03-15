using System;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        //So we're going to specify our create product DTo and where we want to map into.
        CreateMap<CreateProductDtos, Product>();
        CreateMap<UpdateProductDto, Product>();

    }
}
