namespace ABKNew.Server.Entities
{
    public class TakeoffTakeoffNotes
    {
        public string Id { get; set; }
        public string TakeoffNoteId { get; set; }
        public string TakeoffId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
