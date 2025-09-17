import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

// PUT - Update activity (time on page, exit time)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, page, timeOnPage, exitTime } = body

    if (!sessionId || !page) {
      return NextResponse.json(
        { error: 'sessionId and page are required' },
        { status: 400 }
      )
    }

    // Update the most recent activity log for this session/page
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
      await prisma.cSiteActivityLog.update({
        where: { id: activity.id },
        data: {
          timeOnPage,
          exitTime: exitTime ? new Date(exitTime) : new Date()
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating activity:', error)
    return NextResponse.json(
      { error: 'Failed to update activity' },
      { status: 500 }
    )
  }
}