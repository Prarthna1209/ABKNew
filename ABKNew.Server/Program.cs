using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.JwtFeatures;
using ABKNew.Server.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Configuration;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var JWTSetting = builder.Configuration.GetSection("JWTSetting");
// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddIdentity<Users, IdentityRole>()
    .AddEntityFrameworkStores<ABKDBContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(opt =>
{
    opt.SaveToken = true;
    opt.RequireHttpsMetadata = false;
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = JWTSetting["validIssuer"],
        ValidAudience = JWTSetting["validAudience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTSetting.GetSection("securityKey").Value!))
    };
});

builder.Services.AddDbContext<ABKDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("ABKConnectionLocal")));

builder.Services.AddScoped<JwtHandler>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IShippingItemsRepository, ShippingItemsRepository>();
builder.Services.AddScoped<ITaxesRepository, TaxesRepository>();
builder.Services.AddScoped<IShippingsRepository, ShippingsRepository>();
builder.Services.AddScoped<IArchitectsRepository, ArchitectsRepository>();
builder.Services.AddScoped<IBiddersRepository, BiddersRepository>();
builder.Services.AddScoped<IContractorsRepository, ContractorsRepository>();
builder.Services.AddScoped<IEmailTemplatesRepository, EmailTemplatesRepository>();
builder.Services.AddScoped<IEngineersRepository, EngineersRepository>();
builder.Services.AddScoped<IManufacturersRepository, ManufacturersRepository>();
builder.Services.AddScoped<IPDNIRepository, PDNIRepository>();
builder.Services.AddScoped<IPMRepository, PMRepository>();
builder.Services.AddScoped<ISpecificationRepository, SpecificationsRepository>();
builder.Services.AddScoped<IUserRolesRepository, UserRolesRepository>();
builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IWorkbookNotesRepository, WorkbookNotesRepository>();
builder.Services.AddScoped<ITakeoffRepository, TakeoffRepository>();
builder.Services.AddScoped<ITakeoffDocumentsRepository, TakeoffDocumentsRepository>();
builder.Services.AddScoped<ITakeoffNotesRepository, TakeoffNotesRepository>();
builder.Services.AddScoped<ITakeoffTakeoffNotesRepository, TakeoffTakeoffNotesRepository>();
builder.Services.AddScoped<ISiteSettingsRepository, SiteSettingsRepository>();
builder.Services.AddScoped<IEmailAccountsRepository, EmailAccountsRepository>();
builder.Services.AddScoped<IEngineeringRepository, EngineeringRepository>();
builder.Services.AddScoped<IDocumentsRepository, DocumentsRepository>();
builder.Services.AddScoped<IWorkbookNotesWorksheetRepository, WorkbookNotesWorksheetRepository>();
builder.Services.AddScoped<IWorksheetItemsRepository, WorksheetItemsRepository>();
builder.Services.AddScoped<IWorksheetsRepository, WorksheetsRepository>();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(
    c =>
    {
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = @"JWT Authorization example: bearer jlkjljjdljsjdslj",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement()
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference=new OpenApiReference
                    {
                        Type=ReferenceType.SecurityScheme,
                        Id="Bearer"
                    },
                    Scheme= "outh2",
                    Name="Bearer",
                    In=ParameterLocation.Header
                },
                new List<string>()
            }
        });
    });

// Add Distributed Memory Cache (required for sessions)
builder.Services.AddDistributedMemoryCache(); //Use AddStackExchangeRedisCache for Redis

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Session timeout
    options.Cookie.HttpOnly = true; // Important for security
    options.Cookie.IsEssential = true; // Make the cookie essential
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();
app.UseCors("AllowAll");

app.UseSession();
app.MapControllers();

app.MapFallbackToFile("/index.html");


app.Run();
