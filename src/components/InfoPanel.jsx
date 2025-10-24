import React from 'react'

function InfoPanel({ selectedZone }) {
  if (!selectedZone) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-storm-radiant">Zone Information</h3>
        
        <div className="p-4 bg-storm-deep rounded-lg text-center">
          <svg 
            className="mx-auto w-16 h-16 text-storm-light mb-3" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <p className="text-storm-light">
            Click on a zone in the map to view details
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="p-3 bg-storm-deep rounded">
            <h4 className="font-semibold text-storm-radiant mb-2">Quick Tips</h4>
            <ul className="space-y-1 text-storm-light text-xs">
              <li>• Use the "Find Me" button to locate yourself</li>
              <li>• Toggle layers to show/hide different zones</li>
              <li>• Click zones for detailed information</li>
              <li>• Upload POIs in the POIs tab</li>
            </ul>
          </div>

          <div className="p-3 bg-storm-deep rounded">
            <h4 className="font-semibold text-storm-radiant mb-2">Flight Regulations</h4>
            <ul className="space-y-1 text-storm-light text-xs">
              <li>• Basic operations: up to 400ft AGL</li>
              <li>• Visual line of sight required</li>
              <li>• 3nm from airports without permission</li>
              <li>• Respect privacy and property rights</li>
            </ul>
          </div>

          <div className="p-3 bg-warning-amber bg-opacity-20 border border-warning-amber rounded">
            <p className="text-xs text-warning-amber">
              ⚠️ This is a planning tool only. Always verify current regulations with Transport Canada and obtain necessary permissions before flying.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-storm-radiant">Zone Details</h3>
      
      <div className="space-y-3">
        <div className="p-3 bg-storm-deep rounded">
          <h4 className="font-semibold text-white mb-2">
            {selectedZone.name || 'Unnamed Zone'}
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-storm-light">Type:</span>
              <span className="text-white font-medium">{selectedZone.type || 'N/A'}</span>
            </div>
            {selectedZone.status && (
              <div className="flex justify-between">
                <span className="text-storm-light">Status:</span>
                <span className={`font-medium ${
                  selectedZone.status === 'legal' ? 'text-legal-zone' : 'text-exclusion-zone'
                }`}>
                  {selectedZone.status}
                </span>
              </div>
            )}
            {selectedZone.description && (
              <div className="mt-2 pt-2 border-t border-storm-blue">
                <p className="text-storm-light text-xs">{selectedZone.description}</p>
              </div>
            )}
          </div>
        </div>

        {selectedZone.restrictions && (
          <div className="p-3 bg-exclusion-zone bg-opacity-20 border border-exclusion-zone rounded">
            <h4 className="font-semibold text-exclusion-zone mb-2 text-sm">Restrictions</h4>
            <p className="text-xs text-white">{selectedZone.restrictions}</p>
          </div>
        )}

        {selectedZone.contact && (
          <div className="p-3 bg-storm-deep rounded">
            <h4 className="font-semibold text-storm-radiant mb-2 text-sm">Contact</h4>
            <p className="text-xs text-storm-light">{selectedZone.contact}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfoPanel
