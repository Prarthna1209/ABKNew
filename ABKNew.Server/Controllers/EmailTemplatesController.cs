using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailTemplatesController : ControllerBase
    {
        private readonly IEmailTemplatesRepository _repository;

        public EmailTemplatesController(IEmailTemplatesRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<EmailTemplatesController>
        [HttpGet]
        public async Task<IEnumerable<EmailTemplates>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<EmailTemplatesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmailTemplates>> Get(int id)
        {
            var result = await _repository.GetEmailTemplates(id);
            return result;
        }

        // POST api/<EmailTemplatesController>
        [HttpPost]
        public async Task<bool> Post([FromBody] EmailTemplatesModel model)
        {
            var result = model.Id > 0 ?
                await _repository.UpdateEmailTemplates(model) :
                await _repository.AddEmailTemplates(model);

            return result > 0;
        }

        // PUT api/<EmailTemplatesController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] EmailTemplatesModel model)
        {
            var result = await _repository.UpdateEmailTemplates(model);

            return result > 0;
        }

        // DELETE api/<EmailTemplatesController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var result = await _repository.DeleteEmailTemplates(id);

            return result > 0;
        }
    }
}
