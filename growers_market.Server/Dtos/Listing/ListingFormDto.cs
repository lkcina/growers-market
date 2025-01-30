using System.Reflection.Metadata;

namespace growers_market.Server.Dtos.Listing
{
    public class ListingFormDto
    {
        public string Title { get; set; }
        public bool IsForTrade { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? Description { get; set; }
        public int? SpeciesId { get; set; }
        public string ImagePaths { get; set; }
        public IFormFile[]? UploadedImages { get; set; }
    }
}
