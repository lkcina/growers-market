using System.Reflection.Metadata;

namespace growers_market.Server.Models
{
    public class Species
    {
        public int Id { get; set; }
        public string CommonName { get; set; } = string.Empty;
        public string GenusName { get; set; } = string.Empty;
        public string SpeciesName { get; set; } = string.Empty;
    }
}
