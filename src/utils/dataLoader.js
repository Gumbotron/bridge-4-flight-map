/**
 * Data loader utilities for loading external GeoJSON files
 */

/**
 * Load GeoJSON data from a URL or file
 * @param {string} url - URL or path to GeoJSON file
 * @returns {Promise<Object>} - Parsed GeoJSON data
 */
export async function loadGeoJSON(url) {
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to load GeoJSON: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Validate basic GeoJSON structure
    if (!data.type || (data.type !== 'FeatureCollection' && data.type !== 'Feature')) {
      throw new Error('Invalid GeoJSON format')
    }
    
    return data
  } catch (error) {
    console.error('Error loading GeoJSON:', error)
    throw error
  }
}

/**
 * Load multiple GeoJSON files in parallel
 * @param {Array<string>} urls - Array of URLs to load
 * @returns {Promise<Array<Object>>} - Array of parsed GeoJSON data
 */
export async function loadMultipleGeoJSON(urls) {
  try {
    const promises = urls.map(url => loadGeoJSON(url))
    return await Promise.all(promises)
  } catch (error) {
    console.error('Error loading multiple GeoJSON files:', error)
    throw error
  }
}

/**
 * Parse CSV data and convert to GeoJSON
 * @param {string} csvText - CSV text content
 * @returns {Object} - GeoJSON FeatureCollection
 */
export function parseCSVtoGeoJSON(csvText) {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) {
    throw new Error('CSV file must have at least a header and one data row')
  }
  
  const headers = lines[0].split(',').map(h => h.trim())
  const latIndex = headers.findIndex(h => h.toLowerCase() === 'lat' || h.toLowerCase() === 'latitude')
  const lngIndex = headers.findIndex(h => h.toLowerCase() === 'lng' || h.toLowerCase() === 'longitude' || h.toLowerCase() === 'lon')
  
  if (latIndex === -1 || lngIndex === -1) {
    throw new Error('CSV must have "lat" and "lng" columns')
  }
  
  const features = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim())
    
    if (values.length !== headers.length) continue
    
    const lat = parseFloat(values[latIndex])
    const lng = parseFloat(values[lngIndex])
    
    if (isNaN(lat) || isNaN(lng)) continue
    
    const properties = {}
    headers.forEach((header, index) => {
      if (index !== latIndex && index !== lngIndex) {
        properties[header] = values[index]
      }
    })
    
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      properties
    })
  }
  
  return {
    type: 'FeatureCollection',
    features
  }
}

/**
 * Load and cache GeoJSON data with localStorage
 * @param {string} key - Cache key
 * @param {string} url - URL to load if not cached
 * @param {number} maxAge - Max cache age in milliseconds (default: 24 hours)
 * @returns {Promise<Object>} - GeoJSON data
 */
export async function loadCachedGeoJSON(key, url, maxAge = 24 * 60 * 60 * 1000) {
  try {
    const cached = localStorage.getItem(key)
    
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      const age = Date.now() - timestamp
      
      if (age < maxAge) {
        return data
      }
    }
    
    const data = await loadGeoJSON(url)
    
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
    
    return data
  } catch (error) {
    console.error('Error loading cached GeoJSON:', error)
    throw error
  }
}
