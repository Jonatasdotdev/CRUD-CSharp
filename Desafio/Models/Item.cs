using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;


namespace Desafio.Models;

public class Item
{
    public int Id { get; set; }

    public int ProdutoId { get; set; } // Relacionamento com Produto

    [Required]
    public int Quantidade { get; set; }

    [Required]
    public string UnidadeMedida { get; set; }

    public Produto Produto { get; set; }
}