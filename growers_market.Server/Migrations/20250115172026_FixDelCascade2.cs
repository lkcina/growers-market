using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace growers_market.Server.Migrations
{
    /// <inheritdoc />
    public partial class FixDelCascade2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2599fcad-ffcb-45ca-b8d1-a0f050270da3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2c55f635-d128-4155-b3ce-f005634b4794");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "16f4dcbf-9705-4271-aee5-fc261258b9a5", null, "User", "USER" },
                    { "77e09860-e534-4c6c-b2f1-4cba3a551e40", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "16f4dcbf-9705-4271-aee5-fc261258b9a5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "77e09860-e534-4c6c-b2f1-4cba3a551e40");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2599fcad-ffcb-45ca-b8d1-a0f050270da3", null, "Admin", "ADMIN" },
                    { "2c55f635-d128-4155-b3ce-f005634b4794", null, "User", "USER" }
                });
        }
    }
}
