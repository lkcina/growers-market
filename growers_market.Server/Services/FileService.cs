using growers_market.Server.Interfaces;

namespace growers_market.Server.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _environment;
        public FileService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task<string> DeleteFile(string filePath)
        {
            if (string.IsNullOrWhiteSpace(filePath))
            {
                return null;
            }

            if (!File.Exists(filePath))
            {
                return null;
            }

            File.Delete(filePath);
            return filePath;
        }

        public async Task<string> SaveFileAsync(IFormFile file, string folderName)
        {
            if (file == null)
            {
                return null;
            }

            var contentPath = _environment.ContentRootPath;
            var path = Path.Combine(contentPath, "wwwroot", folderName);
            var existingFilePath = Path.Combine(path, file.FileName);

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            if (File.Exists(existingFilePath))
            {
                return existingFilePath;
            }
            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid().ToString() + extension}";
            var filePath = Path.Combine(path, fileName);
            var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);
            var webPath = $"https://localhost:7234/ListingImages/{fileName}";
            return webPath;
        }
    }
}
