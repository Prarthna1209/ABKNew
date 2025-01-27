using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using ABKNew.Server.Utility;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using System.Collections.Generic;
using System.Xml.Linq;

namespace ABKNew.Server.Repositories
{
    public class TakeoffRepository : GenericRepository<Takeoff>, ITakeoffRepository
    {
        public TakeoffRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddTakeoff(TakeoffModel model, string prefix)
        {
            string takeoffId = await GetTakeoffId(prefix);
            Takeoff item = new()
            {
                Id = Guid.NewGuid().ToString(),
                TakeoffId = takeoffId,
                Amount = model.Amount,
                ArchitectId = model.ArchitectId ?? null,
                Comments = model.Comments ?? "",
                ContractorId = model.ContractorId ?? null,
                BidderId = model.BidderId ?? null,
                CreateDate = model.CreateDate ?? null,
                CreatedBy = model.CreatedBy ?? null,
                DeletedAt = model.DeletedAt ?? DateTime.MinValue,
                DrawingDate = model.DrawingDate ?? null,
                DrawingRCVDFrom = model.DrawingRCVDFrom ?? "",
                DueDate = model.DueDate ?? null,
                EngineerId = model.EngineerId ?? null,
                Jobaddress = model.Jobaddress ?? "",
                JobId = model.JobId ?? null,
                JobName = model.JobName ?? "",
                OriginalQuote = model.OriginalQuote ?? "",
                OriginalQuoteId = model.OriginalQuoteId ?? null,
                PDFGenerated = model.PDFGenerated ?? "",
                ProjectNumber = model.ProjectNumber ?? "",
                QuoteComments = model.QuoteComments ?? "",
                QuoteDate = model.QuoteDate ?? null,
                QuotedBy = model.QuotedBy ?? "",
                QuoteEntered = model.QuoteEntered ?? "",
                QuoteId = model.QuoteId ?? null,
                QuoteOut = model.QuoteOut ?? "",
                QuoteRevision = model.QuoteRevision ?? "",
                RevActive = model.RevActive ?? "",
                RevisedDate = model.RevisedDate ?? null,
                SalesmanId = model.SalesmanId ?? null,
                SpecificationId = model.SpecificationId ?? null,
                Status = model.Status ?? "",
                SubmittalDoneBy = model.SubmittalDoneBy ?? null,
                UpdatedAt = model.UpdatedAt ?? "",
                VibroLayIn = model.VibroLayIn ?? "",
                WorksheetGenerated = model.WorksheetGenerated ?? "",
                CreatedAt = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<TakeoffDetails>> GetList()
        {
            var list = ((IEnumerable<TakeoffDetails>)
                (from t in _context.Takeoff
                 join u in _context.Users on t.SalesmanId equals u.Id into user
                 from u in user.DefaultIfEmpty()
                 join e in _context.Engineers on t.EngineerId equals e.Id into eng
                 from e in eng.DefaultIfEmpty()
                 join c in _context.Contractors on t.ContractorId equals c.Id into cont
                 from c in cont.DefaultIfEmpty()
                 join a in _context.Architects on t.ArchitectId equals a.Id into arch
                 from a in arch.DefaultIfEmpty()
                 join s in _context.Specifications on t.SpecificationId equals s.Id into spec
                 from s in spec.DefaultIfEmpty()
                 select new TakeoffDetails
                 {
                     Amount = t.Amount,
                     ArchitectId = t.ArchitectId,
                     BidderId = t.BidderId,
                     Bidder = "",
                     Comments = t.Comments,
                     ContractorId = t.ContractorId,
                     CreatedAt = t.CreatedAt,
                     CreatedBy = t.CreatedBy,
                     CreateDate = t.CreateDate,
                     DeletedAt = t.DeletedAt,
                     DrawingDate = t.DrawingDate,
                     DrawingRCVDFrom = t.DrawingRCVDFrom,
                     DueDate = t.DueDate,
                     EngineerId = t.EngineerId,
                     Id = t.Id,
                     Jobaddress = t.Jobaddress,
                     JobId = t.JobId,
                     JobName = t.JobName,
                     OriginalQuote = t.OriginalQuote,
                     OriginalQuoteId = t.OriginalQuoteId,
                     PDFGenerated = t.PDFGenerated,
                     ProjectNumber = t.ProjectNumber,
                     QuoteComments = t.QuoteComments,
                     QuoteId = t.QuoteId,
                     QuoteDate = t.QuoteDate,
                     QuotedBy = t.QuotedBy,
                     QuoteEntered = t.QuoteEntered,
                     QuoteOut = t.QuoteOut,
                     QuoteRevision = t.QuoteRevision,
                     RevActive = t.RevActive,
                     RevisedDate = t.RevisedDate,
                     SalesmanId = t.SalesmanId,
                     SpecificationId = t.SpecificationId,
                     Status = t.Status,
                     SubmittalDoneBy = t.SubmittalDoneBy,
                     TakeoffId = t.TakeoffId,
                     UpdatedAt = t.UpdatedAt,
                     VibroLayIn = t.VibroLayIn,
                     WorksheetGenerated = t.WorksheetGenerated,
                     Salesman = u.FirstName + " " + u.LastName,
                     Engineer = e.FirstName + " " + e.LastName,
                     Contractor = c.FirstName + " " + c.LastName,
                     Architect = a.FirstName + " " + a.LastName,
                     Specification = s.Name
                 }));
            return list;
        }

        public async Task<IEnumerable<TakeoffDetails>> GetPendingQuotes()
        {
            var list = ((IEnumerable<TakeoffDetails>)
                (from t in _context.Takeoff
                 join u in _context.Users on t.SalesmanId equals u.Id into user
                 from u in user.DefaultIfEmpty()
                 join e in _context.Engineers on t.EngineerId equals e.Id into eng
                 from e in eng.DefaultIfEmpty()
                 join c in _context.Contractors on t.ContractorId equals c.Id into cont
                 from c in cont.DefaultIfEmpty()
                 join a in _context.Architects on t.ArchitectId equals a.Id into arch
                 from a in arch.DefaultIfEmpty()
                 join s in _context.Specifications on t.SpecificationId equals s.Id into spec
                 from s in spec.DefaultIfEmpty()
                 where t.QuoteId == null || t.QuoteId == ""
                 select new TakeoffDetails
                 {
                     Amount = t.Amount,
                     ArchitectId = t.ArchitectId,
                     BidderId = t.BidderId,
                     Bidder = "",
                     Comments = t.Comments,
                     ContractorId = t.ContractorId,
                     CreatedAt = t.CreatedAt,
                     CreatedBy = t.CreatedBy,
                     CreateDate = t.CreateDate,
                     DeletedAt = t.DeletedAt,
                     DrawingDate = t.DrawingDate,
                     DrawingRCVDFrom = t.DrawingRCVDFrom,
                     DueDate = t.DueDate,
                     EngineerId = t.EngineerId,
                     Id = t.Id,
                     Jobaddress = t.Jobaddress,
                     JobId = t.JobId,
                     JobName = t.JobName,
                     OriginalQuote = t.OriginalQuote,
                     OriginalQuoteId = t.OriginalQuoteId,
                     PDFGenerated = t.PDFGenerated,
                     ProjectNumber = t.ProjectNumber,
                     QuoteComments = t.QuoteComments,
                     QuoteId = t.QuoteId,
                     QuoteDate = t.QuoteDate,
                     QuotedBy = t.QuotedBy,
                     QuoteEntered = t.QuoteEntered,
                     QuoteOut = t.QuoteOut,
                     QuoteRevision = t.QuoteRevision,
                     RevActive = t.RevActive,
                     RevisedDate = t.RevisedDate,
                     SalesmanId = t.SalesmanId,
                     SpecificationId = t.SpecificationId,
                     Status = t.Status,
                     SubmittalDoneBy = t.SubmittalDoneBy,
                     TakeoffId = t.TakeoffId,
                     UpdatedAt = t.UpdatedAt,
                     VibroLayIn = t.VibroLayIn,
                     WorksheetGenerated = t.WorksheetGenerated,
                     Salesman = u.FirstName + " " + u.LastName,
                     Engineer = e.FirstName + " " + e.LastName,
                     Contractor = c.FirstName + " " + c.LastName,
                     Architect = a.FirstName + " " + a.LastName,
                     Specification = s.Name
                 }));
            return list;
        }

        public async Task<IEnumerable<TakeoffDetails>> GetQuotes()
        {
            var list = ((IEnumerable<TakeoffDetails>)
                (from t in _context.Takeoff
                 join u in _context.Users on t.SalesmanId equals u.Id into user
                 from u in user.DefaultIfEmpty()
                 join e in _context.Engineers on t.EngineerId equals e.Id into eng
                 from e in eng.DefaultIfEmpty()
                 join c in _context.Contractors on t.ContractorId equals c.Id into cont
                 from c in cont.DefaultIfEmpty()
                 join a in _context.Architects on t.ArchitectId equals a.Id into arch
                 from a in arch.DefaultIfEmpty()
                 join s in _context.Specifications on t.SpecificationId equals s.Id into spec
                 from s in spec.DefaultIfEmpty()
                 where t.QuoteId != null && t.QuoteId != ""
                 select new TakeoffDetails
                 {
                     Amount = t.Amount,
                     ArchitectId = t.ArchitectId,
                     BidderId = t.BidderId,
                     Bidder = "",
                     Comments = t.Comments,
                     ContractorId = t.ContractorId,
                     CreatedAt = t.CreatedAt,
                     CreatedBy = t.CreatedBy,
                     CreateDate = t.CreateDate,
                     DeletedAt = t.DeletedAt,
                     DrawingDate = t.DrawingDate,
                     DrawingRCVDFrom = t.DrawingRCVDFrom,
                     DueDate = t.DueDate,
                     EngineerId = t.EngineerId,
                     Id = t.Id,
                     Jobaddress = t.Jobaddress,
                     JobId = t.JobId,
                     JobName = t.JobName,
                     OriginalQuote = t.OriginalQuote,
                     OriginalQuoteId = t.OriginalQuoteId,
                     PDFGenerated = t.PDFGenerated,
                     ProjectNumber = t.ProjectNumber,
                     QuoteComments = t.QuoteComments,
                     QuoteId = t.QuoteId,
                     QuoteDate = t.QuoteDate,
                     QuotedBy = t.QuotedBy,
                     QuoteEntered = t.QuoteEntered,
                     QuoteOut = t.QuoteOut,
                     QuoteRevision = t.QuoteRevision,
                     RevActive = t.RevActive,
                     RevisedDate = t.RevisedDate,
                     SalesmanId = t.SalesmanId,
                     SpecificationId = t.SpecificationId,
                     Status = t.Status,
                     SubmittalDoneBy = t.SubmittalDoneBy,
                     TakeoffId = t.TakeoffId,
                     UpdatedAt = t.UpdatedAt,
                     VibroLayIn = t.VibroLayIn,
                     WorksheetGenerated = t.WorksheetGenerated,
                     Salesman = u.FirstName + " " + u.LastName,
                     Engineer = e.FirstName + " " + e.LastName,
                     Contractor = c.FirstName + " " + c.LastName,
                     Architect = a.FirstName + " " + a.LastName,
                     Specification = s.Name
                 }));
            return list;
        }

        public async Task<int> DeleteTakeoff(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateTakeoff(TakeoffModel model)
        {
            var item = await GetById(model.Id);
            item.Amount = model.Amount ?? item.Amount;
            item.ArchitectId = model.ArchitectId ?? item.ArchitectId;
            item.Comments = model.Comments ?? item.Comments;
            item.ContractorId = model.ContractorId ?? item.ContractorId;
            item.BidderId = model.BidderId ?? item.BidderId;
            item.CreateDate = model.CreateDate ?? item.CreateDate;
            item.CreatedBy = model.CreatedBy ?? item.CreatedBy;
            item.DeletedAt = model.DeletedAt ?? item.DeletedAt;
            item.DrawingDate = model.DrawingDate ?? item.DrawingDate;
            item.DrawingRCVDFrom = model.DrawingRCVDFrom ?? item.DrawingRCVDFrom;
            item.DueDate = model.DueDate ?? item.DueDate;
            item.EngineerId = model.EngineerId ?? item.EngineerId;
            item.Jobaddress = model.Jobaddress ?? item.Jobaddress;
            item.JobId = model.JobId ?? item.JobId;
            item.JobName = model.JobName ?? item.JobName;
            item.OriginalQuote = model.OriginalQuote ?? item.OriginalQuote;
            item.OriginalQuoteId = model.OriginalQuoteId ?? item.OriginalQuoteId;
            item.PDFGenerated = model.PDFGenerated ?? item.PDFGenerated;
            item.ProjectNumber = model.ProjectNumber ?? item.ProjectNumber;
            item.QuoteComments = model.QuoteComments ?? item.QuoteComments;
            item.QuoteDate = model.QuoteDate ?? item.QuoteDate;
            item.QuotedBy = model.QuotedBy ?? item.QuotedBy;
            item.QuoteEntered = model.QuoteEntered ?? item.QuoteEntered;
            //item.QuoteId = model.QuoteId ?? item.QuoteId;
            item.QuoteOut = model.QuoteOut ?? item.QuoteOut;
            item.QuoteRevision = model.QuoteRevision ?? item.QuoteRevision;
            item.RevActive = model.RevActive ?? item.RevActive;
            item.RevisedDate = model.RevisedDate ?? item.RevisedDate;
            item.SalesmanId = model.SalesmanId ?? item.SalesmanId;
            item.SpecificationId = model.SpecificationId ?? item.SpecificationId;
            item.Status = model.Status ?? item.Status;
            item.SubmittalDoneBy = model.SubmittalDoneBy ?? item.SubmittalDoneBy;
            //item.TakeoffId = model.TakeoffId ?? item.TakeoffId;
            item.UpdatedAt = model.UpdatedAt ?? item.UpdatedAt;
            item.VibroLayIn = model.VibroLayIn ?? item.VibroLayIn;
            item.WorksheetGenerated = model.WorksheetGenerated ?? item.WorksheetGenerated;
            item.CreatedAt = model.CreatedAt;

            var result = await Update(item);
            return result;
        }

        public async Task<int> GenerateQuote(string id, string prefix)
        {
            string quoteId = await GetQuoteId(prefix);
            var item = await GetById(id);
            item.QuoteId = quoteId;
            item.QuoteDate = DateTime.Now;
            item.RevActive = "1";

            TimeSpan timeSpan = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            long unixTimestamp = (long)timeSpan.TotalSeconds;
            item.QuoteEntered = unixTimestamp.ToString();

            var result = await Update(item);
            return result;
        }

        public async Task<TakeoffDetails?> GetTakeoff(string id)
        {
            //var takeoffs = await GetById(id);
            List<TakeoffDetails> takeoffs = ((IEnumerable<TakeoffDetails>)
                (from t in _context.Takeoff
                 join u in _context.Users on t.SalesmanId equals u.Id into user
                 from u in user.DefaultIfEmpty()
                 join e in _context.Engineers on t.EngineerId equals e.Id into eng
                 from e in eng.DefaultIfEmpty()
                 join c in _context.Contractors on t.ContractorId equals c.Id into cont
                 from c in cont.DefaultIfEmpty()
                 join a in _context.Architects on t.ArchitectId equals a.Id into arch
                 from a in arch.DefaultIfEmpty()
                 join s in _context.Specifications on t.SpecificationId equals s.Id into spec
                 from s in spec.DefaultIfEmpty()
                 where t.Id == id
                 select new TakeoffDetails
                 {
                     Amount = t.Amount,
                     ArchitectId = t.ArchitectId,
                     BidderId = t.BidderId,
                     Bidder = "",
                     Comments = t.Comments,
                     ContractorId = t.ContractorId,
                     CreatedAt = t.CreatedAt,
                     CreatedBy = t.CreatedBy,
                     CreateDate = t.CreateDate,
                     DeletedAt = t.DeletedAt,
                     DrawingDate = t.DrawingDate,
                     DrawingRCVDFrom = t.DrawingRCVDFrom,
                     DueDate = t.DueDate,
                     EngineerId = t.EngineerId,
                     Id = t.Id,
                     Jobaddress = t.Jobaddress,
                     JobId = t.JobId,
                     JobName = t.JobName,
                     OriginalQuote = t.OriginalQuote,
                     OriginalQuoteId = t.OriginalQuoteId,
                     PDFGenerated = t.PDFGenerated,
                     ProjectNumber = t.ProjectNumber,
                     QuoteComments = t.QuoteComments,
                     QuoteId = t.QuoteId,
                     QuoteDate = t.QuoteDate,
                     QuotedBy = t.QuotedBy,
                     QuoteEntered = t.QuoteEntered,
                     QuoteOut = t.QuoteOut,
                     QuoteRevision = t.QuoteRevision,
                     RevActive = t.RevActive,
                     RevisedDate = t.RevisedDate,
                     SalesmanId = t.SalesmanId,
                     SpecificationId = t.SpecificationId,
                     Status = t.Status,
                     SubmittalDoneBy = t.SubmittalDoneBy,
                     TakeoffId = t.TakeoffId,
                     UpdatedAt = t.UpdatedAt,
                     VibroLayIn = t.VibroLayIn,
                     WorksheetGenerated = t.WorksheetGenerated,
                     Salesman = u.FirstName + " " + u.LastName,
                     Engineer = e.FirstName + " " + e.LastName,
                     Contractor = c.FirstName + " " + c.LastName,
                     Architect = a.FirstName + " " + a.LastName,
                     Specification = s.Name
                 })).ToList();

            return takeoffs.Count > 0 ? takeoffs[0] : null;
        }

        public async Task<string> GetTakeoffId(string prefix)
        {
            GeneralUtility utility = new GeneralUtility();
            string year = DateTime.Now.Year.ToString() + "-";
            List<Takeoff> takeoffs = ((IEnumerable<Takeoff>)
                (from t in _context.Takeoff
                 where t.TakeoffId != null && t.TakeoffId.Contains(year)
                 select t)).ToList();

            string id = utility.FormatId(takeoffs.Count, prefix);

            return id;
        }
        public async Task<string> GetQuoteId(string prefix)
        {
            GeneralUtility utility = new GeneralUtility();
            string compstr = DateTime.Now.Year.ToString() + "-";
            List<Takeoff> takeoffs = ((IEnumerable<Takeoff>)
                (from t in _context.Takeoff
                 where t.QuoteId != null && t.QuoteId.Contains(compstr)
                 select t)).ToList();

            string id = utility.FormatId(takeoffs.Count, prefix);

            return id;
        }
    }
}
