using growers_market.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace growers_market.Server.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
    }
}
