using AutoMapper;
using growers_market.Server.Dtos.Message;
using growers_market.Server.Models;

namespace growers_market.Server.Mappers
{
    public class MessageMapperProfile : Profile
    {
        public MessageMapperProfile()
        {
            CreateMap<Message, MessageDto>();
            CreateMap<CreateMessageRequestDto, Message>();
        }
    }
}
