using System.Text.Json;
using System.Text.Json.Serialization;

namespace growers_market.Server.Dtos.Species
{
    public class Dimensions
    {
        public string? type { get; set; } = string.Empty;
        public double? min_value { get; set; }
        public double? max_value { get; set; }
        public string? unit { get; set; } = string.Empty;
    }

    public class WaterRequirement
    {
        public string? unit { get; set; } = string.Empty;
        public double? value { get; set; }
    }

    public class PlantAnatomy
    {
        public string? part { get; set; } = string.Empty;
        public List<string>? color { get; set; } = new List<string>();
    }

    public class PruningCount
    {
        public int? amount { get; set; }
        public string? interval { get; set; } = string.Empty;
    }

    public class HardinessLocation
    {
        public string? full_url { get; set; } = string.Empty;
        public string? full_iframe { get; set; } = string.Empty;
    }

    public class DetailsSpeciesData
    {
        public int id { get; set; }
        public string common_name { get; set; } = string.Empty;
        public List<string>? scientific_name { get; set; } = new List<string>();
        public List<string>? other_name { get; set; } = new List<string>();
        public string? family { get; set; } = string.Empty;
        public string? origin { get; set; } = string.Empty;
        public string? type { get; set; } = string.Empty;
        public string? dimension { get; set; } = string.Empty;
        public Dimensions? dimensions { get; set; } = new Dimensions();
        public string? cycle { get; set; } = string.Empty;
        public string? watering { get; set; } = string.Empty;
        public WaterRequirement? depth_water_requirement { get; set; } = new WaterRequirement();
        public WaterRequirement? volume_water_requirement { get; set; } = new WaterRequirement();
        public string? watering_period { get; set; } = string.Empty;
        public WaterRequirement? watering_general_benchmark { get; set; } = new WaterRequirement();
        public List<PlantAnatomy>? plant_anatomy { get; set; } = new List<PlantAnatomy>();
        public List<string>? sunlight { get; set; } = new List<string>();
        public List<string>? pruning_month { get; set; } = new List<string>();
        public int? seeds { get; set; } = 0;
        public string? maintenance { get; set; } = string.Empty;
        public string? care_guides { get; set; } = string.Empty;
        public List<string>? attracts { get; set; } = new List<string>();
        public List<string>? propagation { get; set; } = new List<string>();
        public string? growth_rate { get; set; } = string.Empty;
        public bool? indoor { get; set; }
        public Hardiness? hardiness { get; set; } = new Hardiness();
        public HardinessLocation? hardiness_location { get; set; } = new HardinessLocation();
        public bool? flowers { get; set; }
        public string? flowering_season { get; set; } = string.Empty;
        public string? flower_color { get; set; } = string.Empty;
        public bool? cones { get; set; }
        public bool? fruits { get; set; }
        public bool? edible_fruit { get; set; }
        public string? edible_fruit_tase_profile { get; set; } = string.Empty;
        public string? fruit_nutritional_value { get; set; } = string.Empty;
        public List<string>? fruit_color { get; set; } = new List<string>();

        public List<string>? soil { get; set; } = new List<string>();
        public bool? drought_tolerant { get; set; }
        public bool? salt_tolerant { get; set; }
        public bool? thorny { get; set; }
        public bool? invasive { get; set; }
        public bool? tropical { get; set; }
        public string? care_level { get; set; } = string.Empty;
        public List<string>? pest_susceptibility { get; set; } = new List<string>();
        public string? pest_susceptibility_api { get; set; } = string.Empty;
        public string? harvest_season { get; set; } = string.Empty;
        public bool? leaf { get; set; }
        public List<string>? leaf_color { get; set; } = new List<string>();
        public bool? edible_leaf { get; set; }
        public bool? cuisine { get; set; }
        public bool? medicinal { get; set; }
        public int? poisonous_to_humans { get; set; }
        public int? poisonous_to_pets { get; set; }
        public string? description { get; set; } = string.Empty;
        public DefaultImage? default_image { get; set; } = new DefaultImage();
        public List<string>? other_images { get; set; } = new List<string>();
    }
}
