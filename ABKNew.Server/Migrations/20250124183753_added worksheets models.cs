using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ABKNew.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedworksheetsmodels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comments",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "WorkbookNotesWorksheet",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    WorksheetId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WorksheetNoteId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkbookNotesWorksheet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorksheetItems",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    WorksheetId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManufacturerId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Unit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    ListPrice = table.Column<double>(type: "float", nullable: false),
                    Net = table.Column<double>(type: "float", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorksheetItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Worksheets",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TakeoffId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Multiplier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManufacturerId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Freight = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuoteAmount = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TlpMultiplier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comments = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobSpecificNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ManufacturersId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Worksheets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Worksheets_Manufacturers_ManufacturersId",
                        column: x => x.ManufacturersId,
                        principalTable: "Manufacturers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Worksheets_Takeoff_TakeoffId",
                        column: x => x.TakeoffId,
                        principalTable: "Takeoff",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Worksheets_ManufacturersId",
                table: "Worksheets",
                column: "ManufacturersId");

            migrationBuilder.CreateIndex(
                name: "IX_Worksheets_TakeoffId",
                table: "Worksheets",
                column: "TakeoffId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkbookNotesWorksheet");

            migrationBuilder.DropTable(
                name: "WorksheetItems");

            migrationBuilder.DropTable(
                name: "Worksheets");

            migrationBuilder.DropColumn(
                name: "Comments",
                table: "Products");
        }
    }
}
