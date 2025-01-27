using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TakeoffController : ControllerBase
    {
        private readonly ITakeoffRepository _repository;

        public TakeoffController(ITakeoffRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<TakeoffController>
        [HttpGet]
        public async Task<IEnumerable<TakeoffDetails>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET: api/<TakeoffController>
        [HttpGet("GetPendingQuote")]
        public async Task<IEnumerable<TakeoffDetails>> GetPendingQuote()
        {
            var result = await _repository.GetPendingQuotes();
            return result;
        }

        // GET: api/<TakeoffController>
        [HttpGet("GetQuotes")]
        public async Task<IEnumerable<TakeoffDetails>> GetQuotes()
        {
            var result = await _repository.GetQuotes();
            return result;
        }

        // GET: api/<TakeoffController>
        [HttpGet("GetTakeoffId")]
        public async Task<string> GetTakeoffId()
        {
            string prefix = HttpContext.Session.GetString("Prefix_Takeoff") ?? "";
            var result = await _repository.GetTakeoffId(prefix);
            return result;
        }

        // GET: api/<TakeoffController>
        [HttpGet("GetQuoteId")]
        public async Task<string> GetQuoteId()
        {
            string prefix = HttpContext.Session.GetString("Prefix_Quote") ?? "";
            var result = await _repository.GetQuoteId(prefix);
            return result;
        }

        // GET api/<TakeoffController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TakeoffDetails>> Get(string id)
        {
            var result = await _repository.GetTakeoff(id);
            return result;
        }

        // POST api/<TakeoffController>
        [HttpPost]
        public async Task<bool> Post([FromBody] TakeoffModel model)
        {
            string prefix = HttpContext.Session.GetString("Prefix_Takeoff") ?? "";
            var result = model.Id != "" ?
                await _repository.UpdateTakeoff(model) :
                await _repository.AddTakeoff(model, prefix);

            return result > 0;
        }

        // PUT api/<TakeoffController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] TakeoffModel model)
        {
            var result = await _repository.UpdateTakeoff(model);

            return result > 0;
        }

        // PUT api/<TakeoffController>/5
        [HttpGet("GenerateQuote/{id}")]
        public async Task<bool> GenerateQuote(string id)
        {
            string prefix = HttpContext.Session.GetString("Prefix_Quote") ?? "";
            var result = await _repository.GenerateQuote(id, prefix);

            return result > 0;
        }
        // DELETE api/<TakeoffController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteTakeoff(id);

            return result > 0;
        }
    }
}
