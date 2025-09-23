import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Fetch the most recent active line of the day
    const lineOfTheDay = await prisma.cSiteLineOfDay.findFirst({
      where: {
        isActive: true
      },
      orderBy: {
        createdDate: 'desc'
      }
    })

    if (lineOfTheDay) {
      return NextResponse.json({ message: lineOfTheDay.line })
    } else {
      // Default message if no active lines in database
      return NextResponse.json({ message: "I hope you are doing good today :D" })
    }
  } catch (error) {
    console.error('Error fetching line of the day:', error)
    // Default message on error
    return NextResponse.json({ message: "I hope you are doing good today :D" })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  try {
    const { line } = await request.json()

    const newLineOfTheDay = await prisma.cSiteLineOfDay.create({
      data: {
        line,
        isActive: true
      }
    })

    return NextResponse.json(newLineOfTheDay)
  } catch (error) {
    console.error('Error creating line of the day:', error)
    return NextResponse.json({ error: 'Failed to create line of the day' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}