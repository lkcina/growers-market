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
                HardinessMin = speciesModel.HardinessMin,
                HardinessMax = speciesModel.HardinessMax,
                Description = speciesModel.Description,
                Image = speciesModel.Image,
                Thumbnail = speciesModel.Thumbnail
            };
        }


        public static Species ToSpeciesFromAllPerenual(this AllSpeciesData speciesData)
        {
            return new Species
            {
                Id = speciesData.id,
                CommonName = speciesData.common_name,
                ScientificName = speciesData.scientific_name,
                Cycle = speciesData.cycle,
                Watering = speciesData.watering,
                Sunlight = speciesData.sunlight == null ? new List<string>() : speciesData.sunlight,
                Indoor = speciesData.indoor,
                HardinessMin = int.TryParse(speciesData.hardiness.min, out int minResult) ? minResult : 0,
                HardinessMax = int.TryParse(speciesData.hardiness.max, out int maxResult) ? maxResult : 0,
                Description = "",
                Image = speciesData.default_image == null ? "" : speciesData.default_image.regular_url,
                Thumbnail = speciesData.default_image == null ? "" : speciesData.default_image.thumbnail
            };
        }

        public static Species ToSpeciesFromDetailsPerenual(this DetailsSpeciesData speciesData)
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
                HardinessMin = int.TryParse(speciesData.hardiness.min, out int minResult) ? minResult : 0,
                HardinessMax = int.TryParse(speciesData.hardiness.max, out int maxResult) ? maxResult : 0,
                Description = speciesData.description,
                Image = speciesData.default_image == null ? "" : speciesData.default_image.regular_url,
                Thumbnail = speciesData.default_image == null ? "" : speciesData.default_image.thumbnail
            };
        }

        public static AllSpeciesDto ToAllSpeciesDtoFromPerenual(this AllPerenualSpecies speciesData)
        {
            return new AllSpeciesDto
            {
                Data = speciesData.data.Select(species => species.ToSpeciesFromAllPerenual().ToSpeciesDto()).ToList(),
                To = speciesData.to,
                PerPage = speciesData.per_page,
                CurrentPage = speciesData.current_page,
                From = speciesData.from,
                LastPage = speciesData.last_page,
                Total = speciesData.total
            };
        }
    }
}
