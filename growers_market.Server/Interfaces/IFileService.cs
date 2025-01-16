namespace growers_market.Server.Interfaces
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile file, string folderName);
        Task<string> DeleteFile(string filePath);
    }
}
