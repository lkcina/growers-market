using growers_market.Server.Dtos.Listing;
using growers_market.Server.Models;

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
                SpeciesId = listing.SpeciesId
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
    }
}
