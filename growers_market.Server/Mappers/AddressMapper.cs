﻿using System.Linq;
using AutoMapper;
using growers_market.Server.Dtos.Address;
using growers_market.Server.Models;

namespace growers_market.Server.Mappers
{
    public class AddressMapperProfile : Profile
    {
        public AddressMapperProfile()
        {
            CreateMap<Address, AddressDto>();
        }
    }
    public static class AddressMapper
    {
        public static Address ToAddressFromGoogleAddressDto(this GoogleAddressDto addressDto)
        {
            var addressComponents = addressDto.results[0].address_components;
            var streetAddress = $"{addressComponents.Find((comp) => comp.types.Contains("street_number"))?.short_name}" + " " + $"{addressComponents.Find((comp) => comp.types.Contains("route"))?.short_name}";

            return new Address
            {
                StreetAddressLine1 = streetAddress,
                StreetAddressLine2 = addressComponents.Find((comp) => comp.types.Contains("subpremise"))?.short_name,
                City = addressComponents.Find((comp) => comp.types.Contains("locality"))?.short_name,
                State = addressComponents.Find((comp) => comp.types.Contains("administrative_area_level_1"))?.short_name,
                PostalCode = addressComponents.Find((comp) => comp.types.Contains("postal_code"))?.short_name,
                Latitude = addressDto.results[0].geometry.location.lat,
                Longitude = addressDto.results[0].geometry.location.lng
            };
        }
    }
}
