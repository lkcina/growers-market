using growers_market.Server.Data;
using growers_market.Server.Interfaces;
using growers_market.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace growers_market.Server.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly AppDbContext _context;
        public MessageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Message> CreateAsync(Message message)
        {
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
            return message;
        }

        public async Task<Message> DeleteAsync(int id)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
            if (message == null)
            {
                return null;
            }
            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();
            return message;
        }

        public async Task<List<Message>> GetChatMessages(int chatId)
        {
            var messages = _context.Messages.Where(m => m.ChatId == chatId);
            return await messages.ToListAsync();
        }

        public async Task<Message> GetMessageByIdAsync(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }
    }
}
