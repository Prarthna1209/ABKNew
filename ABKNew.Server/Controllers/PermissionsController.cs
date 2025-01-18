using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionsController : ControllerBase
    {
        private readonly IPermissionsRepository _repository;

        public PermissionsController(IPermissionsRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<PermissionsController>
        [HttpGet]
        public async Task<IEnumerable<Permissions>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }

        // GET api/<PermissionsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Permissions>> Get(string id)
        {
            var result = await _repository.GetPermissions(id);
            return result;
        }

        // GET api/<PermissionsController>/5
        [HttpGet("{module}")]
        public async Task<IEnumerable<Permissions>> GetByModule(string module)
        {
            var result = await _repository.GetPermissionsByModule(module);
            return result;
        }

        // POST api/<PermissionsController>
        [HttpPost]
        public async Task<bool> Post([FromBody] PermissionsModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdatePermissions(model) :
                await _repository.AddPermissions(model);

            return result > 0;
        }

        // PUT api/<PermissionsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] PermissionsModel model)
        {
            var result = await _repository.UpdatePermissions(model);

            return result > 0;
        }

        // DELETE api/<PermissionsController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeletePermissions(id);

            return result > 0;
        }
    }
}
