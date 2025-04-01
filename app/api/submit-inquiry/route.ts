import { NextResponse } from "next/server"

// Google Apps Script 웹 앱 URL
// 실제 배포 시 환경 변수로 관리하는 것이 좋습니다
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || ""

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 필수 필드 검증
    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json({ error: "모든 필드를 입력해주세요." }, { status: 400 })
    }

    // Google Apps Script로 데이터 전송
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit to Google Script")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error submitting inquiry:", error)
    return NextResponse.json({ error: "문의 제출 중 오류가 발생했습니다." }, { status: 500 })
  }
}

