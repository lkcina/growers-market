using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace growers_market.Server.Migrations
{
    /// <inheritdoc />
    public partial class getListingDataFromUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "621533d9-d731-4959-b09b-8cee581292d7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ff90d133-4283-47af-9c71-bd954d10b437");

            migrationBuilder.DropColumn(
                name: "AppUserName",
                table: "Listings");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d6324af1-24a4-4b83-afff-ac8f2273275b", null, "Admin", "ADMIN" },
                    { "d7e11529-3312-4edd-8528-e3991b74820b", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d6324af1-24a4-4b83-afff-ac8f2273275b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d7e11529-3312-4edd-8528-e3991b74820b");

            migrationBuilder.AddColumn<string>(
                name: "AppUserName",
                table: "Listings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "621533d9-d731-4959-b09b-8cee581292d7", null, "Admin", "ADMIN" },
                    { "ff90d133-4283-47af-9c71-bd954d10b437", null, "User", "USER" }
                });
        }
    }
}
