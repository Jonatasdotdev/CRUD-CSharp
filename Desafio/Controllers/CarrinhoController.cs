using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Desafio.Data;
using Desafio.Models;
using System.Linq;

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
       var carrinhos = _context.Carrinhos
           .Include(c => c.ItensCarrinho)
           .ThenInclude(ci => ci.Item) // Carrega os itens associados
           .ToList();
       return Ok(carrinhos);
   }

   [HttpGet("{id}")]
   public IActionResult GetById(int id)
   {
       var carrinho = _context.Carrinhos
           .Include(c => c.ItensCarrinho)
           .ThenInclude(ci => ci.Item) // Carrega os itens associados
           .FirstOrDefault(c => c.Id == id);

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

    [HttpDelete("{carrinhoId}/itens/{itemId}")]
    public IActionResult RemoverItemDoCarrinho(int carrinhoId, int itemId)
    {
        var carrinho = _context.Carrinhos
            .Include(c => c.ItensCarrinho)
            .FirstOrDefault(c => c.Id == carrinhoId);

        if (carrinho == null)
        {
            return NotFound("Carrinho não encontrado.");
        }

        var itemCarrinho = carrinho.ItensCarrinho
            .FirstOrDefault(ci => ci.ItemId == itemId);

        if (itemCarrinho == null)
        {
            return NotFound("Item não encontrado no carrinho.");
        }

        carrinho.ItensCarrinho.Remove(itemCarrinho);
        _context.SaveChanges();

        return NoContent();
    }

   [HttpPost("{carrinhoId}/itens")]
   public IActionResult AdicionarItemAoCarrinho(int carrinhoId, [FromBody] int itemId)
   {
       var carrinho = _context.Carrinhos
           .Include(c => c.ItensCarrinho)
           .FirstOrDefault(c => c.Id == carrinhoId);

       if (carrinho == null)
       {
           return NotFound("Carrinho não encontrado.");
       }

       var item = _context.Itens.Find(itemId);
       if (item == null)
       {
           return NotFound("Item não encontrado.");
       }

       // Verifica se o item já está no carrinho
       var itemExistente = carrinho.ItensCarrinho
           .FirstOrDefault(ci => ci.ItemId == itemId);

       if (itemExistente != null)
       {
           return BadRequest("O item já está no carrinho.");
       }

       // Cria uma nova instância de CarrinhoItem
       var carrinhoItem = new CarrinhoItem
       {
           CarrinhoId = carrinhoId,
           ItemId = itemId
       };

       // Adiciona o item ao carrinho
       carrinho.ItensCarrinho.Add(carrinhoItem);
       _context.SaveChanges();

       return Ok();
   }}
