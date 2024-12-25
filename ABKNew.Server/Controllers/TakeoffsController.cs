using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TakeoffController : ControllerBase
    {
        private readonly ITakeoffRepository _repository;

        public TakeoffController(ITakeoffRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<TakeoffController>
        [HttpGet]
        public async Task<IEnumerable<Takeoff>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<TakeoffController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Takeoff>> Get(string id)
        {
            var result = await _repository.GetTakeoff(id);
            return result;
        }

        // POST api/<TakeoffController>
        [HttpPost]
        public async Task<bool> Post([FromBody] TakeoffModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateTakeoff(model) :
                await _repository.AddTakeoff(model);

            return result > 0;
        }

        // PUT api/<TakeoffController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] TakeoffModel model)
        {
            var result = await _repository.UpdateTakeoff(model);

            return result > 0;
        }

        // DELETE api/<TakeoffController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteTakeoff(id);

            return result > 0;
        }
    }
}
