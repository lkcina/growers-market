using growers_market.Server.Dtos.Species;
using growers_market.Server.Models;

namespace growers_market.Server.Mappers
{
    public static class SpeciesMapper
    {
        public static SpeciesDto ToSpeciesDto(this Species speciesModel)
        {
            return new SpeciesDto
            {
                Id = speciesModel.Id,
                CommonName = speciesModel.CommonName,
                ScientificName = speciesModel.ScientificName,
                Cycle = speciesModel.Cycle,
                Watering = speciesModel.Watering,
                Sunlight = speciesModel.Sunlight,
                Indoor = speciesModel.Indoor,
                Hardiness = speciesModel.Hardiness,
                Image = speciesModel.Image,
                Thumbnail = speciesModel.Thumbnail
            };
        }


        public static Species ToSpeciesFromPerenual(this SpeciesData speciesData)
        {
            if (speciesData.default_image == null)
            {
                return new Species
                {
                    Id = speciesData.id,
                    CommonName = speciesData.common_name,
                    ScientificName = speciesData.scientific_name,
                    Cycle = speciesData.cycle,
                    Watering = speciesData.watering,
                    Sunlight = speciesData.sunlight,
                    Indoor = speciesData.indoor,
                    Hardiness = speciesData.hardiness,
                    Image = "",
                    Thumbnail = ""
                };
            }
            return new Species
            {
                Id = speciesData.id,
                CommonName = speciesData.common_name,
                ScientificName = speciesData.scientific_name,
                Cycle = speciesData.cycle,
                Watering = speciesData.watering,
                Sunlight = speciesData.sunlight,
                Indoor = speciesData.indoor,
                Hardiness = speciesData.hardiness,
                Image = speciesData.default_image.regular_url,
                Thumbnail = speciesData.default_image.thumbnail
            };
        }
    }
}
