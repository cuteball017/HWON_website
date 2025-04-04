'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  

  // 페이지 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-playfair font-bold">
            HWON
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">
              홈
            </Link>
            <Link href="/products" className="text-foreground/80 hover:text-foreground transition-colors">
              제품
            </Link>
            <Link href="/contact" className="text-foreground/80 hover:text-foreground transition-colors">
              문의
            </Link>
            <Button asChild>
              <a href="https://shopping.naver.com/ns/home" target="_blank" rel="noopener noreferrer">
                구매하기
              </a>
            </Button>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">메뉴 열기</span>
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-background z-[9999] md:hidden">
          <div className="flex justify-between items-center px-4 py-4">
            <Link href="/" className="text-2xl font-playfair font-bold">
              HWON
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">메뉴 닫기</span>
            </Button>
          </div>

          <nav className="flex flex-col items-center justify-center h-[calc(100%-80px)] space-y-6 text-xl font-medium">
            <Link href="/" onClick={() => setIsOpen(false)}>홈</Link>
            <Link href="/products" onClick={() => setIsOpen(false)}>제품</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>문의</Link>
            <Button asChild className="mt-4">
              <a
                href="https://shopping.naver.com/ns/home"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                구매하기
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

