'use client'
import { useState } from 'react'
import Markdown from 'react-markdown'

export default function Summarizer() {
  const [url, setUrl] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
	const text = "## Hi"

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      
      const data = await response.json()
      setSummary(data.choices[0].message.content)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-2 mb-8">
          <input
            className="flex-1 p-2 border rounded"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Summarizing...' : 'Summarize'}
          </button>
        </div>

        {summary && (
          <div className="prose prose-lg max-w-none">
            <Markdown>{summary}</Markdown>

          </div>
        )}
      </div>
    </div>
  )
}
