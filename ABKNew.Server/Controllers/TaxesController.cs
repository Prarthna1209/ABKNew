using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using ABKNew.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaxesController : ControllerBase
    {
        private readonly ITaxesRepository _repository;

        public TaxesController(ITaxesRepository repository) 
        {
            _repository = repository;
        }

        // GET: api/<TaxesController>
        [HttpGet]
        public async Task<IEnumerable<Taxes>> Get()
        {
            var result = await _repository.GetAll();
            return result;
        }

        // GET api/<TaxesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Taxes>> Get(string id)
        {
            var result = await _repository.GetById(id);
            return result;
        }

        // POST api/<TaxesController>
        [HttpPost]
        public async Task<bool> Post([FromBody] TaxesModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateTax(model) :
                await _repository.AddTax(model);

            return result > 0;
        }

        // PUT api/<TaxesController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] TaxesModel model)
        {
            var result = await _repository.UpdateTax(model);

            return result > 0;
        }

        // DELETE api/<TaxesController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteTax(id);

            return result > 0;
        }
    }
}
