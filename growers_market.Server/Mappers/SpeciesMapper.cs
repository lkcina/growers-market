using growers_market.Server.Dtos.Species;
using growers_market.Server.Models;

namespace growers_market.Server.Mappers
{
    public static class SpeciesMapper
    {
        public static AllSpeciesDto ToAllSpeciesDto(this Species speciesModel)
        {
            return new AllSpeciesDto
            {
                Id = speciesModel.Id,
                CommonName = speciesModel.CommonName,
                GenusName = speciesModel.GenusName,
                SpeciesName = speciesModel.SpeciesName
            };
        }
    }
}
