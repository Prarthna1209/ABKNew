using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailAccountsController : ControllerBase
    {
        private readonly IEmailAccountsRepository _repository;

        public EmailAccountsController(IEmailAccountsRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<EmailAccountsController>
        [HttpGet]
        public async Task<IEnumerable<EmailAccounts>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<EmailAccountsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmailAccounts>> Get(string id)
        {
            var result = await _repository.GetEmailAccounts(id.ToString());
            return result;
        }

        // POST api/<EmailAccountsController>
        [HttpPost]
        public async Task<bool> Post([FromBody] EmailAccountsModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateEmailAccounts(model) :
                await _repository.AddEmailAccounts(model);

            return result > 0;
        }

        // PUT api/<EmailAccountsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] EmailAccountsModel model)
        {
            var result = await _repository.UpdateEmailAccounts(model);

            return result > 0;
        }

        // DELETE api/<EmailAccountsController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteEmailAccounts(id.ToString());

            return result > 0;
        }
    }
}
