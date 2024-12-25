using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _repository;

        public UsersController(IUsersRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IEnumerable<Users>> Get()
        {
            var result = await _repository.GetList();
            return result;
        }


        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> Get(string id)
        {
            var result = await _repository.GetUsers(id);
            return result;
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<bool> Post([FromBody] UsersModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateUsers(model) :
                await _repository.AddUsers(model);

            return result > 0;
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] UsersModel model)
        {
            var result = await _repository.UpdateUsers(model);

            return result > 0;
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteUsers(id);

            return result > 0;
        }
        // GET: api/<UsersController>/SalesPersons
        [HttpGet("SalesPersons")]
        public async Task<IEnumerable<Users>> GetSalesPersons()
        {
            var result = _repository.GetSalesPersons();
            return result;
        }
    }
}
