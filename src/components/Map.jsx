import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, CircleMarker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { loadGeoJSON } from '../utils/dataLoader'
import '../styles/map.css'

// Component to handle map events and updates
function MapController({ layers, setSelectedZone, userLocation }) {
  const map = useMap()

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13)
    }
  }, [userLocation, map])

  return null
}

// User location marker component
function UserMarker({ position }) {
  const map = useMap()

  useEffect(() => {
    if (position) {
      const marker = L.circleMarker([position.lat, position.lng], {
        radius: 10,
        fillColor: '#00d4ff',
        color: '#ffffff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.8,
        className: 'user-location-marker'
      }).addTo(map)

      marker.bindPopup('You are here')

      return () => {
        map.removeLayer(marker)
      }
    }
  }, [position, map])

  return null
}

function Map({ layers, setSelectedZone, userLocation }) {
  const mapRef = useRef()
  const [geoData, setGeoData] = useState({
    safeZones: null,
    exclusionZones: null,
    airports: null,
    customPOIs: null
  })
  const [loading, setLoading] = useState(true)

  const mapCenter = [
    parseFloat(import.meta.env.VITE_MAP_CENTER_LAT) || 43.6629,
    parseFloat(import.meta.env.VITE_MAP_CENTER_LNG) || -79.3957
  ]
  const mapZoom = parseInt(import.meta.env.VITE_MAP_DEFAULT_ZOOM) || 10

  // Load GeoJSON data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const base = import.meta.env.BASE_URL || '/'
        const [safeZones, exclusionZones, airports, customPOIs] = await Promise.all([
          loadGeoJSON(`${base}data/safe-zones-ontario.geojson`).catch(() => ({ type: 'FeatureCollection', features: [] })),
          loadGeoJSON(`${base}data/exclusion-zones-ontario.geojson`).catch(() => ({ type: 'FeatureCollection', features: [] })),
          loadGeoJSON(`${base}data/airports-ontario.geojson`).catch(() => ({ type: 'FeatureCollection', features: [] })),
          loadGeoJSON(`${base}data/custom-pois.geojson`).catch(() => ({ type: 'FeatureCollection', features: [] }))
        ])
        
        setGeoData({
          safeZones,
          exclusionZones,
          airports,
          customPOIs
        })
      } catch (error) {
        console.error('Error loading GeoJSON data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleFeatureClick = (feature, layer) => {
    if (setSelectedZone) {
      setSelectedZone(feature.properties)
    }
    const props = feature.properties
    layer.bindPopup(`
      <div class="p-2">
        <strong class="text-lg">${props.name || 'Zone'}</strong>
        <p class="text-sm mt-1">${props.description || props.type || 'Unknown type'}</p>
        ${props.restrictions ? `<p class="text-xs mt-1 text-red-600"><strong>Restrictions:</strong> ${props.restrictions}</p>` : ''}
      </div>
    `)
  }

  // Style for safe zones (green)
  const safeZoneStyle = {
    fillColor: '#2d7d2d',
    fillOpacity: 0.3,
    color: '#2d7d2d',
    weight: 2,
  }

  // Style for exclusion zones (red)
  const exclusionZoneStyle = (feature) => ({
    fillColor: feature.properties.status === 'warning' ? '#f59e0b' : '#c4453d',
    fillOpacity: 0.4,
    color: feature.properties.status === 'warning' ? '#f59e0b' : '#c4453d',
    weight: 2,
  })

  // Style for custom POIs (yellow/warning)
  const customPOIStyle = (feature) => ({
    fillColor: '#f59e0b',
    fillOpacity: 0.35,
    color: '#f59e0b',
    weight: 2,
  })

  // Point to layer function for airports and POIs
  const pointToLayer = (feature, latlng) => {
    const isAirport = feature.properties.type === 'airport'
    const isPOI = feature.properties.type === 'custom_poi'
    
    if (isAirport) {
      // Create circle for airport buffer zone
      const bufferNm = feature.properties.buffer_nm || 3
      const bufferMeters = bufferNm * 1852 // Convert nautical miles to meters
      
      return L.circle(latlng, {
        radius: bufferMeters,
        fillColor: '#c4453d',
        fillOpacity: 0.2,
        color: '#c4453d',
        weight: 2,
      })
    } else if (isPOI) {
      // Yellow marker for custom POI
      return L.circleMarker(latlng, {
        radius: 8,
        fillColor: '#f59e0b',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      })
    }
    
    return L.circleMarker(latlng, {
      radius: 6,
      fillColor: '#00d4ff',
      color: '#ffffff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
    })
  }

  return (
    <div className="flex-1 relative">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full"
        ref={mapRef}
      >
        <MapController 
          layers={layers} 
          setSelectedZone={setSelectedZone}
          userLocation={userLocation}
        />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Safe Zones (Crown Land) */}
        {!loading && layers.crownLand && geoData.safeZones && geoData.safeZones.features.length > 0 && (
          <GeoJSON
            key="safe-zones"
            data={geoData.safeZones}
            style={safeZoneStyle}
            onEachFeature={(feature, layer) => {
              layer.on({
                click: () => handleFeatureClick(feature, layer)
              })
            }}
          />
        )}

        {/* Exclusion Zones */}
        {!loading && layers.exclusionZones && geoData.exclusionZones && geoData.exclusionZones.features.length > 0 && (
          <GeoJSON
            key="exclusion-zones"
            data={geoData.exclusionZones}
            style={exclusionZoneStyle}
            onEachFeature={(feature, layer) => {
              layer.on({
                click: () => handleFeatureClick(feature, layer)
              })
            }}
          />
        )}

        {/* Airports */}
        {!loading && layers.airports && geoData.airports && geoData.airports.features.length > 0 && (
          <GeoJSON
            key="airports"
            data={geoData.airports}
            pointToLayer={pointToLayer}
            onEachFeature={(feature, layer) => {
              layer.on({
                click: () => handleFeatureClick(feature, layer)
              })
            }}
          />
        )}

        {/* Custom POIs */}
        {!loading && geoData.customPOIs && geoData.customPOIs.features.length > 0 && (
          <GeoJSON
            key="custom-pois"
            data={geoData.customPOIs}
            style={customPOIStyle}
            pointToLayer={pointToLayer}
            onEachFeature={(feature, layer) => {
              layer.on({
                click: () => handleFeatureClick(feature, layer)
              })
            }}
          />
        )}

        {userLocation && <UserMarker position={userLocation} />}
      </MapContainer>
    </div>
  )
}

export default Map
