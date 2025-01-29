namespace Desafio.Models;

public class CarrinhoItem
{
    public int CarrinhoId { get; set; } // Chave estrangeira para Carrinho
    public Carrinho Carrinho { get; set; } // Propriedade de navegação
    public int ItemId { get; set; } // Chave estrangeira para Item
    public Item Item { get; set; } // Propriedade de navegação
}