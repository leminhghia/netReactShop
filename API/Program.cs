using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// cai npm i vite-plugin-mkcert -D, de code react, khi co san pham thi ko can xai nua
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    // opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
        opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));

});
builder.Services.AddCors();
// transient, scopes, singleton
//scopes chay het request, toi response thi chet
// khi chay het service
builder.Services.AddTransient<ExecptionMiddleware>();
builder.Services.AddScoped<PaymentsServices>();



//section 9 step 2 (
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})

    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<StoreContext>();

//)
var app = builder.Build();


// Configure the HTTP request pipeline.
app.UseMiddleware<ExecptionMiddleware>();
//section 12 (
app.UseDefaultFiles();
app.UseStaticFiles();
//)
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3000");
});

//section 9(
app.UseAuthentication();// biet ai la admin ...
app.UseAuthorization();// xac dinh nguoif dung dc lam gi
app.MapGroup("api").MapIdentityApi<User>();// muon ssu dung identity, thi url phai co"api"
//)
//section 12 (
app.MapFallbackToController("Index","Fallback");
//)
app.MapControllers();

await DbInitializer.InitDb(app);

app.Run();
