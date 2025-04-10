using growers_market.Server.Dtos.Address;

namespace growers_market.Server.Dtos.Account
{
    public class AppUserDto
    {
        public string UserName { get; set; }
        public AddressDto Address { get; set; }
    }
}
