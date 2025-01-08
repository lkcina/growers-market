namespace growers_market.Server.Dtos.Species
{
    public class SpeciesDetailsDto
    {
        public int Id { get; set; }
        public string CommonName { get; set; } = string.Empty;
        public string GenusName { get; set; } = string.Empty;
        public string SpeciesName { get; set; } = string.Empty;
        public string Description {  get; set; } = string.Empty;
    }
}
