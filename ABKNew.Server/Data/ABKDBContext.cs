using ABKNew.Server.Entities;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ABKNew.Server.Data
{
    public class ABKDBContext : IdentityDbContext<Users>
    {
        public ABKDBContext(DbContextOptions options) : base(options) { }

        public DbSet<ShippingItems> ShippingItems { get; set; }
        public DbSet<Taxes> Taxes { get; set; }
        public DbSet<Shippings> Shippings { get; set; }
        public DbSet<Architects> Architects { get; set; }
        public DbSet<Bidders> Bidders { get; set; }
        public DbSet<Contractors> Contractors { get; set; }
        public DbSet<EmailTemplates> EmailTemplates { get; set; }
        public DbSet<Engineers> Engineers { get; set; }
        public DbSet<Manufacturers> Manufacturers { get; set; }
        public DbSet<PDNI> PDNI { get; set; }
        public DbSet<PM> PM { get; set; }
        public DbSet<Specifications> Specifications { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<WorkbookNotes> WorkbookNotes { get; set; }
        public DbSet<Takeoff> Takeoff { get; set; }
        public DbSet<TakeoffDocuments> TakeoffDocuments { get; set; }
        public DbSet<TakeoffNotes> TakeoffNotes { get; set; }
        public DbSet<TakeoffTakeoffNotes> TakeoffTakeoffNotes { get; set; }
        public DbSet<SiteSettings> SiteSettings { get; set; }
        public DbSet<EmailAccounts> EmailAccounts { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Permissions> Permissions { get; set; }
        public DbSet<Documents> Documents { get; set; }
        public DbSet<Worksheets> Worksheets { get; set; }
        public DbSet<WorksheetItems> WorksheetItems { get; set; }
        public DbSet<WorkbookNotesWorksheet> WorkbookNotesWorksheet { get; set; }
        public DbSet<PDNIWorksheet> PDNIWorksheet { get; set; }
    }
}
