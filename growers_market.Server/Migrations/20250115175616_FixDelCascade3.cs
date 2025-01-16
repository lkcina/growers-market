using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace growers_market.Server.Migrations
{
    /// <inheritdoc />
    public partial class FixDelCascade3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "8f2de6f0-3477-446b-bbd4-f49b3988cf2f", null, "User", "USER" },
                    { "da96ffe5-08b2-4fa3-9ac2-e0832ed59161", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8f2de6f0-3477-446b-bbd4-f49b3988cf2f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "da96ffe5-08b2-4fa3-9ac2-e0832ed59161");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "16f4dcbf-9705-4271-aee5-fc261258b9a5", null, "User", "USER" },
                    { "77e09860-e534-4c6c-b2f1-4cba3a551e40", null, "Admin", "ADMIN" }
                });
        }
    }
}
