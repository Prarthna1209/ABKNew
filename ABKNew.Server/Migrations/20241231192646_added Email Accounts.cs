using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ABKNew.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedEmailAccounts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmailAccounts",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Followup_Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Followup_Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Takeoff_Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Takeoff_Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BidReq_Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BidReq_Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailAccounts", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmailAccounts");
        }
    }
}
