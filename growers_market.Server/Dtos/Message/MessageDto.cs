using growers_market.Server.Models;

namespace growers_market.Server.Dtos.Message
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int ChatId { get; set; }
        public string AppUserName { get; set; } = string.Empty;
    }
}
