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

        public async Task<string> DeleteFile(string fileName, string folderName)
        {
            if (string.IsNullOrWhiteSpace(fileName))
            {
                return null;
            }

            var contentPath = _environment.ContentRootPath;
            var path = Path.Combine(contentPath, "Uploads", folderName, fileName);

            if (!File.Exists(path))
            {
                return null;
            }

            File.Delete(path);
            return fileName;
        }

        public async Task<string> SaveFileAsync(IFormFile file, List<string> allowedExtensions, string folderName)
        {
            if (file == null)
            {
                return null;
            }

            var contentPath = _environment.ContentRootPath;
            var path = Path.Combine(contentPath, "Uploads", folderName);

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var extension = Path.GetExtension(file.FileName);
            if (!allowedExtensions.Contains(extension))
            {
                return null;
            }

            var fileName = $"{Guid.NewGuid().ToString() + extension}";
            var filePath = Path.Combine(path, fileName);
            var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);
            return fileName;
        }
    }
}
