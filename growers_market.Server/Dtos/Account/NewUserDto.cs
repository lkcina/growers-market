using growers_market.Server.Models;
using growers_market.Server.Dtos.Address;

namespace growers_market.Server.Dtos.Account
{
    public class NewUserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public Models.Address Address { get; set; }
        public string Token { get; set; }
    }
}
