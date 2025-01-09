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

    public class SpeciesData
    {
        public int id { get; set; }
        public string common_name { get; set; } = string.Empty;
        public List<string> scientific_name { get; set; } = new List<string>();
        public List<string> other_name { get; set; } = new List<string>();
        public string cycle { get; set; } = string.Empty;
        public string watering { get; set; } = string.Empty;

        [JsonConverter(typeof(SingleOrArrayConverter<string>))]
        public List<string> sunlight { get; set; } = new List<string>();

        public int indoor { get; set; } = 0;
        public int hardiness { get; set; } = 0;
        public DefaultImage? default_image { get; set; } = new DefaultImage();
    }

    public class PerenualSpecies
    {
        public List<SpeciesData> data { get; set; }
        public int to { get; set; }
        public int per_page { get; set; }
        public int current_page { get; set; }
        public int from { get; set; }
        public int last_page { get; set; }
        public int total { get; set; }
    }

    public class SingleOrArrayConverter<T> : JsonConverter<List<T>>
    {
        public override List<T> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.StartArray)
            {
                return JsonSerializer.Deserialize<List<T>>(ref reader, options);
            }
            else
            {
                var value = JsonSerializer.Deserialize<T>(ref reader, options);
                return new List<T> { value };
            }
        }

        public override void Write(Utf8JsonWriter writer, List<T> value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, value, options);
        }
    }
}
