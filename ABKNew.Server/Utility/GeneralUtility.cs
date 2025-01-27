namespace ABKNew.Server.Utility
{
    public class GeneralUtility
    {
        public string FormatId(int id, string prefix)
        {
            string formatedId = "";
            int currentYear = DateTime.Now.Year;
            formatedId = $"{prefix}{currentYear}-{id + 1:0000}";
            return formatedId;
        }
    }
}
