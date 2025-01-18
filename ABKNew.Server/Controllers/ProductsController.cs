using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsRepository _repository;

        public ProductsController(IProductsRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<ProductsController>
        [HttpGet]
        public async Task<IEnumerable<Products>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> Get(string id)
        {
            var result = await _repository.GetProducts(id);
            return result;
        }

        // POST api/<ProductsController>
        [HttpPost]
        public async Task<bool> Post([FromBody] ProductsModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateProducts(model) :
                await _repository.AddProducts(model);

            return result > 0;
        }

        // PUT api/<ProductsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] ProductsModel model)
        {
            var result = await _repository.UpdateProducts(model);

            return result > 0;
        }

        // DELETE api/<ProductsController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteProducts(id);

            return result > 0;
        }
    }
}
