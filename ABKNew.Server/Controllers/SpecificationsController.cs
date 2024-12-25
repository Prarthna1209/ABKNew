using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecificationsController : ControllerBase
    {
        private readonly ISpecificationRepository _repository;

        public SpecificationsController(ISpecificationRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<SpecificationsController>
        [HttpGet]
        public async Task<IEnumerable<Specifications>> Get()
        {
            var result = await _repository.GetAll();
            return result;
        }

        // GET api/<SpecificationsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Specifications>> Get(string id)
        {
            var result = await _repository.GetById(id);
            return result;
        }

        // POST api/<SpecificationsController>
        [HttpPost]
        public async Task<bool> Post([FromBody] SpecificationsModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateSpecifications(model) :
                await _repository.AddSpecifications(model);

            return result > 0;
        }

        // PUT api/<SpecificationsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] SpecificationsModel model)
        {
            var result = await _repository.UpdateSpecifications(model);

            return result > 0;
        }

        // DELETE api/<SpecificationsController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteSpecifications(id);

            return result > 0;
        }
    }
}
