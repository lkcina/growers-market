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
            Console.WriteLine(chat.Listing.Id);
            var existingChat = await _context.Chats.FirstOrDefaultAsync(c => c.ListingId == chat.ListingId && c.AppUserId == chat.AppUserId);
            if (existingChat != null)
            {
                return null;
            }
            Console.WriteLine("New Chat");
            await _context.Chats.AddAsync(chat);
            Console.WriteLine("Chat Added");
            await _context.SaveChangesAsync();
            Console.WriteLine("Chat Saved");
            return chat;
        }

        public async Task<Chat?> DeleteChat(int id)
        {
            Console.WriteLine("Finding chat");
            var chat = await _context.Chats.FirstOrDefaultAsync(c => c.Id == id);
            if (chat == null)
            {
                return null;
            }
            Console.WriteLine("Chat found... Finding Messages");
            var messages = await _messageRepository.GetChatMessages(id);
            if (messages != null)
            {
                foreach (var message in messages)
                {
                    _context.Messages.Remove(message);
                }
                await _context.SaveChangesAsync();
                Console.WriteLine("Messages deleted");
            }
            
            Console.WriteLine("Deleting chat");
            _context.Chats.Remove(chat);
            await _context.SaveChangesAsync();
            Console.WriteLine("Chat deleted");
            return chat;
        }

        public async Task<List<Chat>> GetBuyerChats(AppUser appUser)
        {
            var chats = _context.Chats.Include(c => c.Listing).ThenInclude(l => l.Species).Include(c => c.Messages).AsQueryable();
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
