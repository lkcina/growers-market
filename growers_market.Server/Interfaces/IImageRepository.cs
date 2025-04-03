using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface IImageRepository
    {
        Task<List<Image>> GetImagesAsync(int listingId);
        Task<Image?> GetImageByUrlAsync(string url);
        Task<Image> CreateImageAsync(Image image);
        Task<Image> UpdateImageAsync(int id, Image image);
        Task<Image?> DeleteImageAsync(int id);
    }
}
