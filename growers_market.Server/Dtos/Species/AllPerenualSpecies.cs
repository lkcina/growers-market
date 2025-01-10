using System.Text.Json;
using System.Text.Json.Serialization;

namespace growers_market.Server.Dtos.Species
{
    public class DefaultImage
    {
        public int image_id { get; set; }
        public int license { get; set; }
        public string license_name { get; set; } = string.Empty;
        public string license_url { get; set; } = string.Empty;
        public string original_url { get; set; } = string.Empty;
        public string regular_url { get; set; } = string.Empty;
        public string medium_url { get; set; } = string.Empty;
        public string small_url { get; set; } = string.Empty;
        public string thumbnail { get; set; } = string.Empty;
    }

    public class Hardiness
    {
        public int? min { get; set; } = 0;
        public int? max { get; set; } = 0;
    }

        public class AllSpeciesData
    {
        public int id { get; set; }
        public string common_name { get; set; } = string.Empty;
        public List<string>? scientific_name { get; set; } = new List<string>();
        public List<string>? other_name { get; set; } = new List<string>();
        public string? cycle { get; set; } = string.Empty;
        public string? watering { get; set; } = string.Empty;
        public List<string>? sunlight { get; set; } = new List<string>();
        public bool? indoor { get; set; }
        public Hardiness? hardiness { get; set; } = new Hardiness();
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
