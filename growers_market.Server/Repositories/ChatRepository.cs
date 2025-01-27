using growers_market.Server.Data;
using growers_market.Server.Interfaces;
using growers_market.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace growers_market.Server.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private readonly AppDbContext _context;
        private readonly IMessageRepository _messageRepository;

        public ChatRepository(AppDbContext context, IMessageRepository messageRepository)
        {
            _context = context;
            _messageRepository = messageRepository;
        }

        public async Task<Chat> CreateChat(Chat chat)
        {
            await _context.Chats.AddAsync(chat);
            await _context.SaveChangesAsync();
            return chat;
        }

        public async Task<Chat?> DeleteChat(int id)
        {
            var chat = await _context.Chats.FirstOrDefaultAsync(c => c.Id == id);
            if (chat == null)
            {
                return null;
            }
            var messages = await _messageRepository.GetChatMessages(id);
            if (messages != null)
            {
                messages.Select(message => _context.Messages.Remove(message));
                await _context.SaveChangesAsync();
            }
            _context.Chats.Remove(chat);
            await _context.SaveChangesAsync();
            return chat;
        }

        public async Task<List<Chat>> GetBuyerChats(AppUser appUser)
        {
            var chats = _context.Chats.Include(c => c.Listing).AsQueryable();
            chats = chats.Where(c => c.AppUserId == appUser.Id);
            return await chats.ToListAsync();
        }

        public async Task<Chat> GetChatById(int id)
        {
            return await _context.Chats.Include(c => c.Messages).Include(c => c.Listing).FirstOrDefaultAsync(c => c.Id == id);

        }

        public async Task<List<Chat>> GetListingChats(int listingId)
        {
            var chats = _context.Chats.Include(c => c.Listing).Include(c => c.Messages).AsQueryable();
            chats = chats.Where(c => c.ListingId == listingId);
            return await chats.ToListAsync();
        }
    }
}
