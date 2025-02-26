using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// cai npm i vite-plugin-mkcert -D, de code react, khi co san pham thi ko can xai nua
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt => 
{
opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
// transient, scopes, singleton
//scopes chay het request, toi response thi chet
// khi chay het service
builder.Services.AddTransient<ExecptionMiddleware>();
var app = builder.Build();


// Configure the HTTP request pipeline.
app.UseMiddleware<ExecptionMiddleware>();
app.UseCors(opt =>
{
opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3000");
});

app.MapControllers();

DbInitializer.InitDb(app);

app.Run();
