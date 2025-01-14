using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace growers_market.Server.Migrations
{
    /// <inheritdoc />
    public partial class Listings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1b09422e-785c-4d3e-883c-65e08996ec21");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b6f1cd74-9ccd-4791-9b99-9dce2a517d9f");

            migrationBuilder.AddColumn<string>(
                name: "AppUserName",
                table: "Listings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Listings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Listings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1e6b178e-0fa6-4acf-add2-9d169139ed91", null, "User", "USER" },
                    { "768147e1-bbb7-4ad8-ac74-25078e933f75", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1e6b178e-0fa6-4acf-add2-9d169139ed91");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "768147e1-bbb7-4ad8-ac74-25078e933f75");

            migrationBuilder.DropColumn(
                name: "AppUserName",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Listings");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1b09422e-785c-4d3e-883c-65e08996ec21", null, "Admin", "ADMIN" },
                    { "b6f1cd74-9ccd-4791-9b99-9dce2a517d9f", null, "User", "USER" }
                });
        }
    }
}
