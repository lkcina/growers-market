using System.ComponentModel.DataAnnotations.Schema;

namespace growers_market.Server.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string StreetAddressLine1 { get; set; } = string.Empty;
        public string? StreetAddressLine2 { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }
    }
}
