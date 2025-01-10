using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace growers_market.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSpecies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4419cd74-ea6b-4ffc-b1e8-23a63b42dd43");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c7e16d30-a8b1-4037-927d-a8c50cde3355");

            migrationBuilder.DropColumn(
                name: "GenusName",
                table: "Species");

            migrationBuilder.DropColumn(
                name: "SpeciesName",
                table: "Species");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Species",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Cycle",
                table: "Species",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Species",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Indoor",
                table: "Species",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScientificName",
                table: "Species",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sunlight",
                table: "Species",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Thumbnail",
                table: "Species",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Watering",
                table: "Species",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "309ae24a-fa26-43d1-a10f-4aa96a42d02e", null, "User", "USER" },
                    { "8b291c11-4623-4399-995c-b07c3466eb27", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "309ae24a-fa26-43d1-a10f-4aa96a42d02e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b291c11-4623-4399-995c-b07c3466eb27");

            migrationBuilder.DropColumn(
                name: "Cycle",
                table: "Species");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Species");

            migrationBuilder.DropColumn(
                name: "Indoor",
                table: "Species");

            migrationBuilder.DropColumn(
                name: "ScientificName",
                table: "Species");

            migrationBuilder.DropColumn(
                name: "Sunlight",
                table: "Species");

            migrationBuilder.DropColumn(
                name: "Thumbnail",
                table: "Species");

            migrationBuilder.DropColumn(
                name: "Watering",
                table: "Species");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Species",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GenusName",
                table: "Species",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SpeciesName",
                table: "Species",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4419cd74-ea6b-4ffc-b1e8-23a63b42dd43", null, "Admin", "ADMIN" },
                    { "c7e16d30-a8b1-4037-927d-a8c50cde3355", null, "User", "USER" }
                });
        }
    }
}
