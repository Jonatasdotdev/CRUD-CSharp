using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Desafio.Models;

public class CarrinhoItem
{
    public int CarrinhoId { get; set; } // Chave estrangeira para Carrinho


    [ValidateNever]
    public Carrinho Carrinho { get; set; } // Propriedade de navegação

    public int ItemId { get; set; } // Chave estrangeira para Item


    [ValidateNever]
    public Item Item { get; set; } // Propriedade de navegação
}