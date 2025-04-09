using System.Text.Json.Serialization;

namespace growers_market.Server.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string Url { get; set; } = string.Empty;
        public int PositionX { get; set; }
        public int PositionY { get; set; }
        public int ListingId { get; set; }
        [JsonIgnore]
        public Listing? Listing { get; set; }
    }
}
