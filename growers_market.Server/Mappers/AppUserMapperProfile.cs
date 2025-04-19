using AutoMapper;
using growers_market.Server.Dtos.Account;
using growers_market.Server.Dtos.Address;
using growers_market.Server.Models;

namespace growers_market.Server.Mappers
{
    public class AppUserMapperProfile : Profile
    {
        public AppUserMapperProfile()
        {
            CreateMap<AppUser, AppUserDto>()
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address));
        }
    }
}
