namespace growers_market.Server.Dtos.Species
{
    public class SpeciesDto
    {
        public int Id { get; set; }
        public string CommonName { get; set; } = string.Empty;
        public string GenusName { get; set; } = string.Empty;
        public string SpeciesName { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}
