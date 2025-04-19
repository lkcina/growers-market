using growers_market.Server.Dtos.Chat;
using growers_market.Server.Models;
using AutoMapper;

namespace growers_market.Server.Mappers
{
    public class ChatMapperProfile : Profile
    {
        public ChatMapperProfile()
        {
            CreateMap<Chat, ChatDto>()
                .ForMember(dest => dest.Listing, opt => opt.MapFrom(src => src.Listing))
                .ForMember(dest => dest.Messages, opt => opt.MapFrom(src => src.Messages));
        }
    }
}
