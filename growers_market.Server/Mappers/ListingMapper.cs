using System.Text.Json;
using AutoMapper;
using growers_market.Server.Dtos.Listing;
using growers_market.Server.Dtos.Species;
using growers_market.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;

namespace growers_market.Server.Mappers
{
    public class ListingMapperProfile : Profile
    {
        public ListingMapperProfile()
        {
            CreateMap<Listing, ListingDto>()
                .ForMember(dest => dest.AppUser, opt => opt.MapFrom(src => src.AppUser))
                .ForMember(dest => dest.Species, opt => opt.MapFrom(src => src.Species))
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images));
            CreateMap<Listing, CreateListingRequestDto>();
            CreateMap<Listing, UpdateListingRequestDto>();
        }
    }
    public static class ListingMapper
    {
        public static CreateListingRequestDto ToCreateListingRequestDtoFromListingFormDto(this ListingFormDto formDto)
        {
            return new CreateListingRequestDto
            {
                Title = formDto.Title,
                IsForTrade = formDto.IsForTrade,
                Price = formDto.Price,
                Quantity = formDto.Quantity,
                Description = formDto.Description != null ? formDto.Description : "",
                SpeciesId = formDto.SpeciesId,
                ImagePaths = JsonSerializer.Deserialize<List<string>>(formDto.ImagePaths),
                UploadedImages = formDto.UploadedImages != null ? formDto.UploadedImages.ToList() : new List<IFormFile>(),
                ImagePositionsX = JsonSerializer.Deserialize<List<int>>(formDto.ImagePositionsX),
                ImagePositionsY = JsonSerializer.Deserialize<List<int>>(formDto.ImagePositionsY)
            };
        }

        public static UpdateListingRequestDto ToUpdateListingRequestDtoFromListingFormDto(this ListingFormDto formDto)
        {
            var uploadedImages = formDto.UploadedImages != null ? formDto.UploadedImages.ToList() : new List<IFormFile>();

            return new UpdateListingRequestDto
            {
                Title = formDto.Title,
                IsForTrade = formDto.IsForTrade,
                Price = formDto.Price,
                Quantity = formDto.Quantity,
                Description = formDto.Description != null ? formDto.Description : "",
                SpeciesId = formDto.SpeciesId,
                ImagePaths = JsonSerializer.Deserialize<List<string>>(formDto.ImagePaths),
                UploadedImages = formDto.UploadedImages != null ? formDto.UploadedImages.ToList() : new List<IFormFile>(),
                ImagePositionsX = JsonSerializer.Deserialize<List<int>>(formDto.ImagePositionsX),
                ImagePositionsY = JsonSerializer.Deserialize<List<int>>(formDto.ImagePositionsY)
            };
        }
    }
}
