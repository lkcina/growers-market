using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace growers_market.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateHardiness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "309ae24a-fa26-43d1-a10f-4aa96a42d02e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b291c11-4623-4399-995c-b07c3466eb27");

            migrationBuilder.AddColumn<int>(
                name: "HardinessMax",
                table: "Species",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HardinessMin",
                table: "Species",
                type: "int",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1b09422e-785c-4d3e-883c-65e08996ec21", null, "Admin", "ADMIN" },
                    { "b6f1cd74-9ccd-4791-9b99-9dce2a517d9f", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1b09422e-785c-4d3e-883c-65e08996ec21");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b6f1cd74-9ccd-4791-9b99-9dce2a517d9f");

            migrationBuilder.DropColumn(
                name: "HardinessMax",
                table: "Species");

            migrationBuilder.DropColumn(
                name: "HardinessMin",
                table: "Species");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "309ae24a-fa26-43d1-a10f-4aa96a42d02e", null, "User", "USER" },
                    { "8b291c11-4623-4399-995c-b07c3466eb27", null, "Admin", "ADMIN" }
                });
        }
    }
}
