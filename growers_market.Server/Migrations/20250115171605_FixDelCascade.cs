using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace growers_market.Server.Migrations
{
    /// <inheritdoc />
    public partial class FixDelCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "38a7781a-92c1-42f5-b065-595680bc9020");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "42686b84-e351-4ec6-a6a1-db8bb47f48f5");

            migrationBuilder.AlterColumn<int>(
                name: "ListingId",
                table: "Chats",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2599fcad-ffcb-45ca-b8d1-a0f050270da3", null, "Admin", "ADMIN" },
                    { "2c55f635-d128-4155-b3ce-f005634b4794", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2599fcad-ffcb-45ca-b8d1-a0f050270da3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2c55f635-d128-4155-b3ce-f005634b4794");

            migrationBuilder.AlterColumn<int>(
                name: "ListingId",
                table: "Chats",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "38a7781a-92c1-42f5-b065-595680bc9020", null, "Admin", "ADMIN" },
                    { "42686b84-e351-4ec6-a6a1-db8bb47f48f5", null, "User", "USER" }
                });
        }
    }
}
