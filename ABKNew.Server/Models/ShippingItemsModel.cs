﻿namespace ABKNew.Server.Models
{
    public class ShippingItemsModel
    {
        public string Id { get; set; }
        public string Title { get; set; } = "";
        public string Created_by { get; set; } = "1";
        public string? Updated_by { get; set; }
        public DateTime Created_at { get; set; } = DateTime.Now;
    }
}
