using growers_market.Server.Dtos.Listing;

namespace growers_market.Server.Dtos.Listing
{
    public class AllListingsDto
    {
        public List<ListingDto> Data { get; set; }
        public int To { get; set; }
        public int PerPage { get; set; }
        public int CurrentPage { get; set; }
        public int From { get; set; }
        public int LastPage { get; set; }
        public int Total { get; set; }
    }
}
