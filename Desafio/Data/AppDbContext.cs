using Microsoft.EntityFrameworkCore;
using Desafio.Models;

namespace Desafio.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Item> Itens { get; set; }
    public DbSet<Carrinho> Carrinhos { get; set; }
    public DbSet<CarrinhoItem> CarrinhoItens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configuração do relacionamento muitos-para-muitos
        modelBuilder.Entity<CarrinhoItem>()
            .HasKey(ci => new { ci.CarrinhoId, ci.ItemId }); // Chave composta

        modelBuilder.Entity<CarrinhoItem>()
            .HasOne(ci => ci.Carrinho)
            .WithMany(c => c.ItensCarrinho)
            .HasForeignKey(ci => ci.CarrinhoId);

        modelBuilder.Entity<CarrinhoItem>()
            .HasOne(ci => ci.Item)
            .WithMany()
            .HasForeignKey(ci => ci.ItemId);
    }
}