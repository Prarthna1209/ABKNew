using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorksheetsController : ControllerBase
    {
        private readonly IWorksheetsRepository _repository;

        public WorksheetsController(IWorksheetsRepository repository)
        {
            _repository = repository;
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
            var result = model.Id != "" ?
                await _repository.UpdateWorksheets(model) :
                await _repository.AddWorksheets(model);

            return result > 0;
        }

        // PUT api/<WorksheetsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] WorksheetsModel model)
        {
            var result = await _repository.UpdateWorksheets(model);

            return result > 0;
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
