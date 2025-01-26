import { NextResponse } from 'next/server'

const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?[a-zA-Z0-9_-]{11}/

export async function POST(request) {
  try {
    const { url } = await request.json()
    
    if (!url || !YOUTUBE_REGEX.test(url)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      )
    }

    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: 'summarize youtube videos'
          },
          {
            role: 'user',
            content: `Summarize this YouTube video in depth: ${url}`
          }
        ]
      })
    })

    if (!perplexityResponse.ok) {
      const error = await perplexityResponse.json()
      throw new Error(error.error?.message || 'API request failed')
    }

    const data = await perplexityResponse.json()
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    })
    
  } catch (error) {
    console.error('Summarization error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
