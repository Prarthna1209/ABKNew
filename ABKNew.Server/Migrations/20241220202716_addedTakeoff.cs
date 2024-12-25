using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ABKNew.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedTakeoff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Takeoff",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TakeoffId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuoteId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DrawingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RevisedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    QuoteDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SalesmanId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EngineerId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContractorId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ArchitectId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpecificationId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Jobaddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Comments = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorksheetGenerated = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PDFGenerated = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OriginalQuote = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuoteEntered = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuotedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuoteComments = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RevActive = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VibroLayIn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DrawingRCVDFrom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuoteOut = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SubmittalDoneBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuoteRevision = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OriginalQuoteId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Takeoff", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TakeoffDocuments",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TakeoffId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    File = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UploadedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsVibro = table.Column<bool>(type: "bit", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TakeoffDocuments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TakeoffNotes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TakeoffNotes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TakeoffTakeoffNotes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TakeoffNoteId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TakeoffId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TakeoffTakeoffNotes", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Takeoff");

            migrationBuilder.DropTable(
                name: "TakeoffDocuments");

            migrationBuilder.DropTable(
                name: "TakeoffNotes");

            migrationBuilder.DropTable(
                name: "TakeoffTakeoffNotes");
        }
    }
}
