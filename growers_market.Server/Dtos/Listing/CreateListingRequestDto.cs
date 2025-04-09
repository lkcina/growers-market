using growers_market.Server.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace growers_market.Server.Dtos.Listing
{
    public class CreateListingRequestDto
    {
        public string Title { get; set; }
        public bool IsForTrade { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public int? SpeciesId { get; set; }
        public List<string> ImagePaths { get; set; } = new List<string>();
        public List<IFormFile> UploadedImages { get; set; } = new List<IFormFile>();
        public List<int> ImagePositionsX { get; set; }
        public List<int> ImagePositionsY { get; set; }
    }
}
