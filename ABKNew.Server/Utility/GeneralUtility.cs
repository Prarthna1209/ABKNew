namespace ABKNew.Server.Utility
{
    public class GeneralUtility
    {
        public string FormatId(int id)
        {
            string formatedId = "";
            int currentYear = DateTime.Now.Year;
            formatedId = $"{currentYear}-{id + 1:0000}";
            return formatedId;
        }
    }
}
