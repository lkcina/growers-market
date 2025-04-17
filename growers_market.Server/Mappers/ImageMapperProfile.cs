using AutoMapper;
using growers_market.Server.Dtos.Address;
using growers_market.Server.Dtos.ImagePosition;
using growers_market.Server.Models;

namespace growers_market.Server.Mappers
{
    public class ImageMapperProfile : Profile
    {
        public ImageMapperProfile()
        {
            CreateMap<Image, ImageDto>();
        }
    }
}
