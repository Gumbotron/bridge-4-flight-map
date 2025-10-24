import React, { useState } from 'react'

function POIUpload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const validTypes = ['.csv', '.geojson', '.json']
      const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
      
      if (validTypes.includes(fileExtension)) {
        setSelectedFile(file)
        setUploadStatus('')
      } else {
        setSelectedFile(null)
        setUploadStatus('Invalid file type. Please upload CSV or GeoJSON files.')
      }
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      // Placeholder for actual upload logic
      setUploadStatus(`Ready to process: ${selectedFile.name}`)
      // In the future, this will parse and display POIs on the map
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setUploadStatus('')
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-storm-radiant">Upload POIs</h3>
      
      <div className="text-sm text-storm-light space-y-2">
        <p>Upload your Points of Interest (POIs) to display on the map.</p>
        <p className="text-xs">Supported formats: CSV, GeoJSON</p>
      </div>

      <div className="space-y-3">
        <label className="block">
          <div className="border-2 border-dashed border-storm-radiant rounded-lg p-6 text-center hover:bg-storm-deep transition-colors cursor-pointer">
            <input
              type="file"
              accept=".csv,.geojson,.json"
              onChange={handleFileChange}
              className="hidden"
            />
            <svg 
              className="mx-auto w-12 h-12 text-storm-radiant mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
            <p className="text-storm-radiant font-medium">
              {selectedFile ? selectedFile.name : 'Click to select file'}
            </p>
            <p className="text-xs text-storm-light mt-1">
              or drag and drop
            </p>
          </div>
        </label>

        {selectedFile && (
          <div className="flex space-x-2">
            <button
              onClick={handleUpload}
              className="flex-1 bg-legal-zone hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Process File
            </button>
            <button
              onClick={handleClear}
              className="bg-exclusion-zone hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Clear
            </button>
          </div>
        )}

        {uploadStatus && (
          <div className={`p-3 rounded text-sm ${
            uploadStatus.includes('Invalid') || uploadStatus.includes('Error')
              ? 'bg-exclusion-zone bg-opacity-20 border border-exclusion-zone text-exclusion-zone'
              : 'bg-legal-zone bg-opacity-20 border border-legal-zone text-legal-zone'
          }`}>
            {uploadStatus}
          </div>
        )}
      </div>

      <div className="mt-6 p-3 bg-storm-deep rounded text-xs text-storm-light">
        <h4 className="font-semibold text-storm-radiant mb-2">CSV Format Example:</h4>
        <pre className="text-xs overflow-x-auto">
{`name,lat,lng,description
My Spot,43.6532,-79.3832,Favorite location
Park,43.7532,-79.4832,Nice park`}
        </pre>
      </div>
    </div>
  )
}

export default POIUpload
