// frontend/src/components/UploadForm.jsx
import React, { useState } from 'react'
import axios from 'axios'

function UploadForm() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await axios.post('http://localhost:8000/upload', formData)
      setResult(res.data)
    } catch (err) {
      console.error('Upload failed:', err)
    }
  }

  const renderSmartActions = () => {
    if (!result?.category || !result?.title) return null

    const q = encodeURIComponent(result.title)
    switch (result.category) {
      case '음악':
        return <a href={`https://music.youtube.com/search?q=${q}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">🎵 유튜브 뮤직에서 듣기</a>
      case '전시':
        return <a href={`https://calendar.naver.com`} target="_blank" rel="noreferrer" className="text-green-600 underline">🖼️ 네이버 캘린더에 추가</a>
      case '쇼핑':
        return <a href={`https://www.google.com/search?q=${q}`} target="_blank" rel="noreferrer" className="text-orange-600 underline">🛍️ 공식 상품 보기</a>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">업로드</button>

      {result && (
        <div className="mt-4 p-4 border rounded bg-white">
          <h2 className="text-xl font-bold mb-2">분석 결과</h2>
          <p><strong>카테고리:</strong> {result.category}</p>
          <p><strong>태그:</strong> {result.tags?.join(', ')}</p>
          <p><strong>의도:</strong> {result.intent}</p>
          <p><strong>텍스트:</strong> {result.raw_text}</p>
          <div className="mt-3">{renderSmartActions()}</div>
        </div>
      )}
    </div>
  )
}

export default UploadForm
