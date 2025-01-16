using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface IMessageRepository
    {
        Task<Message> CreateAsync(Message message);
        Task<Message> GetMessageByIdAsync(int id);
        Task<List<Message>> GetChatMessages(int chatId);
        Task<Message> DeleteAsync(int id);
    }
}
