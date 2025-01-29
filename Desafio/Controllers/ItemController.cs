using Microsoft.AspNetCore.Mvc;
using Desafio.Data;
using Desafio.Models;

namespace Desafio.Controllers;

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
        var itens = _context.Itens.ToList();
        return Ok(itens);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var item = _context.Itens.Find(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Item item)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Itens.Add(item);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Item item)
    {
        if (id != item.Id) return BadRequest();
        _context.Itens.Update(item);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var item = _context.Itens.Find(id);
        if (item == null) return NotFound();
        _context.Itens.Remove(item);
        _context.SaveChanges();
        return NoContent();
    }
}