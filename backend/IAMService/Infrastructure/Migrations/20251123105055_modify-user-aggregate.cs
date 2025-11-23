using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class modifyuseraggregate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address_Number",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Address_Street",
                table: "Users",
                newName: "Address_Ward");

            migrationBuilder.RenameColumn(
                name: "Address_Country",
                table: "Users",
                newName: "Address_DetailAddress");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Address_Ward",
                table: "Users",
                newName: "Address_Street");

            migrationBuilder.RenameColumn(
                name: "Address_DetailAddress",
                table: "Users",
                newName: "Address_Country");

            migrationBuilder.AddColumn<int>(
                name: "Address_Number",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
