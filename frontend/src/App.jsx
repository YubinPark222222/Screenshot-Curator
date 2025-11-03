// frontend/src/App.jsx
import React from 'react'
import UploadForm from './components/UploadForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">📸 Screenshot Curator AI</h1>
      <UploadForm />
    </div>
  )
}

export default App
