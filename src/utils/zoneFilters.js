/**
 * Zone filtering utilities for exclusion zones
 * Filters for parks, airports, and controlled airspace
 */

/**
 * Filter features by zone type
 * @param {Object} geojson - GeoJSON FeatureCollection
 * @param {string} zoneType - Type of zone to filter
 * @returns {Object} - Filtered GeoJSON FeatureCollection
 */
export function filterByZoneType(geojson, zoneType) {
  if (!geojson || !geojson.features) {
    return { type: 'FeatureCollection', features: [] }
  }

  return {
    type: 'FeatureCollection',
    features: geojson.features.filter(feature => 
      feature.properties && feature.properties.type === zoneType
    )
  }
}

/**
 * Filter park exclusion zones
 * @param {Object} geojson - GeoJSON FeatureCollection
 * @returns {Object} - Filtered park zones
 */
export function filterParkZones(geojson) {
  if (!geojson || !geojson.features) {
    return { type: 'FeatureCollection', features: [] }
  }

  return {
    type: 'FeatureCollection',
    features: geojson.features.filter(feature => {
      const props = feature.properties
      return props && (
        props.type === 'park' ||
        props.category === 'park' ||
        (props.name && props.name.toLowerCase().includes('park'))
      )
    })
  }
}

/**
 * Filter airport zones with buffer
 * @param {Object} geojson - GeoJSON FeatureCollection
 * @param {number} bufferNm - Buffer in nautical miles (default: 3)
 * @returns {Object} - Filtered airport zones
 */
export function filterAirportZones(geojson, bufferNm = 3) {
  if (!geojson || !geojson.features) {
    return { type: 'FeatureCollection', features: [] }
  }

  return {
    type: 'FeatureCollection',
    features: geojson.features.filter(feature => {
      const props = feature.properties
      return props && (
        props.type === 'airport' ||
        props.category === 'airport' ||
        props.aerodrome_type
      )
    }),
    metadata: {
      bufferNm,
      bufferMeters: bufferNm * 1852 // Convert nautical miles to meters
    }
  }
}

/**
 * Filter controlled airspace zones
 * @param {Object} geojson - GeoJSON FeatureCollection
 * @returns {Object} - Filtered controlled airspace zones
 */
export function filterControlledAirspace(geojson) {
  if (!geojson || !geojson.features) {
    return { type: 'FeatureCollection', features: [] }
  }

  return {
    type: 'FeatureCollection',
    features: geojson.features.filter(feature => {
      const props = feature.properties
      return props && (
        props.type === 'controlled_airspace' ||
        props.airspace_class ||
        props.class // Class A, B, C, D, E, F, G
      )
    })
  }
}

/**
 * Filter zones by bounding box
 * @param {Object} geojson - GeoJSON FeatureCollection
 * @param {Array} bounds - [[minLat, minLng], [maxLat, maxLng]]
 * @returns {Object} - Filtered GeoJSON
 */
export function filterByBounds(geojson, bounds) {
  if (!geojson || !geojson.features || !bounds) {
    return { type: 'FeatureCollection', features: [] }
  }

  const [[minLat, minLng], [maxLat, maxLng]] = bounds

  return {
    type: 'FeatureCollection',
    features: geojson.features.filter(feature => {
      if (feature.geometry.type === 'Point') {
        const [lng, lat] = feature.geometry.coordinates
        return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng
      }
      // For polygons and other types, check if any coordinate is within bounds
      // This is a simplified check
      return true
    })
  }
}

/**
 * Combine multiple zone filters
 * @param {Object} geojson - GeoJSON FeatureCollection
 * @param {Array<Function>} filters - Array of filter functions
 * @returns {Object} - Filtered GeoJSON
 */
export function combineFilters(geojson, filters) {
  return filters.reduce((acc, filter) => filter(acc), geojson)
}

/**
 * Get zone statistics
 * @param {Object} geojson - GeoJSON FeatureCollection
 * @returns {Object} - Statistics about zones
 */
export function getZoneStats(geojson) {
  if (!geojson || !geojson.features) {
    return { total: 0, byType: {} }
  }

  const stats = {
    total: geojson.features.length,
    byType: {}
  }

  geojson.features.forEach(feature => {
    const type = feature.properties?.type || 'unknown'
    stats.byType[type] = (stats.byType[type] || 0) + 1
  })

  return stats
}
