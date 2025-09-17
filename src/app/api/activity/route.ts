import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import axios from 'axios'

// Helper function to parse user agent
function parseUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase()

  // Detect device type
  let device = 'desktop'
  if (/mobile|android|phone/i.test(ua)) device = 'mobile'
  else if (/tablet|ipad/i.test(ua)) device = 'tablet'

  // Detect browser
  let browser = 'Unknown'
  if (ua.includes('chrome')) browser = 'Chrome'
  else if (ua.includes('firefox')) browser = 'Firefox'
  else if (ua.includes('safari')) browser = 'Safari'
  else if (ua.includes('edge')) browser = 'Edge'

  // Detect OS
  let os = 'Unknown'
  if (ua.includes('windows')) os = 'Windows'
  else if (ua.includes('mac os')) os = 'macOS'
  else if (ua.includes('android')) os = 'Android'
  else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) os = 'iOS'
  else if (ua.includes('linux')) os = 'Linux'

  return { device, browser, os }
}

// Get location from IP address
async function getLocationFromIP(ip: string) {
  try {
    // Skip for localhost/private IPs
    if (ip === 'unknown' || ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168') || ip.startsWith('10.')) {
      return { country: 'Local', countryCode: 'LOCAL', city: 'Localhost' }
    }

    // Using ip-api.com (free, no API key needed, 45 requests per minute)
    const response = await axios.get(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city`)

    if (response.data.status === 'success') {
      return {
        country: response.data.country || 'Unknown',
        countryCode: response.data.countryCode || 'XX',
        city: response.data.city || 'Unknown'
      }
    }
  } catch (error) {
    console.error('Error fetching location:', error)
  }

  return { country: 'Unknown', countryCode: 'XX', city: 'Unknown' }
}

// POST - Log new activity
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, page, pageTitle } = body

    // Get IP and user agent from request
    let ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown'

    // Clean up IP (sometimes x-forwarded-for has multiple IPs)
    if (ip.includes(',')) {
      ip = ip.split(',')[0].trim()
    }

    const userAgent = request.headers.get('user-agent') || ''

    // Parse user agent
    const { device, browser, os } = parseUserAgent(userAgent)

    // Get location from IP
    const location = await getLocationFromIP(ip)

    // Create activity log
    await prisma.cSiteActivityLog.create({
      data: {
        sessionId,
        page,
        pageTitle,
        ip,
        country: location.country,
        countryCode: location.countryCode,
        city: location.city,
        device,
        browser,
        os,
        loginTime: new Date()
      }
    })

    return NextResponse.json({ success: true, sessionId })
  } catch (error) {
    console.error('Error logging activity:', error)
    return NextResponse.json(
      { error: 'Failed to log activity' },
      { status: 500 }
    )
  }
}

// GET - Get activity logs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('sessionId')
    const ip = searchParams.get('ip')
    const limit = parseInt(searchParams.get('limit') || '100')

    const where: any = {}
    if (sessionId) where.sessionId = sessionId
    if (ip) where.ip = ip

    const activities = await prisma.cSiteActivityLog.findMany({
      where,
      orderBy: {
        loginTime: 'desc'
      },
      take: limit
    })

    return NextResponse.json(activities)
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}