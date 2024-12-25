using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PMController : ControllerBase
    {
        private readonly IPMRepository _repository;

        public PMController(IPMRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<PMController>
        [HttpGet]
        public async Task<IEnumerable<PM>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<PMController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PM>> Get(string id)
        {
            var result = await _repository.GetPM(id);
            return result;
        }

        // POST api/<PMController>
        [HttpPost]
        public async Task<bool> Post([FromBody] PMModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdatePM(model) :
                await _repository.AddPM(model);

            return result > 0;
        }

        // PUT api/<PMController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] PMModel model)
        {
            var result = await _repository.UpdatePM(model);

            return result > 0;
        }

        // DELETE api/<PMController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeletePM(id);

            return result > 0;
        }
    }
}
