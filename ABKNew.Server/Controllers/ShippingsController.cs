using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingsController : ControllerBase
    {
        private readonly IShippingsRepository _repository;

        public ShippingsController(IShippingsRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<TaxesController>/VIA
        [HttpGet("{type}")]
        public async Task<IEnumerable<Shippings>> Get(string type)
        {
            var result = await _repository.GetAll();
            result = result.Where(x => x.Type == type);
            return result;
        }

        // GET api/<TaxesController>/5
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Shippings>> GetById(string id)
        {
            var result = await _repository.GetById(id);
            return result;
        }

        // POST api/<TaxesController>
        [HttpPost]
        public async Task<bool> Post([FromBody] ShippingModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateShipping(model) :
                await _repository.AddShipping(model);

            return result > 0;
        }

        // PUT api/<TaxesController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] ShippingModel model)
        {
            var result = await _repository.UpdateShipping(model);

            return result > 0;
        }

        // DELETE api/<TaxesController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteShipping(id);

            return result > 0;
        }
    }
}
