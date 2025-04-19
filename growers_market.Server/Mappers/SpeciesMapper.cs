using System.Text.RegularExpressions;
using AutoMapper;
using growers_market.Server.Dtos.Species;
using growers_market.Server.Models;

namespace growers_market.Server.Mappers
{
    public class SpeciesMapperProfile : Profile
    {
        public SpeciesMapperProfile()
        {
            CreateMap<Species, SpeciesDto>();
        }
    }
    public static class SpeciesMapper
    {
        public static Species ToSpeciesFromAllPerenual(this AllSpeciesData speciesData)
        {
            List<string>? formattedSunlight = speciesData.sunlight?.Select(str =>
            {
                switch (str.ToLower())
                {
                    case "full sun":
                        return "Full sun";
                    case "part shade":
                        return "Part shade";
                    case "full shade":
                        return "Full shade";
                    case "sun part shade":
                        return "Part sun";
                    default:
                        return char.ToUpper(str.ToLower()[0]) + str.ToLower().Substring(1);
                }
            }).ToList();
            return new Species
            {
                Id = speciesData.id,
                CommonName = Regex.Replace(speciesData.common_name.ToLower(), @"\b(?<!\b')([a-z])", match => match.Value.ToUpper()),
                ScientificName = speciesData.scientific_name,
                Cycle = char.ToUpper(speciesData.cycle.ToLower()[0]) + speciesData.cycle.ToLower().Substring(1),
                Watering = char.ToUpper(speciesData.watering.ToLower()[0]) + speciesData.watering.ToLower().Substring(1),
                Sunlight = formattedSunlight,
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
            List<string>? formattedSunlight = speciesData.sunlight?.Select(str =>
            {
                switch (str.ToLower())
                {
                    case "full sun":
                        return "Full sun";
                    case "part shade":
                        return "Part shade";
                    case "full shade":
                        return "Full shade";
                    case "sun part shade":
                        return "Part sun";
                    default:
                        return char.ToUpper(str.ToLower()[0]) + str.ToLower().Substring(1);
                }
            }).ToList();
            return new Species
            {
                Id = speciesData.id,
                CommonName = Regex.Replace(speciesData.common_name.ToLower(), @"\b(?<!\b')([a-z])", match => match.Value.ToUpper()),
                ScientificName = speciesData.scientific_name,
                Cycle = char.ToUpper(speciesData.cycle.ToLower()[0]) + speciesData.cycle.ToLower().Substring(1),
                Watering = char.ToUpper(speciesData.watering.ToLower()[0]) + speciesData.watering.ToLower().Substring(1),
                Sunlight = formattedSunlight,
                Indoor = speciesData.indoor,
                HardinessMin = int.TryParse(speciesData.hardiness.min, out int minResult) ? minResult : 0,
                HardinessMax = int.TryParse(speciesData.hardiness.max, out int maxResult) ? maxResult : 0,
                Description = speciesData.description,
                Image = speciesData.default_image == null ? "" : speciesData.default_image.regular_url,
                Thumbnail = speciesData.default_image == null ? "" : speciesData.default_image.thumbnail
            };
        }

        public static AllSpeciesDto ToAllSpeciesDtoFromPerenual(this AllPerenualSpecies speciesData, IMapper mapper)
        {
            return new AllSpeciesDto
            {
                Data = speciesData.data.Select(species => mapper.Map<SpeciesDto>(species.ToSpeciesFromAllPerenual())).ToList(),
                To = speciesData.to ?? 0,
                PerPage = speciesData.per_page,
                CurrentPage = speciesData.current_page,
                From = speciesData.from ?? 0,
                LastPage = speciesData.last_page,
                Total = speciesData.total
            };
        }

        public static AllSpeciesDto ToAllSpeciesDtoFromSpeciesDtoList(this List<SpeciesDto> speciesData)
        {
            return new AllSpeciesDto
            {
                Data = speciesData,
                To = speciesData.Count,
                PerPage = 30,
                CurrentPage = 1,
                From = 1,
                LastPage = 1,
                Total = speciesData.Count
            };
        }
    }
}
