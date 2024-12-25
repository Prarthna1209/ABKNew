using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TakeoffDocumentsController : ControllerBase
    {
        private readonly ITakeoffDocumentsRepository _repository;

        public TakeoffDocumentsController(ITakeoffDocumentsRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<TakeoffDocumentsController>
        [HttpGet]
        public async Task<IEnumerable<TakeoffDocuments>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<TakeoffDocumentsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TakeoffDocuments>> Get(string id)
        {
            var result = await _repository.GetTakeoffDocuments(id);
            return result;
        }

        // POST api/<TakeoffDocumentsController>
        [HttpPost]
        public async Task<bool> Post([FromBody] TakeoffDocumentsModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateTakeoffDocuments(model) :
                await _repository.AddTakeoffDocuments(model);

            return result > 0;
        }

        // PUT api/<TakeoffDocumentsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] TakeoffDocumentsModel model)
        {
            var result = await _repository.UpdateTakeoffDocuments(model);

            return result > 0;
        }

        // DELETE api/<TakeoffDocumentsController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteTakeoffDocuments(id);

            return result > 0;
        }
    }
}
