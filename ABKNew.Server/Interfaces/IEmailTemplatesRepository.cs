﻿using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IEmailTemplatesRepository : IGenericRepository<EmailTemplates>
    {
        Task<IEnumerable<EmailTemplates>> GetList();
        Task<EmailTemplates> GetEmailTemplates(int id);
        Task<int> AddEmailTemplates(EmailTemplatesModel EmailTemplates);
        Task<int> UpdateEmailTemplates(EmailTemplatesModel EmailTemplates);
        Task<int> DeleteEmailTemplates(int id);
    }
}
