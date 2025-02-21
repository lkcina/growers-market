namespace growers_market.Server.Dtos.Address
{
    public class AddressComponent
    {
        public string long_name { get; set; } = string.Empty;
        public string short_name { get; set; } = string.Empty;
        public List<string> types { get; set; } = new List<string>();
    }
    public class AddressLocation
    {
        public double lat { get; set; } = 0;
        public double lng { get; set; } = 0;
    }
    public class AddressGeometry
    {
        public AddressLocation location { get; set; } = new AddressLocation();
        public string location_type { get; set; } = string.Empty;
    }
    public class AddressResult
    {
        public List<AddressComponent> address_components { get; set; } = new List<AddressComponent>();
        public string formatted_address { get; set; } = string.Empty;
        public AddressGeometry geometry { get; set; } = new AddressGeometry();
        public string place_id { get; set; } = string.Empty;
        public List<string> types { get; set; } = new List<string>();
    }
    public class GoogleAddressDto
    {
        public List<AddressResult> results { get; set; } = new List<AddressResult>();
        public string status { get; set; } = string.Empty;
    }
}
