using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorksheetsController : ControllerBase
    {
        private readonly IWorksheetsRepository _repository;
        private readonly IPDNIWorksheetRepository _pdnirepository;
        private readonly IWorksheetItemsRepository _wirepository;
        private readonly IWorkbookNotesWorksheetRepository _notesrepository;
        private readonly ITakeoffTakeoffNotesRepository _takeoffnotesrepository;

        public WorksheetsController(IWorksheetsRepository repository,
            IPDNIWorksheetRepository pdnirepository,
            IWorksheetItemsRepository wirepository,
            IWorkbookNotesWorksheetRepository notesrepository,
            ITakeoffTakeoffNotesRepository takeoffnotesrepository
            )
        {
            _repository = repository;
            _notesrepository = notesrepository;
            _pdnirepository = pdnirepository;
            _wirepository = wirepository;
            _takeoffnotesrepository = takeoffnotesrepository;
        }

        // GET: api/<WorksheetsController>
        [HttpGet]
        public async Task<IEnumerable<Worksheets>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }


        // GET api/<WorksheetsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Worksheets>> Get(string id)
        {
            var result = await _repository.GetWorksheets(id);
            return result;
        }

        // POST api/<WorksheetsController>
        [HttpPost]
        public async Task<bool> Post([FromBody] WorksheetsModel model)
        {
            var result=new Dictionary<string, object>();
            if (model.Id != "")
            {
                await _pdnirepository.DeleteByWorksheetId(model.Id);
                await _notesrepository.DeleteByWorksheetId(model.Id);
                await _wirepository.DeleteByWorksheetId(model.Id);
                //await _takeoffnotesrepository.DeleteByTakeoffId(model.TakeoffId);

                result = await _repository.UpdateWorksheets(model);
            }
            else
                result = await _repository.AddWorksheets(model);

            return (int)result["result"] > 0;
        }

        // POST api/<WorksheetsController>
        [HttpPost("BulkCreate")]
        public async Task<bool> BulkCreate([FromBody] List<WorksheetsModel> sheets)
        {
            var result = new Dictionary<string, object>();
            foreach (var model in sheets)
            {
                if (model.Id != "")
                {
                    await _pdnirepository.DeleteByWorksheetId(model.Id);
                    await _notesrepository.DeleteByWorksheetId(model.Id);
                    await _wirepository.DeleteByWorksheetId(model.Id);
                    //await _takeoffnotesrepository.DeleteByTakeoffId(model.TakeoffId);

                    result = await _repository.UpdateWorksheets(model);
                }
                else
                    result = await _repository.AddWorksheets(model);
                string id = result["id"].ToString();
                if (model.PDNIWorksheets.Count() > 0)
                {
                    await _pdnirepository.BulkSave(model.PDNIWorksheets);
                }
                if (model.WorksheetItems.Count() > 0)
                {
                    await _wirepository.BulkSave(model.WorksheetItems);
                }
                if (model.NotesWorksheets.Count() > 0)
                {
                    await _notesrepository.BulkSave(model.NotesWorksheets);
                }
            }
            var obj = (int)result["result"];
            return obj > 0;
        }


        // PUT api/<WorksheetsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] WorksheetsModel model)
        {
            var result = await _repository.UpdateWorksheets(model);

            var obj = (int)result["result"];
            return obj > 0;
        }

        // DELETE api/<WorksheetsController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteWorksheets(id);

            return result > 0;
        }
    }
}
