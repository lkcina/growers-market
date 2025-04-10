using growers_market.Server.Dtos.Account;
using growers_market.Server.Dtos.Address;
using growers_market.Server.Models;

namespace growers_market.Server.Mappers
{
    public static class AccountMapper
    {
        public static AppUserDto ToAppUserDto(this AppUser appUser)
        {
            return new AppUserDto
            {
                UserName = appUser.UserName,
                Address = appUser.Address?.ToAddressDto()
            };
        }

    }
}
