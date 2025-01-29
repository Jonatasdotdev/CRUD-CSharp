using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Desafio.Models;

public class Item
{
    public int Id { get; set; }

    [Required]
    public int ProdutoId { get; set; } // Relacionamento com Produto

    [JsonIgnore]
    [ValidateNever] // Adicione esta linha
    public Produto Produto { get; set; } // Propriedade de navegação

    [Required]
    public int Quantidade { get; set; }

    [Required]
    public string UnidadeMedida { get; set; }
}