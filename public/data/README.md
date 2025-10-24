# Bridge 4 Flight Map - GeoJSON Data

This directory contains GeoJSON files for drone flight zones in Southern Ontario.

## Data Files

### safe-zones-ontario.geojson
Contains legally accessible flight areas (green zones) where recreational drone flight is generally permitted under Transport Canada regulations.

**Zones Included:**
- Vaughan Open Area (43.80-43.90°N, 79.40-79.50°W)
- Richmond Hill Recreation Area (43.75-43.85°N, 79.25-79.35°W)
- Mississauga West Open Space (43.60-43.70°N, 79.50-79.60°W)

### exclusion-zones-ontario.geojson
Contains no-fly zones (red zones) and warning areas where drone flight is restricted or prohibited.

**Zones Included:**
- Toronto Pearson Airport Buffer Zone (exclusion)
- Buttonville Airport Area (exclusion)
- Toronto Downtown Core (exclusion)
- Canada's Wonderland Special Event Area (warning)

### airports-ontario.geojson
Contains major airports in Southern Ontario with their buffer zones.

**Airports Included:**
- Toronto Pearson International Airport (YYZ/CYYZ) - 5.5nm buffer
- Buttonville Municipal Airport (CYKZ) - 3nm buffer
- Billy Bishop Toronto City Airport (YTZ/CYTZ) - 3nm buffer
- John C. Munro Hamilton International Airport (YHM/CYHM) - 3nm buffer

### custom-pois.geojson
Contains custom Points of Interest with special ratings.

**POIs Included:**
- Promenade Meadows Park (point marker at 43.8365°N, 79.4520°W) - Yellow rated
- Promenade Meadows Area (polygon zone) - Yellow rated warning zone

## Color Coding

- **Green**: Safe flight zones (Crown land, open recreational areas)
- **Red**: Exclusion zones (no-fly areas)
- **Yellow/Amber**: Warning zones (caution required, check local bylaws)
- **Cyan**: Your current location

## Data Size

Total data size: ~20KB (well under storage limits)

## Usage

These files are automatically loaded by the Map component when the application starts. Users can toggle layers on/off using the sidebar controls.

## Updates

**Last Updated:** 2025-10-24  
**Data Version:** 1.0.0  
**Next Review:** 2026-01-24

## Important Notes

⚠️ **This data is for planning purposes only.** Always:
- Verify current regulations with Transport Canada
- Check for NOTAMs and temporary flight restrictions
- Obtain necessary permissions for controlled airspace
- Respect privacy and property rights
- Follow all Transport Canada drone regulations

## Data Sources

- Transport Canada Aerodrome Data
- Municipal regulations and bylaws
- Custom user-contributed zones
- OpenStreetMap for geographical reference

## Contributing

To add or update zones:
1. Create/modify GeoJSON files following the standard format
2. Ensure all required properties are included
3. Test with the map application
4. Submit updates via pull request

## GeoJSON Format

All GeoJSON files follow standard FeatureCollection format with required properties:
- `name`: Zone name
- `type`: Zone type identifier
- `status`: legal/exclusion/warning
- `description`: Detailed description
- `restrictions`: Specific restrictions
- `data_source`: Source of the data
- `last_updated`: Date last updated

See DATA_SOURCES.md in the project root for detailed format specifications.
