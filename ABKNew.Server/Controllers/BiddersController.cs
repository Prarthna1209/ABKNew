using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BiddersController : ControllerBase
    {
        private readonly IBiddersRepository _repository;

        public BiddersController(IBiddersRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<BiddersController>
        [HttpGet]
        public async Task<IEnumerable<Bidders>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<BiddersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bidders>> Get(string id)
        {
            var result = await _repository.GetBidders(id);
            return result;
        }

        // POST api/<BiddersController>
        [HttpPost]
        public async Task<bool> Post([FromBody] BiddersModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateBidders(model) :
                await _repository.AddBidders(model);

            return result > 0;
        }

        // PUT api/<BiddersController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] BiddersModel model)
        {
            var result = await _repository.UpdateBidders(model);

            return result > 0;
        }

        // DELETE api/<BiddersController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteBidders(id);

            return result > 0;
        }
    }
}
