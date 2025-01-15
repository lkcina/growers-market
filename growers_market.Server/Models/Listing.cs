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
        public int Quantity { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string AppUserId { get; set; } = string.Empty;
        public string AppUserName { get; set; } = string.Empty;
        public AppUser? AppUser { get; set; }
        public int? SpeciesId { get; set; }
        public Species? Species { get; set; }
        public List<Chat> Chats { get; set; } = new List<Chat>();
    }
}
