"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Shield, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const [isHeroHovered, setIsHeroHovered] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  const isMobile = useMobile()

  // 히어로 섹션 호버/터치 상태 관리
  const handleHeroInteraction = (isActive: boolean) => {
    if (isMobile) {
      if (isActive) {
        setIsTouched(true)
      }
    } else {
      setIsHeroHovered(isActive)
    }
  }

  // 모바일에서 터치 외부 영역 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (heroRef.current && !heroRef.current.contains(event.target as Node)) {
        setIsTouched(false)
      }
    }

    if (isMobile) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isMobile])

  useEffect(() => {
    // 페이지 로드 시 스크롤 위치를 맨 위로 이동
    window.scrollTo(0, 0)

    // 초기 화면에 보이는 요소들에 애니메이션 적용
    const applyInitialAnimations = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight) {
          el.classList.add("fade-in")
        }
      })
    }

    // 스크롤 시 요소들에 애니메이션 적용
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observer.observe(el))

    // 페이지 로드 시 초기 애니메이션 적용
    setTimeout(applyInitialAnimations, 100)

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // 히어로 콘텐츠 표시 여부 결정
  const showHeroContent = isMobile ? isTouched : isHeroHovered

  return (
    <div className="overflow-hidden">
      {/* 히어로 섹션 */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-24"
        onMouseEnter={() => handleHeroInteraction(true)}
        onMouseLeave={() => handleHeroInteraction(false)}
        onClick={() => isMobile && handleHeroInteraction(true)}
      >
        <div className="absolute inset-0 -z-10 top-20">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-b from-background/80 to-background transition-opacity duration-500",
              showHeroContent ? "opacity-80" : "opacity-30",
            )}
          />
          <Image
            src="/images/spices.jpeg"
            alt="생강즙 배경 이미지"
            fill
            priority
            className={cn(
              "object-cover transition-all duration-500",
              showHeroContent ? "filter blur-sm scale-105" : "filter blur-0 scale-100",
            )}
          />
        </div>

        <div
          className={cn(
            "container mx-auto px-4 md:px-6 py-12 transition-all duration-500",
            showHeroContent
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-10 pointer-events-none",
          )}
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              자연의 힘을 담은
              <br />
              프리미엄 생강즙
            </h1>
            <p className="text-xl text-foreground">
              HWON의 생강즙은 엄선된 국내산 생강만을 사용하여
              <br />
              건강과 맛을 모두 담았습니다.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button asChild size="lg" className="text-lg">
                <Link href="/products">제품 보기</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="/contact">문의하기</Link>
              </Button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-300",
            showHeroContent ? "opacity-100" : "opacity-0",
          )}
        >
          <ArrowRight className="h-8 w-8 rotate-90 text-primary" />
        </div>
      </section>

      {/* 특징 섹션 */}
      <section ref={featuresRef} className="py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">HWON 생강즙의 특별함</h2>
            <p className="text-lg text-muted-foreground">
              건강한 삶을 위한 최고의 선택, HWON 생강즙만의 특별한 가치를 소개합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="h-10 w-10 text-primary" />,
                title: "100% 국내산 원료",
                description: "엄선된 국내산 생강만을 사용하여 최상의 품질을 보장합니다.",
              },
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "무첨가 제조 공법",
                description: "인공 첨가물 없이 생강 본연의 영양소를 그대로 담았습니다.",
              },
              {
                icon: <ThumbsUp className="h-10 w-10 text-primary" />,
                title: "편리한 섭취",
                description: "언제 어디서나 간편하게 즐길 수 있는 스틱 포장으로 제공됩니다.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "bg-background rounded-lg p-8 shadow-sm animate-on-scroll",
                  "transform transition-all duration-500",
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 제품 미리보기 섹션 */}
      <section ref={productsRef} className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">HWON의 프리미엄 생강즙</h2>
            <p className="text-lg text-muted-foreground">다양한 맛과 효능을 갖춘 HWON의 생강즙 제품을 만나보세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/images/spices.jpeg",
                title: "순수 생강즙",
                description: "100% 생강만을 담아낸 원액 그대로의 맛",
                price: "35,000원",
              },
              {
                image: "/images/spices.jpeg",
                title: "생강 꿀즙",
                description: "생강과 천연 꿀의 조화로운 맛",
                price: "38,000원",
              },
              {
                image: "/images/spices.jpeg",
                title: "생강 대추즙",
                description: "생강과 대추의 영양이 어우러진 맛",
                price: "40,000원",
              },
            ].map((product, index) => (
              <div
                key={index}
                className={cn(
                  "bg-background rounded-lg overflow-hidden shadow-sm animate-on-scroll",
                  "transform transition-all duration-500 hover:shadow-md",
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-64">
                  <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">{product.price}</span>
                    <Button asChild variant="outline" size="sm">
                      <a href="https://shopping.naver.com/ns/home" target="_blank" rel="noopener noreferrer">
                        구매하기
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <a href="https://shopping.naver.com/ns/home" target="_blank" rel="noopener noreferrer">
                모든 제품 보기
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold">건강한 삶을 위한 첫걸음</h2>
            <p className="text-xl opacity-90">HWON 생강즙으로 매일 활력 넘치는 하루를 시작하세요.</p>
            <Button asChild size="lg" variant="secondary" className="text-primary font-medium mt-4">
              <Link href="/contact">지금 문의하기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

