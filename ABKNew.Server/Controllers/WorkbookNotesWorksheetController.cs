using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkbookNotesWorksheetController : ControllerBase
    {
        private readonly IWorkbookNotesWorksheetRepository _repository;

        public WorkbookNotesWorksheetController(IWorkbookNotesWorksheetRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<WorkbookNotesWorksheetController>
        [HttpGet]
        public async Task<IEnumerable<WorkbookNotesWorksheet>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }


        // GET api/<WorkbookNotesWorksheetController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkbookNotesWorksheet>> Get(string id)
        {
            var result = await _repository.GetWorkbookNotesWorksheet(id);
            return result;
        }

        // POST api/<WorkbookNotesWorksheetController>
        [HttpPost]
        public async Task<bool> Post([FromBody] WorkbookNotesWorksheetModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateWorkbookNotesWorksheet(model) :
                await _repository.AddWorkbookNotesWorksheet(model);

            return result > 0;
        }

        // PUT api/<WorkbookNotesWorksheetController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] WorkbookNotesWorksheetModel model)
        {
            var result = await _repository.UpdateWorkbookNotesWorksheet(model);

            return result > 0;
        }

        // DELETE api/<WorkbookNotesWorksheetController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteWorkbookNotesWorksheet(id);

            return result > 0;
        }
    }
}
