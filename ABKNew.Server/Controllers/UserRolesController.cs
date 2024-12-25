using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRolesController : ControllerBase
    {
        private readonly IUserRolesRepository _repository;

        public UserRolesController(IUserRolesRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<UserRolesController>
        [HttpGet]
        public async Task<IEnumerable<UserRoles>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }
        

        // GET api/<UserRolesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserRoles>> Get(string id)
        {
            var result = await _repository.GetUserRoles(id);
            return result;
        }

        // POST api/<UserRolesController>
        [HttpPost]
        public async Task<bool> Post([FromBody] UserRolesModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateUserRoles(model) :
                await _repository.AddUserRoles(model);

            return result > 0;
        }

        // PUT api/<UserRolesController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] UserRolesModel model)
        {
            var result = await _repository.UpdateUserRoles(model);

            return result > 0;
        }

        // DELETE api/<UserRolesController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteUserRoles(id);

            return result > 0;
        }
    }
}
