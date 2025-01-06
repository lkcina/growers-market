using System.ComponentModel.DataAnnotations.Schema;

namespace growers_market.Server.Models
{
    public class Listing
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool IsForTrade { get; set; }
        [Column(TypeName = "decimal(9, 2)")]
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public AppUser? AppUser { get; set; }
        public int? SpeciesId { get; set; }
        public Species? Species { get; set; }
    }
}
