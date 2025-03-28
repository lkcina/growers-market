﻿using System.Text.Json;
using growers_market.Server.Dtos.Listing;
using growers_market.Server.Dtos.Species;
using growers_market.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;

namespace growers_market.Server.Mappers
{
    public static class ListingMapper
    {
        public static ListingDto ToListingDto(this Listing listing)
        {
            return new ListingDto
            {
                Id = listing.Id,
                Title = listing.Title,
                IsForTrade = listing.IsForTrade,
                Price = listing.Price,
                Quantity = listing.Quantity,
                Description = listing.Description,
                CreatedAt = listing.CreatedAt,
                AppUserName = listing.AppUserName,
                Species = listing.Species?.ToSpeciesDto(),
                Images = listing.Images
            };
        }

        public static Listing ToListingFromCreateDto(this CreateListingRequestDto createDto)
        {
            return new Listing
            {
                Title = createDto.Title,
                IsForTrade = createDto.IsForTrade,
                Price = createDto.Price,
                Quantity = createDto.Quantity,
                Description = createDto.Description,
                SpeciesId = createDto.SpeciesId
            };
        }

        public static Listing ToListingFromUpdateDto(this UpdateListingRequestDto updateDto)
        {
            return new Listing
            {
                Title = updateDto.Title,
                IsForTrade = updateDto.IsForTrade,
                Price = updateDto.Price,
                Quantity = updateDto.Quantity,
                Description = updateDto.Description,
                SpeciesId = updateDto.SpeciesId
            };
        }

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
                UploadedImages = formDto.UploadedImages != null ? formDto.UploadedImages.ToList() : new List<IFormFile>()
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
                UploadedImages = formDto.UploadedImages != null ? formDto.UploadedImages.ToList() : new List<IFormFile>()
            };
        }
    }
}
