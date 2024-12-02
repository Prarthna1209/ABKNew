using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PDNIController : ControllerBase
    {
        private readonly IPDNIRepository _repository;

        public PDNIController(IPDNIRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<PDNIController>
        [HttpGet]
        public async Task<IEnumerable<PDNI>> Get()
        {
            var result = await _repository.GetAll();
            return result;
        }

        // GET api/<PDNIController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PDNI>> Get(int id)
        {
            var result = await _repository.GetById(id);
            return result;
        }

        // POST api/<PDNIController>
        [HttpPost]
        public async Task<bool> Post([FromBody] PDNIModel model)
        {
            var result = model.Id > 0 ?
                await _repository.UpdatePDNI(model) :
                await _repository.AddPDNI(model);

            return result > 0;
        }

        // PUT api/<PDNIController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] PDNIModel model)
        {
            var result = await _repository.UpdatePDNI(model);

            return result > 0;
        }

        // DELETE api/<PDNIController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var result = await _repository.DeletePDNI(id);

            return result > 0;
        }
    }
}
