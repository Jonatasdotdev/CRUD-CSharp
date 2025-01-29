using Microsoft.AspNetCore.Mvc;
using Desafio.Data;
using Desafio.Models;

namespace Desafio.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutoController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProdutoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var produtos = _context.Produtos.ToList();
        return Ok(produtos);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var produto = _context.Produtos.Find(id);
        if (produto == null) return NotFound();
        return Ok(produto);
    }

    [HttpPost]
    public IActionResult Post(Produto produto)
    {
        _context.Produtos.Add(produto);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetById), new { id = produto.Id }, produto);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Produto produto)
    {
        if (id != produto.Id) return BadRequest();
        _context.Produtos.Update(produto);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var produto = _context.Produtos.Find(id);
        if (produto == null) return NotFound();
        _context.Produtos.Remove(produto);
        _context.SaveChanges();
        return NoContent();
    }
}