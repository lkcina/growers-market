namespace growers_market.Server.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int ChatId { get; set; }
        public Chat? Chat { get; set; }
        public string AppUserId { get; set; } = string.Empty;
        public string AppUserName { get; set; } = string.Empty;
        public AppUser? AppUser { get; set; }
    }
}
