import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import L from 'leaflet'
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

function Map({ layers, setSelectedZone }) {
  const mapRef = useRef()
  const [userLocation, setUserLocation] = React.useState(null)

  const mapCenter = [
    parseFloat(import.meta.env.VITE_MAP_CENTER_LAT) || 43.6629,
    parseFloat(import.meta.env.VITE_MAP_CENTER_LNG) || -79.3957
  ]
  const mapZoom = parseInt(import.meta.env.VITE_MAP_DEFAULT_ZOOM) || 10

  // Sample GeoJSON data for demonstration (empty for now)
  const crownLandData = {
    type: 'FeatureCollection',
    features: []
  }

  const exclusionZoneData = {
    type: 'FeatureCollection',
    features: []
  }

  const handleFeatureClick = (feature, layer) => {
    if (setSelectedZone) {
      setSelectedZone(feature.properties)
    }
    layer.bindPopup(`
      <div>
        <strong>${feature.properties.name || 'Zone'}</strong>
        <p>${feature.properties.type || 'Unknown type'}</p>
      </div>
    `)
  }

  const crownLandStyle = {
    fillColor: '#2d7d2d',
    fillOpacity: 0.3,
    color: '#2d7d2d',
    weight: 2,
  }

  const exclusionZoneStyle = {
    fillColor: '#c4453d',
    fillOpacity: 0.4,
    color: '#c4453d',
    weight: 2,
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

        {layers.crownLand && crownLandData.features.length > 0 && (
          <GeoJSON
            data={crownLandData}
            style={crownLandStyle}
            onEachFeature={(feature, layer) => {
              layer.on({
                click: () => handleFeatureClick(feature, layer)
              })
            }}
          />
        )}

        {layers.exclusionZones && exclusionZoneData.features.length > 0 && (
          <GeoJSON
            data={exclusionZoneData}
            style={exclusionZoneStyle}
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
