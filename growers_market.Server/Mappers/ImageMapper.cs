using growers_market.Server.Dtos.Address;
using growers_market.Server.Dtos.ImagePosition;
using growers_market.Server.Models;

namespace growers_market.Server.Mappers
{
    public static class ImageMapper
    {
        public static ImageDto ToImageDto(this Image image)
        {
            return new ImageDto
            {
                Url = image.Url,
                PositionX = image.PositionX,
                PositionY = image.PositionY
            };
        }
    }
}
