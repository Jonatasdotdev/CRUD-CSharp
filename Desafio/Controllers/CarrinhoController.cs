using Microsoft.AspNetCore.Mvc;
using Desafio.Data;
using Desafio.Models;

namespace Desafio.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarrinhoController : ControllerBase
{
    private readonly AppDbContext _context;

    public CarrinhoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var carrinhos = _context.Carrinhos.ToList();
        return Ok(carrinhos);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var carrinho = _context.Carrinhos.Find(id);
        if (carrinho == null) return NotFound();
        return Ok(carrinho);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Carrinho carrinho)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Verifica se os ItensCarrinho existem no banco de dados
        foreach (var itemCarrinho in carrinho.ItensCarrinho)
        {
            var itemExistente = _context.Itens.Find(itemCarrinho.ItemId);
            if (itemExistente == null)
            {
                return BadRequest($"Item com Id {itemCarrinho.ItemId} não encontrado.");
            }
        }

        _context.Carrinhos.Add(carrinho);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetById), new { id = carrinho.Id }, carrinho);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Carrinho carrinho)
    {
        if (id != carrinho.Id)
        {
            return BadRequest();
        }

        // Verifica se os ItensCarrinho existem no banco de dados
        foreach (var itemCarrinho in carrinho.ItensCarrinho)
        {
            var itemExistente = _context.Itens.Find(itemCarrinho.ItemId);
            if (itemExistente == null)
            {
                return BadRequest($"Item com Id {itemCarrinho.ItemId} não encontrado.");
            }
        }

        _context.Carrinhos.Update(carrinho);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var carrinho = _context.Carrinhos.Find(id);
        if (carrinho == null) return NotFound();
        _context.Carrinhos.Remove(carrinho);
        _context.SaveChanges();
        return NoContent();
    }
}