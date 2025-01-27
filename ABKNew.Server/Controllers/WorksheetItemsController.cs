using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorksheetItemsController : ControllerBase
    {
        private readonly IWorksheetItemsRepository _repository;

        public WorksheetItemsController(IWorksheetItemsRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<WorksheetItemsController>
        [HttpGet]
        public async Task<IEnumerable<WorksheetItems>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }


        // GET api/<WorksheetItemsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorksheetItems>> Get(string id)
        {
            var result = await _repository.GetWorksheetItems(id);
            return result;
        }

        // POST api/<WorksheetItemsController>
        [HttpPost]
        public async Task<bool> Post([FromBody] WorksheetItemsModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateWorksheetItems(model) :
                await _repository.AddWorksheetItems(model);

            return result > 0;
        }

        // PUT api/<WorksheetItemsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] WorksheetItemsModel model)
        {
            var result = await _repository.UpdateWorksheetItems(model);

            return result > 0;
        }

        // DELETE api/<WorksheetItemsController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteWorksheetItems(id);

            return result > 0;
        }
    }
}
