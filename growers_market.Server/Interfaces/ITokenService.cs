using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
