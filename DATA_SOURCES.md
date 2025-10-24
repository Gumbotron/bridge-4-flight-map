# Data Sources Documentation

This document outlines the data sources and integration strategies for the Bridge 4 Flight Map application.

## Overview

The application integrates geographic data from multiple authoritative sources to provide accurate drone flight planning information for Southern Ontario. All data is loaded as external GeoJSON files and cached locally for performance.

## Primary Data Sources

### 1. Crown Land Use Policy Atlas (CLUPA)

**Source:** Ontario Ministry of Natural Resources and Forestry  
**Data Type:** Crown land boundaries and classifications  
**Format:** GeoJSON, Shapefile  
**Coverage:** Province of Ontario

**Integration:**
```javascript
import { loadGeoJSON } from './utils/dataLoader'

const crownLandData = await loadGeoJSON('/data/crown-land-ontario.geojson')
```

**Properties Expected:**
- `name`: Land parcel name
- `type`: 'crown_land'
- `category`: Land use category
- `status`: 'legal' or 'restricted'
- `description`: Additional details
- `restrictions`: Any specific restrictions

**Data URL:** https://www.ontario.ca/page/crown-land-use-policy-atlas

**Update Frequency:** Quarterly

**File Size:** ~200-400MB (recommend splitting by region)

### 2. NAV CANADA - Canadian Aviation Regulations

**Source:** NAV CANADA  
**Data Type:** Controlled airspace, navigation zones  
**Format:** GeoJSON converted from AIXM  
**Coverage:** Canadian airspace

**Integration:**
```javascript
const controlledAirspaceData = await loadGeoJSON('/data/controlled-airspace.geojson')
```

**Properties Expected:**
- `name`: Airspace name
- `type`: 'controlled_airspace'
- `class`: Airspace class (A, B, C, D, E, F, G)
- `lower_limit`: Lower altitude limit (feet AGL)
- `upper_limit`: Upper altitude limit (feet AGL)
- `description`: Operating requirements
- `contact`: ATC contact information

**Data URL:** https://www.navcanada.ca/en/aeronautical-information/canadian-aviation-documents-and-maps.html

**Update Frequency:** Every 56 days (AIRAC cycle)

**File Size:** ~50-100MB

### 3. Transport Canada - Aerodromes

**Source:** Transport Canada  
**Data Type:** Airport and aerodrome locations  
**Format:** GeoJSON  
**Coverage:** Canada (filtered for Southern Ontario)

**Integration:**
```javascript
const airportData = await loadGeoJSON('/data/airports-ontario.geojson')
```

**Properties Expected:**
- `name`: Airport/aerodrome name
- `type`: 'airport'
- `icao_code`: ICAO identifier
- `aerodrome_type`: Type (certified, registered, etc.)
- `buffer_nm`: Buffer zone in nautical miles (default: 3)
- `description`: Facility description
- `contact`: Contact information

**Data URL:** https://www.tc.gc.ca/en/services/aviation/aerodrome-safety.html

**Update Frequency:** Monthly

**File Size:** ~5-10MB

### 4. Parks and Protected Areas

**Source:** Ontario Parks, Parks Canada  
**Data Type:** National and provincial parks  
**Format:** GeoJSON  
**Coverage:** Ontario

**Integration:**
```javascript
const parkData = await loadGeoJSON('/data/parks-ontario.geojson')
```

**Properties Expected:**
- `name`: Park name
- `type`: 'park'
- `category`: 'national', 'provincial', 'conservation'
- `status`: 'exclusion'
- `description`: Park description
- `restrictions`: 'No drones permitted' or specific rules
- `contact`: Park authority contact

**Data URL:** https://www.ontarioparks.com/

**Update Frequency:** Annually

**File Size:** ~20-30MB

## Secondary Data Sources

### 5. Custom User POIs

**Source:** User uploads  
**Data Type:** Points of Interest  
**Format:** CSV or GeoJSON  
**Coverage:** User-defined

**CSV Format:**
```csv
name,lat,lng,description
My Favorite Spot,43.6532,-79.3832,Great views
Launch Site,43.7532,-79.4832,Open field
```

**GeoJSON Format:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-79.3832, 43.6532]
      },
      "properties": {
        "name": "My Favorite Spot",
        "description": "Great views"
      }
    }
  ]
}
```

## Data Processing Pipeline

### 1. Data Acquisition
```bash
# Download from authoritative sources
# Convert to GeoJSON if necessary
# Validate format and structure
```

### 2. Data Transformation
```javascript
// Filter by geographic bounds (Southern Ontario)
import { filterByBounds } from './utils/zoneFilters'

const southernOntarioBounds = [
  [42.0, -83.0], // Southwest corner
  [46.0, -74.0]  // Northeast corner
]

const filteredData = filterByBounds(rawData, southernOntarioBounds)
```

### 3. Data Optimization
- Simplify geometries using tools like Mapshaper
- Remove unnecessary properties
- Split large files by region
- Compress with gzip

### 4. Data Validation
```javascript
// Validate GeoJSON structure
function validateGeoJSON(data) {
  if (!data.type || data.type !== 'FeatureCollection') {
    throw new Error('Invalid GeoJSON: Must be FeatureCollection')
  }
  
  if (!Array.isArray(data.features)) {
    throw new Error('Invalid GeoJSON: features must be an array')
  }
  
  // Additional validation...
}
```

## Integration Strategy

### Loading Strategy
1. **On-demand loading**: Load data only when needed
2. **Progressive loading**: Load critical data first
3. **Background loading**: Load additional data in background
4. **Caching**: Use localStorage for frequently accessed data

### Example Implementation
```javascript
import { loadCachedGeoJSON } from './utils/dataLoader'

// Load with caching (24-hour cache)
const crownLand = await loadCachedGeoJSON(
  'crown-land-ontario',
  '/data/crown-land-ontario.geojson',
  24 * 60 * 60 * 1000
)

// Load multiple sources in parallel
const [crownLand, airports, parks] = await Promise.all([
  loadGeoJSON('/data/crown-land-ontario.geojson'),
  loadGeoJSON('/data/airports-ontario.geojson'),
  loadGeoJSON('/data/parks-ontario.geojson')
])
```

### Error Handling
```javascript
try {
  const data = await loadGeoJSON(url)
} catch (error) {
  console.error('Failed to load data:', error)
  // Fallback to empty dataset
  // Show user-friendly error message
}
```

## Data Storage

### Local Storage
- Cache frequently accessed GeoJSON
- Store user preferences
- Save custom POIs
- Maximum ~10MB per origin

### File System (Future)
- Consider IndexedDB for larger datasets
- Store preprocessed tile data
- Enable offline mode

## Data Update Process

### Automated Updates
1. Check data source update schedules
2. Download new data when available
3. Validate and process
4. Replace cached data
5. Notify users of updates

### Manual Updates
1. Administrator downloads new data
2. Process and validate
3. Upload to hosting (GitHub Pages)
4. Update cache keys to force reload

## Data Attribution

All data sources must be properly attributed:

### In Application Footer
```html
Data Sources: Ontario MNRF (Crown Land), NAV CANADA (Airspace),
Transport Canada (Aerodromes), Ontario Parks (Protected Areas)
```

### In InfoPanel
```javascript
// Show source for selected zone
<div className="text-xs text-storm-light">
  Source: {feature.properties.data_source}
  Updated: {feature.properties.last_updated}
</div>
```

## GeoJSON Property Standards

### Required Properties
```json
{
  "type": "Feature",
  "geometry": { /* ... */ },
  "properties": {
    "name": "Zone Name",
    "type": "zone_type",
    "status": "legal|exclusion|warning",
    "data_source": "Source Name",
    "last_updated": "2025-10-24"
  }
}
```

### Optional Properties
```json
{
  "description": "Detailed description",
  "restrictions": "Specific restrictions",
  "contact": "Contact information",
  "url": "More information URL",
  "effective_date": "2025-01-01",
  "expiry_date": "2026-01-01"
}
```

## Data Hosting

### GitHub Pages
- Store GeoJSON files in `public/data/` directory
- Automatically served with the application
- Free hosting up to 1GB
- CDN distribution

### Alternative Hosting
- **AWS S3**: For larger datasets
- **Cloudflare R2**: Cost-effective object storage
- **Self-hosted**: For complete control

## Performance Optimization

### File Size Targets
- Individual GeoJSON files: < 50MB uncompressed
- Total data package: < 500MB
- Enable gzip compression: ~80% size reduction

### Loading Optimization
```javascript
// Load only visible layers
if (layers.crownLand) {
  const data = await loadGeoJSON('/data/crown-land.geojson')
}

// Load by viewport bounds
const visibleData = filterByBounds(allData, mapBounds)
```

### Rendering Optimization
- Simplify complex geometries
- Use clustering for dense point data
- Implement viewport-based rendering
- Consider vector tiles for very large datasets

## Legal Considerations

1. **Data Licensing**: Ensure compliance with data source licenses
2. **Terms of Use**: Respect terms and conditions
3. **Attribution**: Provide proper credit
4. **Privacy**: Don't collect or store user location data
5. **Disclaimer**: Clearly state that data may not be current

## Future Data Sources

### Potential Additions
1. **Weather data**: Real-time weather conditions
2. **NOTAM**: Notices to Airmen
3. **TFR**: Temporary Flight Restrictions
4. **Wildlife areas**: Sensitive ecological zones
5. **Private property**: Landowner restrictions
6. **Events**: Temporary no-fly zones for events

---

**Last Updated:** 2025-10-24  
**Data Version:** 1.0.0  
**Next Review:** 2026-01-24
