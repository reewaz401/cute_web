import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Fetch the active home line with highest priority
    const homeLine = await prisma.cHomeLine.findFirst({
      where: {
        isActive: true
      },
      orderBy: {
        priority: 'desc'
      }
    })

    if (homeLine) {
      return NextResponse.json({ message: homeLine.message })
    } else {
      // Default message if no active messages in database
      return NextResponse.json({ message: "I hope you are doing good today :D" })
    }
  } catch (error) {
    console.error('Error fetching home line:', error)
    // Default message on error
    return NextResponse.json({ message: "I hope you are doing good today :D" })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  try {
    const { message, priority = 0 } = await request.json()

    const newHomeLine = await prisma.cHomeLine.create({
      data: {
        message,
        priority,
        isActive: true
      }
    })

    return NextResponse.json(newHomeLine)
  } catch (error) {
    console.error('Error creating home line:', error)
    return NextResponse.json({ error: 'Failed to create home line' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}