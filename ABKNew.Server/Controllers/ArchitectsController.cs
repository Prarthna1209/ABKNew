using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArchitectsController : ControllerBase
    {
        private readonly IArchitectsRepository _repository;

        public ArchitectsController(IArchitectsRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<ArchitectsController>
        [HttpGet]
        public async Task<IEnumerable<Architects>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<ArchitectsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Architects>> Get(int id)
        {
            var result = await _repository.GetArchitects(id);
            return result;
        }

        // POST api/<ArchitectsController>
        [HttpPost]
        public async Task<bool> Post([FromBody] ArchitectsModel model)
        {
            var result = model.Id > 0 ?
                await _repository.UpdateArchitects(model) :
                await _repository.AddArchitects(model);

            return result > 0;
        }

        // PUT api/<ArchitectsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] ArchitectsModel model)
        {
            var result = await _repository.UpdateArchitects(model);

            return result > 0;
        }

        // DELETE api/<ArchitectsController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var result = await _repository.DeleteArchitects(id);

            return result > 0;
        }
    }
}
