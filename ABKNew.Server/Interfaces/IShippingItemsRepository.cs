﻿using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IShippingItemsRepository : IGenericRepository<ShippingItems>
    {
        Task<IEnumerable<ShippingItems>> GetList();
        Task<ShippingItems> GetShippingItem(string id);
        Task<int> AddShippingItem(ShippingItemsModel shippingItem);
        Task<int> UpdateShippingItem(ShippingItemsModel shippingItem);
        Task<int> DeleteShippingItem(string id);
    }
}
