namespace Desafio.Models;

public class Item
{
    public int Id { get; set; }
    public int ProdutoId { get; set; } // Relacionamento com Produto
    public Produto Produto { get; set; } // Propriedade de navegação
    public int Quantidade { get; set; }
    public string UnidadeMedida { get; set; }
}