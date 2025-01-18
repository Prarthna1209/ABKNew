using ABKNew.Server.Entities;
using ABKNew.Server.JwtFeatures;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<Users> _usersManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly JwtHandler _jwtHandler;
        public AccountController(UserManager<Users> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration, JwtHandler jwtHandler)
        {
            _usersManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(UsersModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new Users
            {
                UserName = userModel.UserName,
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName
            };

            var result = await _usersManager.CreateAsync(user, userModel.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            if (userModel.Role is null)
            {
                await _usersManager.AddToRoleAsync(user, "Salesman");
            }
            else
            {
                await _usersManager.AddToRoleAsync(user, userModel.Role.Name);
            }

            return Ok(new AuthResponseModel
            {
                IsSuccess = true,
                Message = "Account created successfully!"
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _usersManager.FindByNameAsync(loginModel.Username);
            if (user is null)
            {
                return Unauthorized(new AuthResponseModel
                {
                    IsSuccess = false,
                    Message = "User not found"
                });
            }

            var result = await _usersManager.CheckPasswordAsync(user, loginModel.Password);
            if (!result)
            {
                return Unauthorized(new AuthResponseModel
                {
                    IsSuccess = false,
                    Message = "Invalid password!"
                });
            }
            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new AuthResponseModel { IsSuccess = true, Token = token });
        }

        //private string GenerateToken(UsersModel user) {
        //    var tokenHandler = new JwtSecurityTokenHandler();

        //    var key = Encoding.ASCII
        //        .GetBytes(_configuration.GetSection("JWTSetting").GetSection("securityKey").Value!);
        //}
    }
}
