using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EngineersController : ControllerBase
    {
        private readonly IEngineersRepository _repository;

        public EngineersController(IEngineersRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<EngineersController>
        [HttpGet]
        public async Task<IEnumerable<Engineers>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<EngineersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Engineers>> Get(string id)
        {
            var result = await _repository.GetEngineers(id);
            return result;
        }

        // POST api/<EngineersController>
        [HttpPost]
        public async Task<bool> Post([FromBody] EngineersModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateEngineers(model) :
                await _repository.AddEngineers(model);

            return result > 0;
        }

        // PUT api/<EngineersController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] EngineersModel model)
        {
            var result = await _repository.UpdateEngineers(model);

            return result > 0;
        }

        // DELETE api/<EngineersController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteEngineers(id);

            return result > 0;
        }
    }
}
