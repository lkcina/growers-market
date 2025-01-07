using System.ComponentModel.DataAnnotations;

namespace growers_market.Server.Dtos
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
