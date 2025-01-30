using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Desafio.Data;
using Desafio.Models;
using System.Linq;

namespace Desafio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ItemController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var itens = _context.Itens
                .AsNoTracking()
                .Include(i => i.Produto)
                .ToList();
            return Ok(itens);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = _context.Itens
                .AsNoTracking()
                .Include(i => i.Produto)
                .FirstOrDefault(i => i.Id == id);

            return item != null ? Ok(item) : NotFound();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Item item)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Itens.Add(item);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Item item)
        {
            if (id != item.Id)
                return BadRequest("O ID do item na URL e no corpo da requisição devem ser iguais.");

            if (!_context.Itens.Any(i => i.Id == id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Itens.Update(item);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = _context.Itens.Find(id);
            if (item == null)
                return NotFound();

            _context.Itens.Remove(item);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
