using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace growers_market.Server.Models
{
    [NotMapped]
    public class HardinessRange
    {
        public string? min { get; set; } = string.Empty;
        public string? max { get; set; } = string.Empty;
    }
}
