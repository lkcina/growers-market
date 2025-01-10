using System.Text.Json;
using System.Text.Json.Serialization;
using growers_market.Server.Models;

namespace growers_market.Server.Dtos.Species
{
    public class HardinessRange
    {
        public string? min { get; set; } = string.Empty;
        public string? max { get; set; } = string.Empty;
    }

    public class AllSpeciesData
    {
        public int id { get; set; }
        public string common_name { get; set; } = string.Empty;
        public List<string>? scientific_name { get; set; } = new List<string>();
        public string? cycle { get; set; } = string.Empty;
        public string? watering { get; set; } = string.Empty;
        public List<string>? sunlight { get; set; } = new List<string>();
        public bool? indoor { get; set; }
        public HardinessRange? hardiness { get; set; } = new HardinessRange();
        public DefaultImage? default_image { get; set; } = new DefaultImage();
    }

    public class AllPerenualSpecies
    {
        public List<AllSpeciesData> data { get; set; }
        public int to { get; set; }
        public int per_page { get; set; }
        public int current_page { get; set; }
        public int from { get; set; }
        public int last_page { get; set; }
        public int total { get; set; }
    }
}
