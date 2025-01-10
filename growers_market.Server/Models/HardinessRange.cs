using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace growers_market.Server.Models
{
    [NotMapped]
    public class HardinessRange
    {
        public int? min { get; set; } = 0;
        public int? max { get; set; } = 0;
    }
}
