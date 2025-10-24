import React, { useState } from 'react'
import useGeolocation from '../hooks/useGeolocation'

function Geolocation() {
  const { location, loading, error, getCurrentLocation } = useGeolocation()
  const [showLocation, setShowLocation] = useState(false)

  const handleFindMe = () => {
    getCurrentLocation()
    setShowLocation(true)
  }

  return (
    <div className="mb-4">
      <button
        onClick={handleFindMe}
        disabled={loading}
        className="w-full bg-storm-radiant hover:bg-storm-light text-storm-deep font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <svg 
          className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {loading ? (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          ) : (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          )}
        </svg>
        <span>{loading ? 'Locating...' : '📍 Find Me'}</span>
      </button>

      {error && (
        <div className="mt-2 p-2 bg-exclusion-zone bg-opacity-20 border border-exclusion-zone rounded text-sm">
          <p className="text-exclusion-zone">⚠️ {error}</p>
        </div>
      )}

      {showLocation && location && !error && (
        <div className="mt-2 p-3 bg-storm-deep rounded text-sm">
          <p className="text-storm-light">
            <strong className="text-storm-radiant">Location found:</strong>
          </p>
          <p className="text-xs mt-1">
            Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
          </p>
          <p className="text-xs text-storm-light mt-1">
            Accuracy: ±{Math.round(location.accuracy)}m
          </p>
        </div>
      )}
    </div>
  )
}

export default Geolocation
