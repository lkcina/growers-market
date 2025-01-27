using growers_market.Server.Dtos.Species;
using growers_market.Server.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace growers_market.Server.Dtos.Listing
{
    public class ListingDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool IsForTrade { get; set; }
        [Column(TypeName = "decimal(9, 2)")]
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string AppUserName { get; set; }
        public SpeciesDto? Species { get; set; }
        public List<string> Images { get; set; }
    }
}
