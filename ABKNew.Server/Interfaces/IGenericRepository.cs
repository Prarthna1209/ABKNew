﻿namespace ABKNew.Server.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetById(string id);
        Task<IEnumerable<T>> GetAll();
        Task<int> Add(T entity);
        Task<int> Update(T entity);
        Task<int> Remove(T entity);
    }
}
