using System.Reflection.Metadata;

namespace growers_market.Server.Dtos.Listing
{
    public class ListingFormDto
    {
        public string Title { get; set; }
        public string IsForTrade { get; set; }
        public string Price { get; set; }
        public string Quantity { get; set; }
        public string Description { get; set; }
        public string SpeciesId { get; set; }
        public string ImagePaths { get; set; }
        public IFormFile[] UploadedImages { get; set; }
    }
}
