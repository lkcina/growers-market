using System.Text.Json;
using System.Text.Json.Serialization;
using growers_market.Server.Models;

namespace growers_market.Server.Dtos.Species
{
    public class DetailsSpeciesData
    {
        public int id { get; set; }
        public string common_name { get; set; } = string.Empty;
        public List<string>? scientific_name { get; set; } = new List<string>();
        public string? cycle { get; set; } = string.Empty;
        public string? watering { get; set; } = string.Empty;
        [JsonConverter(typeof(SunlightConverter))]
        public List<string>? sunlight { get; set; } = new List<string>();
        public bool? indoor { get; set; }
        public HardinessRange? hardiness { get; set; } = new HardinessRange();
        public string? description { get; set; } = string.Empty;
        public DefaultImage? default_image { get; set; } = new DefaultImage();
        public string? other_images { get; set; } = string.Empty;
    }
}
