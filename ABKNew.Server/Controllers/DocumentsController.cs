using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentsRepository _repository;

        public DocumentsController(IDocumentsRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<DocumentsController>
        [HttpGet("{SectionId}")]
        public async Task<IEnumerable<Documents>> Get(string SectionId)
        {
            var result = await _repository.GetList(SectionId);
            return result;
        }

        // GET api/<DocumentsController>/5
        [HttpGet("GetDocument/{id}")]
        public async Task<ActionResult<Documents>> GetDocument(string id)
        {
            var result = await _repository.GetDocuments(id);
            return result;
        }

        // POST api/<DocumentsController>
        [HttpPost]
        public async Task<bool> Post([FromBody] DocumentsModel model)
        {
            var result = model.Id != "" ?
                await _repository.UpdateDocuments(model) :
                await _repository.AddDocuments(model);

            return result > 0;
        }

        // PUT api/<DocumentsController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put([FromBody] DocumentsModel model)
        {
            var result = await _repository.UpdateDocuments(model);

            return result > 0;
        }

        // DELETE api/<DocumentsController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            var result = await _repository.DeleteDocuments(id);

            return result > 0;
        }
    }
}
