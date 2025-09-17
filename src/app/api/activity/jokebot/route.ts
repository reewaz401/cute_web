import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

// POST - Track joke bot interaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, page } = body

    // Find the most recent activity log for this session
    const activity = await prisma.cSiteActivityLog.findFirst({
      where: {
        sessionId,
        page
      },
      orderBy: {
        loginTime: 'desc'
      }
    })

    if (activity) {
      // Update to mark joke bot as opened
      await prisma.cSiteActivityLog.update({
        where: { id: activity.id },
        data: {
          openedJokeBot: true,
          jokeBotOpenTime: new Date()
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking joke bot:', error)
    return NextResponse.json(
      { error: 'Failed to track joke bot' },
      { status: 500 }
    )
  }
}