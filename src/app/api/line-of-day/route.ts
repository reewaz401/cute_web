import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

// GET - Get the latest line of the day
export async function GET() {
  try {
    // Get the most recent active line
    const latestLine = await prisma.cSiteLineOfDay.findFirst({
      where: {
        isActive: true
      },
      orderBy: {
        createdDate: 'desc'
      }
    })

    if (!latestLine) {
      // Return default if no lines exist
      return NextResponse.json({
        line: "If you were a vegetable, you'd be a cute-cumber",
        createdDate: new Date()
      })
    }

    return NextResponse.json(latestLine)
  } catch (error) {
    console.error('Error fetching line of the day:', error)
    return NextResponse.json(
      { error: 'Failed to fetch line of the day' },
      { status: 500 }
    )
  }
}

// POST - Add a new line of the day
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { line } = body

    if (!line) {
      return NextResponse.json(
        { error: 'Line is required' },
        { status: 400 }
      )
    }

    const newLine = await prisma.cSiteLineOfDay.create({
      data: {
        line,
        isActive: true,
        createdDate: new Date()
      }
    })

    return NextResponse.json(newLine, { status: 201 })
  } catch (error) {
    console.error('Error creating line of the day:', error)
    return NextResponse.json(
      { error: 'Failed to create line of the day' },
      { status: 500 }
    )
  }
}

// PUT - Update a line (e.g., to deactivate old ones)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { createdDate, isActive } = body

    if (!createdDate) {
      return NextResponse.json(
        { error: 'createdDate is required' },
        { status: 400 }
      )
    }

    const updatedLine = await prisma.cSiteLineOfDay.update({
      where: { createdDate: new Date(createdDate) },
      data: { isActive }
    })

    return NextResponse.json(updatedLine)
  } catch (error) {
    console.error('Error updating line of the day:', error)
    return NextResponse.json(
      { error: 'Failed to update line of the day' },
      { status: 500 }
    )
  }
}