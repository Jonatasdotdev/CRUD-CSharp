namespace Desafio.Models;

public class Carrinho
{
    public int Id { get; set; }
    public ICollection<CarrinhoItem> ItensCarrinho { get; set; } // Relacionamento muitos-para-muitos com Item
}