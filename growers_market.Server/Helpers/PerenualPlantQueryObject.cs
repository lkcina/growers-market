namespace growers_market.Server.Helpers
{
    public class PerenualPlantQueryObject
    {
        public int Page { get; set; } = 1;
        public string? Q { get; set; }

        public string? Order { get; set; }
        public bool? Edible { get; set; }
        public bool? Poisonous { get; set; }
        public string? Cycle { get; set; }
        public string? Watering { get; set; }
        public string? Sunlight { get; set; }
        public bool? Indoor { get; set; }
        public int? Hardiness { get; set; }
    }
}
