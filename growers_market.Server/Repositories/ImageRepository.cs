using System.Reflection;
using growers_market.Server.Data;
using growers_market.Server.Interfaces;
using growers_market.Server.Models;
using growers_market.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace growers_market.Server.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private readonly AppDbContext _context;
        public ImageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Image> GetImageByUrlAsync(string url)
        {
            Console.WriteLine(url);
            return await _context.Images.FirstOrDefaultAsync(i => i.Url == url);
        }

        public async Task<Image> CreateImageAsync(Image image)
        {
            await _context.Images.AddAsync(image);
            await _context.SaveChangesAsync();
            return image;
        }

        public async Task<Image?> DeleteImageAsync(int id)
        {
            var image = await _context.Images.FirstOrDefaultAsync(i => i.Id == id);
            if (image == null)
            {
                return null;
            }
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();
            return image;
        }

        public async Task<List<Image>> GetImagesAsync(int listingId)
        {
            var images = _context.Images.Where(i => i.ListingId == listingId);
            return await images.ToListAsync();
        }

        public async Task<Image> UpdateImageAsync(int id, Image image)
        {
            var currentImage = await _context.Images.FirstOrDefaultAsync(i => i.Id == id);
            if (currentImage == null)
            {
                return null;
            }

            currentImage.PositionX = image.PositionX;
            currentImage.PositionY = image.PositionY;
            await _context.SaveChangesAsync();
            return currentImage;
        }
    }
}
