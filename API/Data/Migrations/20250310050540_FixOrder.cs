using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShippingAddres_State",
                table: "Orders",
                newName: "ShippingAddress_State");

            migrationBuilder.RenameColumn(
                name: "ShippingAddres_PostalCode",
                table: "Orders",
                newName: "ShippingAddress_PostalCode");

            migrationBuilder.RenameColumn(
                name: "ShippingAddres_Name",
                table: "Orders",
                newName: "ShippingAddress_Name");

            migrationBuilder.RenameColumn(
                name: "ShippingAddres_Line2",
                table: "Orders",
                newName: "ShippingAddress_Line2");

            migrationBuilder.RenameColumn(
                name: "ShippingAddres_Line1",
                table: "Orders",
                newName: "ShippingAddress_Line1");

            migrationBuilder.RenameColumn(
                name: "ShippingAddres_Country",
                table: "Orders",
                newName: "ShippingAddress_Country");

            migrationBuilder.RenameColumn(
                name: "ShippingAddres_City",
                table: "Orders",
                newName: "ShippingAddress_City");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShippingAddress_State",
                table: "Orders",
                newName: "ShippingAddres_State");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_PostalCode",
                table: "Orders",
                newName: "ShippingAddres_PostalCode");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Name",
                table: "Orders",
                newName: "ShippingAddres_Name");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Line2",
                table: "Orders",
                newName: "ShippingAddres_Line2");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Line1",
                table: "Orders",
                newName: "ShippingAddres_Line1");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Country",
                table: "Orders",
                newName: "ShippingAddres_Country");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_City",
                table: "Orders",
                newName: "ShippingAddres_City");
        }
    }
}
