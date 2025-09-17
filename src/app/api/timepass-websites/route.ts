import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

// GET - Get all active timepass websites
export async function GET() {
  try {
    const websites = await prisma.cSiteTimepassWebsites.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdDate: 'desc'
      }
    })

    return NextResponse.json(websites)
  } catch (error) {
    console.error('Error fetching timepass websites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch timepass websites' },
      { status: 500 }
    )
  }
}

// POST - Add a new timepass website
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, url, description } = body

    if (!name || !url) {
      return NextResponse.json(
        { error: 'Name and URL are required' },
        { status: 400 }
      )
    }

    const newWebsite = await prisma.cSiteTimepassWebsites.create({
      data: {
        name,
        url,
        description: description || null,
        isActive: true
      }
    })

    return NextResponse.json(newWebsite, { status: 201 })
  } catch (error) {
    console.error('Error creating timepass website:', error)
    return NextResponse.json(
      { error: 'Failed to create timepass website' },
      { status: 500 }
    )
  }
}

// PUT - Update a website (e.g., to deactivate)
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

    const updatedWebsite = await prisma.cSiteTimepassWebsites.update({
      where: { createdDate: new Date(createdDate) },
      data: { isActive }
    })

    return NextResponse.json(updatedWebsite)
  } catch (error) {
    console.error('Error updating timepass website:', error)
    return NextResponse.json(
      { error: 'Failed to update timepass website' },
      { status: 500 }
    )
  }
}