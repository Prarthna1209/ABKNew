﻿namespace ABKNew.Server.Entities
{
    public class WorksheetItems
    {
        public string Id { get; set; }
        public string WorksheetId { get; set; }
        public string ManufacturerId { get; set; }
        public string ProductId { get; set; }
        public string Unit { get; set; }
        public int Quantity { get; set; }
        public double ListPrice { get; set; }
        public double Net { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.MinValue;

    }
}
