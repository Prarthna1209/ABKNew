using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TakeoffTakeoffNotesController : ControllerBase
    {
        private readonly ITakeoffTakeoffNotesRepository _repository;

        public TakeoffTakeoffNotesController(ITakeoffTakeoffNotesRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<TakeoffTakeoffNotesController>
        [HttpGet]
        public async Task<IEnumerable<TakeoffTakeoffNotes>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<TakeoffTakeoffNotesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TakeoffTakeoffNotes>> Get(string id)
        {
            var result = await _repository.GetTakeoffTakeoffNotes(id);
            return result;
        }

        // POST api/<TakeoffTakeoffNotesController>
        [HttpPost]
        public async Task<bool> Post([FromBody] TakeoffTakeoffNotesModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateTakeoffTakeoffNotes(model) :
                await _repository.AddTakeoffTakeoffNotes(model);

            return result > 0;
        }

        // PUT api/<TakeoffTakeoffNotesController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] TakeoffTakeoffNotesModel model)
        {
            var result = await _repository.UpdateTakeoffTakeoffNotes(model);

            return result > 0;
        }

        // DELETE api/<TakeoffTakeoffNotesController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteTakeoffTakeoffNotes(id);

            return result > 0;
        }

        // DELETE api/<TakeoffTakeoffNotesController>/5
        [HttpDelete("DeleteByTakeoffId/{id}")]
        public async Task<bool> DeleteByTakeoffId(string id)
        {
            var result = await _repository.DeleteByTakeoffId(id);

            return result > 0;
        }
    }
}
