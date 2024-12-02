using ABKNew.Server.Entities;
using Microsoft.AspNetCore.Identity;

namespace ABKNew.Server.Models
{
    public class UsersModel : IdentityUser
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string UserName { get; set; }
        public string Usercode { get; set; }

        public string Email { get; set; }
        public DateTime? EmailVerifiedAt { get; set; }
        public string Password { get; set; }
        public string? Phone { get; set; }
        public string? ProfileImage { get; set; }
        public string? Remarks { get; set; }
        public bool? IsOnline { get; set; } = false;
        public DateTime? LastActivity { get; set; }

        public DateTime? CreatedAt { get; set; }
        public int RoleId { get; set; }
        public UserRoles? Role { get; set; }
        public bool? IsDeleted { get; set; } = false;
    }
}
