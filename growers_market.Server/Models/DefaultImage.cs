using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace growers_market.Server.Models
{
    [NotMapped]
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
}
