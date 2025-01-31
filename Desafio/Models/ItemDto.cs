using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

public class ItemDto
{
    [Required]
    public int ProdutoId { get; set; }

    [Required]
    public int Quantidade { get; set; }

    [Required]
    public string UnidadeMedida { get; set; }
}
