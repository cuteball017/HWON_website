"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 초기 화면 크기 확인
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // 초기 실행
    checkIfMobile()

    // 화면 크기 변경 시 확인
    window.addEventListener("resize", checkIfMobile)

    // 클린업
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}

