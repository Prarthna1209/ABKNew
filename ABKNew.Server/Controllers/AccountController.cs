using ABKNew.Server.Entities;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ABKNew.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<Users> _usersManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<Users> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration)
        {
            _usersManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(UsersModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new Users { 
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

            if(userModel.Role is null)
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
                Message="Account created successfully!"
            });
        }

    }
}
