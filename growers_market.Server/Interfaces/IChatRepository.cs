using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface IChatRepository
    {
        Task<List<Chat>> GetBuyerChats(AppUser appUser);
        Task<List<Chat>> GetListingChats(int listingId);
        Task<Chat> GetChatById(int id);
        Task<Chat> CreateChat(Chat chat);
        Task<Chat?> DeleteChat(int id);
    }
}
