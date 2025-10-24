/**
 * Geographic helper utilities
 * Distance calculations, buffer creation, and geometry operations
 */

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @returns {number} - Distance in meters
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000 // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lng2 - lng1) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

/**
 * Convert nautical miles to meters
 * @param {number} nm - Nautical miles
 * @returns {number} - Meters
 */
export function nauticalMilesToMeters(nm) {
  return nm * 1852
}

/**
 * Convert meters to nautical miles
 * @param {number} meters - Meters
 * @returns {number} - Nautical miles
 */
export function metersToNauticalMiles(meters) {
  return meters / 1852
}

/**
 * Create a circular buffer around a point
 * @param {number} lat - Latitude of center point
 * @param {number} lng - Longitude of center point
 * @param {number} radiusMeters - Radius in meters
 * @param {number} points - Number of points to create (default: 32)
 * @returns {Array<Array<number>>} - Array of [lng, lat] coordinates
 */
export function createCircularBuffer(lat, lng, radiusMeters, points = 32) {
  const coords = []
  const radiusLat = radiusMeters / 111320 // degrees latitude per meter

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * 2 * Math.PI
    const dx = Math.cos(angle) * radiusLat
    const dy = Math.sin(angle) * radiusLat / Math.cos((lat * Math.PI) / 180)

    coords.push([
      lng + dy,
      lat + dx
    ])
  }

  // Close the polygon
  coords.push(coords[0])

  return coords
}

/**
 * Check if a point is within a polygon
 * @param {Array<number>} point - [lng, lat]
 * @param {Array<Array<number>>} polygon - Array of [lng, lat] coordinates
 * @returns {boolean} - True if point is inside polygon
 */
export function pointInPolygon(point, polygon) {
  const [x, y] = point
  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]

    const intersect =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi

    if (intersect) inside = !inside
  }

  return inside
}

/**
 * Calculate bounding box for a set of coordinates
 * @param {Array<Array<number>>} coordinates - Array of [lng, lat]
 * @returns {Object} - Bounding box {minLat, maxLat, minLng, maxLng}
 */
export function calculateBounds(coordinates) {
  if (!coordinates || coordinates.length === 0) {
    return null
  }

  let minLat = Infinity
  let maxLat = -Infinity
  let minLng = Infinity
  let maxLng = -Infinity

  coordinates.forEach(([lng, lat]) => {
    minLat = Math.min(minLat, lat)
    maxLat = Math.max(maxLat, lat)
    minLng = Math.min(minLng, lng)
    maxLng = Math.max(maxLng, lng)
  })

  return { minLat, maxLat, minLng, maxLng }
}

/**
 * Calculate the center point of a bounding box
 * @param {Object} bounds - {minLat, maxLat, minLng, maxLng}
 * @returns {Array<number>} - [lat, lng]
 */
export function calculateCenter(bounds) {
  if (!bounds) return null

  return [
    (bounds.minLat + bounds.maxLat) / 2,
    (bounds.minLng + bounds.maxLng) / 2
  ]
}

/**
 * Format coordinates for display
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} precision - Decimal places (default: 6)
 * @returns {string} - Formatted coordinates
 */
export function formatCoordinates(lat, lng, precision = 6) {
  return `${lat.toFixed(precision)}, ${lng.toFixed(precision)}`
}

/**
 * Calculate bearing between two points
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @returns {number} - Bearing in degrees (0-360)
 */
export function calculateBearing(lat1, lng1, lat2, lng2) {
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δλ = ((lng2 - lng1) * Math.PI) / 180

  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)

  const θ = Math.atan2(y, x)
  const bearing = ((θ * 180) / Math.PI + 360) % 360

  return bearing
}

/**
 * Validate latitude value
 * @param {number} lat - Latitude
 * @returns {boolean} - True if valid
 */
export function isValidLatitude(lat) {
  return typeof lat === 'number' && lat >= -90 && lat <= 90
}

/**
 * Validate longitude value
 * @param {number} lng - Longitude
 * @returns {boolean} - True if valid
 */
export function isValidLongitude(lng) {
  return typeof lng === 'number' && lng >= -180 && lng <= 180
}
