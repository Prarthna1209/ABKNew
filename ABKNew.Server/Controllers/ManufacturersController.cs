using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufacturersController : ControllerBase
    {
        private readonly IManufacturersRepository _repository;

        public ManufacturersController(IManufacturersRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<ManufacturersController>
        [HttpGet]
        public async Task<IEnumerable<Manufacturers>> Get()
        {
            var result = await _repository.GetAll();
            return result;
        }

        // GET api/<ManufacturersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Manufacturers>> Get(string id)
        {
            var result = await _repository.GetById(id);
            return result;
        }

        // GET api/<ManufacturersController>/GetProductCount/5
        [HttpGet("GetProductCount/{id}")]
        public async Task<ActionResult<int>> GetProductCount(string id)
        {
            var result = await _repository.ProductCount(id);
            return result;
        }
        // POST api/<ManufacturersController>
        [HttpPost]
        public async Task<bool> Post([FromBody] ManufacturersModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateManufacturers(model) :
                await _repository.AddManufacturers(model);

            return result > 0;
        }

        // PUT api/<ManufacturersController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] ManufacturersModel model)
        {
            var result = await _repository.UpdateManufacturers(model);

            return result > 0;
        }

        // DELETE api/<ManufacturersController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteManufacturers(id);

            return result > 0;
        }
    }
}
