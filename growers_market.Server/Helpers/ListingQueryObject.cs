using growers_market.Server.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace growers_market.Server.Helpers
{
    public class ListingQueryObject
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string? Q { get; set; }
        public string? SortBy { get; set; }
        public bool? IsForTrade { get; set; }
        public decimal? PriceMax { get; set; }
        public string? AppUserName { get; set; }
        public int? SpeciesId { get; set; }
    }
}
