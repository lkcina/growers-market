namespace growers_market.Server.Models
{
    public class Species
    {
        public int Id { get; set; }
        public string CommonName { get; set; } = string.Empty;
        public string GenusName { get; set; } = string.Empty;
        public string SpeciesName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
    }
}
