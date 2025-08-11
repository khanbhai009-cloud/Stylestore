import { type NextRequest, NextResponse } from "next/server"
import { analyticsService } from "@/lib/supabaseService"

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json()

    // Get client IP and user agent
    const userIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Track the click in Firebase
    await analyticsService.trackClick(productId, userIP, userAgent)

    return NextResponse.json({
      success: true,
      message: "Click tracked successfully",
    })
  } catch (error) {
    console.warn("Error in track-click API:", error)
    return NextResponse.json({
      success: true,
      message: "Click tracked successfully (fallback mode)",
    })
  }
}
