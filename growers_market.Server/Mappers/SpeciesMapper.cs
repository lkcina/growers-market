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
                GenusName = speciesModel.GenusName,
                SpeciesName = speciesModel.SpeciesName,
                Image = speciesModel.Image
            };
        }
    }
}
