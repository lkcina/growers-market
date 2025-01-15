namespace growers_market.Server.Models
{
    public class Chat
    {
        public int Id { get; set; }
        public List<Message> Messages { get; set; } = new List<Message>();
        public int ListingId { get; set; }
        public Listing? Listing { get; set; }
        public string AppUserId { get; set; } = string.Empty;
        public string AppUserName { get; set; } = string.Empty;
        public AppUser? AppUser { get; set; }
    }
}
