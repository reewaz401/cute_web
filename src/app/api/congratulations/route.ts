import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Fetch the active home line with highest priority for congratulations text
    const homeLine = await prisma.cHomeLine.findFirst({
      where: {
        isActive: true
      },
      orderBy: {
        priority: 'desc'
      }
    })

    if (homeLine) {
      return NextResponse.json({ text: homeLine.message })
    } else {
      // Default message if no active messages in database
      return NextResponse.json({ text: "MERRY CHRISTMAS & HAPPY NEW YEAR!" })
    }
  } catch (error) {
    console.error('Error fetching congratulations text:', error)
    // Default message on error
    return NextResponse.json({ text: "MERRY CHRISTMAS & HAPPY NEW YEAR!" })
  } finally {
    await prisma.$disconnect()
  }
}