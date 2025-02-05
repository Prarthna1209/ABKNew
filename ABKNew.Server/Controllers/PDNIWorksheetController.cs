using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PDNIWorksheetController : ControllerBase
    {
        private readonly IPDNIWorksheetRepository _repository;

        public PDNIWorksheetController(IPDNIWorksheetRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<PDNIWorksheetController>
        [HttpGet]
        public async Task<IEnumerable<PDNIWorksheet>> Get()
        {
            var result = await _repository.GetAll();
            return result;
        }

        // GET api/<PDNIWorksheetController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PDNIWorksheet>> Get(string id)
        {
            var result = await _repository.GetById(id);
            return result;
        }

        // POST api/<PDNIWorksheetController>
        [HttpPost]
        public async Task<bool> Post([FromBody] PDNIWorksheetModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdatePDNIWorksheet(model) :
                await _repository.AddPDNIWorksheet(model);

            return result > 0;
        }

        // PUT api/<PDNIWorksheetController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] PDNIWorksheetModel model)
        {
            var result = await _repository.UpdatePDNIWorksheet(model);

            return result > 0;
        }

        // DELETE api/<PDNIWorksheetController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeletePDNIWorksheet(id);

            return result > 0;
        }

        // DELETE api/<PDNIWorksheetController>/5
        [HttpDelete("DeleteByWorksheetId/{id}")]
        public async Task<bool> DeleteByWorksheetId(string id)
        {
            var result = await _repository.DeleteByWorksheetId(id);

            return result > 0;
        }
    }
}
