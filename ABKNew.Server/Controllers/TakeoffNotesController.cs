using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TakeoffNotesController : ControllerBase
    {
        private readonly ITakeoffNotesRepository _repository;

        public TakeoffNotesController(ITakeoffNotesRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<TakeoffNotesController>
        [HttpGet]
        public async Task<IEnumerable<TakeoffNotes>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<TakeoffNotesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TakeoffNotes>> Get(string id)
        {
            var result = await _repository.GetTakeoffNotes(id);
            return result;
        }

        // POST api/<TakeoffNotesController>
        [HttpPost]
        public async Task<bool> Post([FromBody] TakeoffNotesModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateTakeoffNotes(model) :
                await _repository.AddTakeoffNotes(model);

            return result > 0;
        }

        // PUT api/<TakeoffNotesController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] TakeoffNotesModel model)
        {
            var result = await _repository.UpdateTakeoffNotes(model);

            return result > 0;
        }

        // DELETE api/<TakeoffNotesController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteTakeoffNotes(id);

            return result > 0;
        }
    }
}
