using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingItemsController : ControllerBase
    {
        private readonly IShippingItemsRepository _shippingItemsRepository;

        public ShippingItemsController(IShippingItemsRepository shippingItemsRepository)
        {
            _shippingItemsRepository = shippingItemsRepository;
        }


        // GET: api/<ShippingItemsController>
        [HttpGet]
        public async Task<IEnumerable<ShippingItems>> Get()
        {
            var result = await _shippingItemsRepository.GetAll();
            return result;
        }

        // GET api/<ShippingItemsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShippingItems>> Get(int id)
        {
            var result = await _shippingItemsRepository.GetById(id);
            return result;
        }

        // POST api/<ShippingItemsController>
        [HttpPost]
        public async Task<bool> Post([FromBody] ShippingItemsModel model)
        {
            var result = model.Id > 0 ? 
                await _shippingItemsRepository.UpdateShippingItem(model) :
                await _shippingItemsRepository.AddShippingItem(model);

            return result > 0;
        }

        // PUT api/<ShippingItemsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] ShippingItemsModel model)
        {
            var result = await _shippingItemsRepository.UpdateShippingItem(model);

            return result > 0;
        }

        // DELETE api/<ShippingItemsController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var result = await _shippingItemsRepository.DeleteShippingItem(id);

            return result > 0;
        }
    }
}
