using Microsoft.EntityFrameworkCore;
using Desafio.Data;

var builder = WebApplication.CreateBuilder(args);

// Adicionar DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Adicionar serviços de controllers
builder.Services.AddControllers();

// Configurar Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuração do pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization(); // Se estiver usando autenticação/autorizações

// Mapeia automaticamente os controllers
app.MapControllers();

app.Run();
