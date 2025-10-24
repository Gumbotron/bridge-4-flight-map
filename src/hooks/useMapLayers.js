import { useState, useCallback } from 'react'

/**
 * Custom hook for managing map layer visibility state
 * Handles toggle state for various map layers
 */
function useMapLayers(initialLayers = {}) {
  const defaultLayers = {
    crownLand: true,
    exclusionZones: true,
    airports: true,
    controlledAirspace: true,
    userPOIs: false,
    ...initialLayers,
  }

  const [layers, setLayers] = useState(defaultLayers)

  const toggleLayer = useCallback((layerName) => {
    setLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName],
    }))
  }, [])

  const setLayerVisibility = useCallback((layerName, isVisible) => {
    setLayers(prev => ({
      ...prev,
      [layerName]: isVisible,
    }))
  }, [])

  const showAllLayers = useCallback(() => {
    setLayers(prev => {
      const allVisible = {}
      Object.keys(prev).forEach(key => {
        allVisible[key] = true
      })
      return allVisible
    })
  }, [])

  const hideAllLayers = useCallback(() => {
    setLayers(prev => {
      const allHidden = {}
      Object.keys(prev).forEach(key => {
        allHidden[key] = false
      })
      return allHidden
    })
  }, [])

  const resetLayers = useCallback(() => {
    setLayers(defaultLayers)
  }, [])

  return {
    layers,
    setLayers,
    toggleLayer,
    setLayerVisibility,
    showAllLayers,
    hideAllLayers,
    resetLayers,
  }
}

export default useMapLayers
