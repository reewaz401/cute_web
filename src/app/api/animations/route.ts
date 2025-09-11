import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const animations = [
      {
        id: 1,
        name: 'Loading Spinner',
        type: 'lottie',
        url: '/animations/loading.json',
      },
      {
        id: 2,
        name: 'Success Check',
        type: 'lottie',
        url: '/animations/success.json',
      },
      {
        id: 3,
        name: '3D Cube',
        type: 'three',
        config: {
          geometry: 'box',
          material: 'standard',
        },
      },
    ]

    return NextResponse.json({ animations })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch animations' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    return NextResponse.json(
      { 
        message: 'Animation created successfully',
        data: body 
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create animation' },
      { status: 500 }
    )
  }
}