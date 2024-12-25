using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ISiteSettingsRepository _repository;

        public SettingsController(ISiteSettingsRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<SiteSettingsController>
        [HttpGet]
        public async Task<IEnumerable<SiteSettings>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<SiteSettingsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SiteSettings>> Get(string id)
        {
            var result = await _repository.GetSiteSettings(id);
            return result;
        }

        // POST api/<SiteSettingsController>
        [HttpPost]
        public async Task<bool> Post([FromBody] SiteSettingsModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateSiteSettings(model) :
                await _repository.AddSiteSettings(model);

            return result > 0;
        }

        // PUT api/<SiteSettingsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] SiteSettingsModel model)
        {
            var result = await _repository.UpdateSiteSettings(model);

            return result > 0;
        }

        // DELETE api/<SiteSettingsController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteSiteSettings(id);

            return result > 0;
        }
    }
}
