﻿namespace ABKNew.Server.Entities
{
    public class Specifications
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string? Created_by { get; set; } = "1";
        public string? Updated_at { get; set; }
        public DateTime? Created_at { get; set; } = DateTime.Now;
    }
}
