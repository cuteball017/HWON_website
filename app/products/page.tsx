"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 제품 타입 정의
type Product = {
  id: string
  image: string
  title: string
  description: string
  details: string
  price: string
  category: string
}

export default function ProductsPage() {
  // 제품 데이터 정의
  const productData: Product[] = [
    // 순수 생강즙 카테고리
    {
      id: "pure-ginger",
      image: "/images/spices.jpeg",
      title: "순수 생강즙",
      description: "100% 생강만을 담아낸 원액 그대로의 맛",
      details: "국내산 생강 100%로 만든 순수 생강즙입니다. 매일 아침 한 포로 활력 넘치는 하루를 시작하세요.",
      price: "35,000원",
      category: "original",
    },
    {
      id: "ginger-premium",
      image: "/images/spices.jpeg",
      title: "프리미엄 생강즙",
      description: "특별 배합으로 만든 고급 생강즙",
      details:
        "엄선된 최상급 국내산 생강만을 사용하여 특별한 공법으로 제조한 프리미엄 생강즙입니다. HWON의 기술력이 집약된 제품입니다.",
      price: "45,000원",
      category: "original",
    },

    // 혼합 생강즙 카테고리
    {
      id: "ginger-honey",
      image: "/images/spices.jpeg",
      title: "생강 꿀즙",
      description: "생강과 천연 꿀의 조화로운 맛",
      details: "국내산 생강과 천연 꿀을 배합하여 만든 생강 꿀즙입니다. 생강의 매운맛을 줄이고 달콤함을 더했습니다.",
      price: "38,000원",
      category: "mixed",
    },
    {
      id: "ginger-jujube",
      image: "/images/spices.jpeg",
      title: "생강 대추즙",
      description: "생강과 대추의 영양이 어우러진 맛",
      details: "국내산 생강과 대추를 함께 담아 영양을 더한 생강 대추즙입니다. 생강과 대추의 조화로운 맛을 즐겨보세요.",
      price: "40,000원",
      category: "mixed",
    },

    // 선물세트 카테고리
    {
      id: "ginger-gift-set",
      image: "/images/spices.jpeg",
      title: "생강즙 선물세트",
      description: "다양한 생강즙을 한번에 즐길 수 있는 세트",
      details:
        "HWON의 인기 생강즙 3종(순수 생강즙, 생강 꿀즙, 생강 대추즙)을 한 세트로 구성했습니다. 소중한 분들께 건강을 선물하세요.",
      price: "99,000원",
      category: "set",
    },
    {
      id: "ginger-premium-set",
      image: "/images/spices.jpeg",
      title: "프리미엄 선물세트",
      description: "최고급 생강즙으로 구성된 선물세트",
      details:
        "HWON의 프리미엄 생강즙과 유기농 생강즙을 포함한 고급 선물세트입니다. 특별한 분들을 위한 최고의 선물입니다.",
      price: "120,000원",
      category: "set",
    },
  ]

  // 카테고리별 제품 필터링
  const allProducts = productData
  const originalProducts = productData.filter((p) => p.category === "original")
  const mixedProducts = productData.filter((p) => p.category === "mixed")
  const setProducts = productData.filter((p) => p.category === "set")

  const [currentTab, setCurrentTab] = useState("all")

  useEffect(() => {
    // 페이지 로드 시 스크롤 위치를 맨 위로 이동
    window.scrollTo(0, 0)

    // 초기 애니메이션 적용 함수
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

  // 탭 변경 시 애니메이션 재적용
  const handleTabChange = (value: string) => {
    setCurrentTab(value)

    // 애니메이션 초기화 및 재적용
    setTimeout(() => {
      const visibleElements = document.querySelectorAll(`.tab-content-${value} .animate-on-scroll`)
      visibleElements.forEach((el) => {
        el.classList.remove("fade-in")
        if (el instanceof HTMLElement) {
          const width = el.offsetWidth;
        }
        el.classList.add("fade-in")
      })
    }, 50)
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* 헤더 */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
          <h1 className="text-4xl font-bold mb-4">제품 소개</h1>
          <p className="text-lg text-muted-foreground">
            HWON의 다양한 생강즙 제품을 만나보세요. 건강한 삶을 위한 최고의 선택입니다.
          </p>
        </div>

        {/* 제품 탭 */}
        <Tabs defaultValue="all" className="mb-16" value={currentTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="original">순수 생강즙</TabsTrigger>
            <TabsTrigger value="mixed">혼합 생강즙</TabsTrigger>
            <TabsTrigger value="set">선물세트</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8 tab-content-all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="original" className="mt-8 tab-content-original">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {originalProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mixed" className="mt-8 tab-content-mixed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mixedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="set" className="mt-8 tab-content-set">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {setProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* 제품 정보 */}
        <div className="max-w-3xl mx-auto mt-24 animate-on-scroll">
          <h2 className="text-3xl font-bold mb-8 text-center">생강즙의 효능</h2>

          <div className="space-y-8">
            <div className="bg-secondary rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">면역력 강화</h3>
              <p>
                생강에 함유된 진저롤과 쇼가올 성분은 면역력을 높이는데 도움을 줍니다. 특히 환절기나 계절 변화가 심한
                시기에 더욱 효과적입니다.
              </p>
            </div>

            <div className="bg-secondary rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">소화 촉진</h3>
              <p>
                생강은 위장 운동을 활성화시켜 소화를 돕고 위장 건강에 도움을 줍니다. 식후 한 포의 생강즙으로 편안한
                소화를 경험하세요.
              </p>
            </div>

            <div className="bg-secondary rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">혈액순환 개선</h3>
              <p>생강의 매운 성분은 혈액순환을 촉진하여 신체 말단부위의 혈액순환을 개선하는데 도움을 줍니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Card className="animate-on-scroll overflow-hidden" style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="relative h-64">
        <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <p className="text-sm mb-4">{product.details}</p>
        <p className="text-lg font-semibold">{product.price}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <a href="https://shopping.naver.com/ns/home" target="_blank" rel="noopener noreferrer">
            구매하기
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

