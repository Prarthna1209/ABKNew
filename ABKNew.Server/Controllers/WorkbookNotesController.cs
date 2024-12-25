using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkbookNotesController : ControllerBase
    {
        private readonly IWorkbookNotesRepository _repository;

        public WorkbookNotesController(IWorkbookNotesRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<WorkbookNotesController>
        [HttpGet]
        public async Task<IEnumerable<WorkbookNotes>> Get()
        {
            var result = await _repository.GetAll();
            return result;
        }

        // GET api/<WorkbookNotesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkbookNotes>> Get(string id)
        {
            var result = await _repository.GetById(id);
            return result;
        }

        // POST api/<WorkbookNotesController>
        [HttpPost]
        public async Task<bool> Post([FromBody] WorkbookNotesModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateWorkbookNote(model) :
                await _repository.AddWorkbookNote(model);

            return result > 0;
        }

        // PUT api/<WorkbookNotesController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] WorkbookNotesModel model)
        {
            var result = await _repository.UpdateWorkbookNote(model);

            return result > 0;
        }

        // DELETE api/<WorkbookNotesController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteWorkbookNote(id);

            return result > 0;
        }
    }
}
