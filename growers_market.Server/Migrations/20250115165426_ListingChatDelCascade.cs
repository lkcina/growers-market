using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace growers_market.Server.Migrations
{
    /// <inheritdoc />
    public partial class ListingChatDelCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "41ca1cfc-a5d1-4624-adc6-58be94c07e62");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ac127c34-f497-4a7b-af6d-7bb33a49720b");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "38a7781a-92c1-42f5-b065-595680bc9020", null, "Admin", "ADMIN" },
                    { "42686b84-e351-4ec6-a6a1-db8bb47f48f5", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "38a7781a-92c1-42f5-b065-595680bc9020");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "42686b84-e351-4ec6-a6a1-db8bb47f48f5");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "41ca1cfc-a5d1-4624-adc6-58be94c07e62", null, "Admin", "ADMIN" },
                    { "ac127c34-f497-4a7b-af6d-7bb33a49720b", null, "User", "USER" }
                });
        }
    }
}
