namespace growers_market.Server.Interfaces
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile file, List<string> allowedExtensions, string folderName);
        Task<string> DeleteFile(string fileName, string folderName);
    }
}
