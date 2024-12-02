using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractorsController : ControllerBase
    {
        private readonly IContractorsRepository _repository;

        public ContractorsController(IContractorsRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<ContractorsController>
        [HttpGet]
        public async Task<IEnumerable<Contractors>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<ContractorsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contractors>> Get(int id)
        {
            var result = await _repository.GetContractors(id);
            return result;
        }

        // POST api/<ContractorsController>
        [HttpPost]
        public async Task<bool> Post([FromBody] ContractorsModel model)
        {
            var result = model.Id > 0 ?
                await _repository.UpdateContractors(model) :
                await _repository.AddContractors(model);

            return result > 0;
        }

        // PUT api/<ContractorsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] ContractorsModel model)
        {
            var result = await _repository.UpdateContractors(model);

            return result > 0;
        }

        // DELETE api/<ContractorsController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var result = await _repository.DeleteContractors(id);

            return result > 0;
        }
    }
}
