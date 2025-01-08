namespace growers_market.Server.Models
{
    public class Wishlist
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public int SpeciesId { get; set; }
        public Species Species { get; set; }
    }
}
