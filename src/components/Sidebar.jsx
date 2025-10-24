import React, { useState } from 'react'
import Legend from './Legend'
import Geolocation from './Geolocation'
import POIUpload from './POIUpload'
import InfoPanel from './InfoPanel'

function Sidebar({ layers, setLayers, selectedZone }) {
  const [activeTab, setActiveTab] = useState('layers')
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLayerToggle = (layerName) => {
    setLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }))
  }

  if (isCollapsed) {
    return (
      <div className="bg-storm-blue border-r-2 border-storm-radiant">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-4 text-storm-radiant hover:text-white transition-colors"
          aria-label="Expand sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="w-80 bg-storm-blue text-white border-r-2 border-storm-radiant flex flex-col overflow-hidden md:w-80 sm:w-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-storm-radiant flex justify-between items-center">
        <h2 className="text-xl font-storm font-bold">Controls</h2>
        <button
          onClick={() => setIsCollapsed(true)}
          className="text-storm-radiant hover:text-white transition-colors md:hidden"
          aria-label="Collapse sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-storm-radiant">
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex-1 px-4 py-3 font-semibold transition-colors ${
            activeTab === 'layers'
              ? 'bg-storm-deep text-storm-radiant border-b-2 border-storm-radiant'
              : 'text-storm-light hover:bg-storm-deep'
          }`}
        >
          Layers
        </button>
        <button
          onClick={() => setActiveTab('pois')}
          className={`flex-1 px-4 py-3 font-semibold transition-colors ${
            activeTab === 'pois'
              ? 'bg-storm-deep text-storm-radiant border-b-2 border-storm-radiant'
              : 'text-storm-light hover:bg-storm-deep'
          }`}
        >
          POIs
        </button>
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 px-4 py-3 font-semibold transition-colors ${
            activeTab === 'info'
              ? 'bg-storm-deep text-storm-radiant border-b-2 border-storm-radiant'
              : 'text-storm-light hover:bg-storm-deep'
          }`}
        >
          Info
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'layers' && (
          <div className="space-y-4">
            <Geolocation />
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-storm-radiant">Layer Toggles</h3>
              
              <label className="flex items-center space-x-3 cursor-pointer hover:bg-storm-deep p-2 rounded transition-colors">
                <input
                  type="checkbox"
                  checked={layers.crownLand}
                  onChange={() => handleLayerToggle('crownLand')}
                  className="w-5 h-5 text-legal-zone rounded focus:ring-storm-radiant"
                />
                <span>Crown Land (Legal Zones)</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer hover:bg-storm-deep p-2 rounded transition-colors">
                <input
                  type="checkbox"
                  checked={layers.exclusionZones}
                  onChange={() => handleLayerToggle('exclusionZones')}
                  className="w-5 h-5 text-exclusion-zone rounded focus:ring-storm-radiant"
                />
                <span>Exclusion Zones</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer hover:bg-storm-deep p-2 rounded transition-colors">
                <input
                  type="checkbox"
                  checked={layers.airports}
                  onChange={() => handleLayerToggle('airports')}
                  className="w-5 h-5 text-warning-amber rounded focus:ring-storm-radiant"
                />
                <span>Airports (3nm Buffer)</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer hover:bg-storm-deep p-2 rounded transition-colors">
                <input
                  type="checkbox"
                  checked={layers.controlledAirspace}
                  onChange={() => handleLayerToggle('controlledAirspace')}
                  className="w-5 h-5 text-warning-amber rounded focus:ring-storm-radiant"
                />
                <span>Controlled Airspace</span>
              </label>
            </div>

            <Legend />
          </div>
        )}

        {activeTab === 'pois' && (
          <POIUpload />
        )}

        {activeTab === 'info' && (
          <InfoPanel selectedZone={selectedZone} />
        )}
      </div>
    </div>
  )
}

export default Sidebar
