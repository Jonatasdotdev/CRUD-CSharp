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
               .ThenInclude(ci => ci.Item)
                   .ThenInclude(i => i.Produto)
           .ToList();

       return Ok(carrinhos);
   }


   [HttpGet("{id}")]
   public IActionResult GetById(int id)
   {
       // Carrega um carrinho específico com os itens e seus produtos associados
       var carrinho = _context.Carrinhos
           .Include(c => c.ItensCarrinho)
           .ThenInclude(ci => ci.Item)  // Carrega os itens associados
           .ThenInclude(i => i.Produto) // Carrega o Produto associado ao Item
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

       // Verifica se os itens do carrinho existem no banco de dados
       foreach (var itemCarrinho in carrinho.ItensCarrinho)
       {
           var itemExistente = _context.Itens.Find(itemCarrinho.ItemId);
           if (itemExistente == null)
           {
               return BadRequest($"Item com Id {itemCarrinho.ItemId} não encontrado.");
           }
       }

       // Adiciona o carrinho ao banco de dados
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

       // Verifica se os itens do carrinho existem no banco de dados
       foreach (var itemCarrinho in carrinho.ItensCarrinho)
       {
           var itemExistente = _context.Itens.Find(itemCarrinho.ItemId);
           if (itemExistente == null)
           {
               return BadRequest($"Item com Id {itemCarrinho.ItemId} não encontrado.");
           }
       }

       // Atualiza o carrinho no banco de dados
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
  public IActionResult AdicionarItemAoCarrinho(int carrinhoId, [FromBody] AdicionarItemAoCarrinhoDto dto)
  {
      var carrinho = _context.Carrinhos
          .Include(c => c.ItensCarrinho)
          .FirstOrDefault(c => c.Id == carrinhoId);

      if (carrinho == null)
      {
          return NotFound("Carrinho não encontrado.");
      }

      var item = _context.Itens.Find(dto.ItemId);
      if (item == null)
      {
          return NotFound("Item não encontrado.");
      }

      // Verifica se o item já está no carrinho
      var itemExistente = carrinho.ItensCarrinho
          .FirstOrDefault(ci => ci.ItemId == dto.ItemId);

      if (itemExistente != null)
      {
          return BadRequest("O item já está no carrinho.");
      }

      // Cria uma nova instância de CarrinhoItem
      var carrinhoItem = new CarrinhoItem
      {
          CarrinhoId = carrinhoId,
          ItemId = dto.ItemId
      };

      // Adiciona o item ao carrinho
      carrinho.ItensCarrinho.Add(carrinhoItem);
      _context.SaveChanges();

      return Ok();
  }
}
