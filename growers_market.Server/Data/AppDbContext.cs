using growers_market.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace growers_market.Server.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<Species> Species { get; set; }
        public DbSet<Listing> Listings { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Wishlist>(item => item.HasKey(key => new { key.AppUserId, key.SpeciesId }));
            builder.Entity<Wishlist>()
                .HasOne(wish => wish.AppUser)
                .WithMany(user => user.Wishlists)
                .HasForeignKey(wish => wish.AppUserId);

            builder.Entity<Wishlist>()
                .HasOne(wish => wish.Species)
                .WithMany(species => species.Wishlists)
                .HasForeignKey(wish => wish.SpeciesId);

            builder.Entity<Listing>()
                .HasMany(listing => listing.Chats)
                .WithOne(chat => chat.Listing)
                .HasForeignKey(chat => chat.ListingId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Chat>()
                .HasMany(chat => chat.Messages)
                .WithOne(message => message.Chat)
                .HasForeignKey(message => message.ChatId)
                .OnDelete(DeleteBehavior.Restrict);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
