using growers_market.Server.Dtos.Species;

namespace growers_market.Server.Models
{
    public class Species
    {
        public int Id { get; set; }
        public string CommonName { get; set; } = string.Empty;
        public List<string>? ScientificName { get; set; }
        public string? Cycle { get; set; }
        public string? Watering { get; set; }
        public List<string>? Sunlight { get; set; }
        public HardinessRange? Hardiness { get; set; }
        public bool? Indoor { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public string? Thumbnail { get; set; }
        public List<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
    }
}
