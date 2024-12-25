using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.VisualBasic;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using System.Xml.Linq;

namespace ABKNew.Server.Repositories
{
    public class TakeoffRepository : GenericRepository<Takeoff>, ITakeoffRepository
    {
        public TakeoffRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddTakeoff(TakeoffModel model)
        {
            Takeoff item = new()
            {
                Id = Guid.NewGuid().ToString(),
                Amount = model.Amount,
                ArchitectId = model.ArchitectId ?? null,
                Comments = model.Comments ?? "",
                ContractorId = model.ContractorId ?? null,
                CreateDate = model.CreateDate ?? DateTime.MinValue,
                CreatedBy = model.CreatedBy ?? null,
                DeletedAt = model.DeletedAt ?? DateTime.MinValue,
                DrawingDate = model.DrawingDate ?? DateTime.MinValue,
                DrawingRCVDFrom = model.DrawingRCVDFrom ?? "",
                DueDate = model.DueDate ?? DateTime.MinValue,
                EngineerId = model.EngineerId ?? null,
                Jobaddress = model.Jobaddress ?? "",
                JobId = model.JobId ?? null,
                JobName = model.JobName ?? "",
                OriginalQuote = model.OriginalQuote ?? "",
                OriginalQuoteId = model.OriginalQuoteId ?? null,
                PDFGenerated = model.PDFGenerated ?? "",
                ProjectNumber = model.ProjectNumber ?? "",
                QuoteComments = model.QuoteComments ?? "",
                QuoteDate = model.QuoteDate ?? DateTime.MinValue,
                QuotedBy = model.QuotedBy ?? "",
                QuoteEntered = model.QuoteEntered ?? "",
                QuoteId = model.QuoteId ?? null,
                QuoteOut = model.QuoteOut ?? "",
                QuoteRevision = model.QuoteRevision ?? "",
                RevActive = model.RevActive ?? "",
                RevisedDate = model.RevisedDate ?? DateTime.MinValue,
                SalesmanId = model.SalesmanId ?? null,
                SpecificationId = model.SpecificationId ?? null,
                Status = model.Status ?? "",
                SubmittalDoneBy = model.SubmittalDoneBy ?? null,
                TakeoffId = model.TakeoffId ?? null,
                UpdatedAt = model.UpdatedAt ?? "",
                VibroLayIn = model.VibroLayIn ?? "",
                WorksheetGenerated = model.WorksheetGenerated ?? "",
                CreatedAt = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<Takeoff>> GetList()
        {
            return await GetAll();
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
            item.QuoteId = model.QuoteId ?? item.QuoteId ;
            item.QuoteOut = model.QuoteOut ?? item.QuoteOut;
            item.QuoteRevision = model.QuoteRevision ?? item.QuoteRevision;
            item.RevActive = model.RevActive ?? item.RevActive;
            item.RevisedDate = model.RevisedDate ?? item.RevisedDate;
            item.SalesmanId = model.SalesmanId ?? item.SalesmanId;
            item.SpecificationId = model.SpecificationId ?? item.SpecificationId;
            item.Status = model.Status ?? item.Status;
            item.SubmittalDoneBy = model.SubmittalDoneBy ?? item.SubmittalDoneBy;
            item.TakeoffId = model.TakeoffId ?? item.TakeoffId;
            item.UpdatedAt = model.UpdatedAt ?? item.UpdatedAt;
            item.VibroLayIn = model.VibroLayIn ?? item.VibroLayIn;
            item.WorksheetGenerated = model.WorksheetGenerated ?? item.WorksheetGenerated;
            item.CreatedAt = model.CreatedAt;

            var result = await Update(item);
            return result;
        }

        public async Task<Takeoff> GetTakeoff(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
