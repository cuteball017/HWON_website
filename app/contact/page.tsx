"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// 폼 유효성 검사 스키마
const formSchema = z.object({
  name: z.string().min(2, { message: "이름을 입력해주세요." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  phone: z.string().min(10, { message: "유효한 전화번호를 입력해주세요." }),
  message: z.string().min(10, { message: "문의 내용을 10자 이상 입력해주세요." }),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 폼 초기화
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  useEffect(() => {
    // 페이지 로드 시 스크롤 위치를 맨 위로 이동
    window.scrollTo(0, 0)

    // 초기 화면에 보이는 요소들에 애니메이션 적용
    const applyInitialAnimations = () => {
      const elements = document.querySelectorAll(".animate-on-scroll, .fade-in, .slide-up, .slide-in-right")
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight) {
          if (el.classList.contains("animate-on-scroll")) {
            el.classList.add("fade-in")
          }
        }
      })
    }

    // 스크롤 시 요소들에 애니메이션 적용
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("animate-on-scroll")) {
              entry.target.classList.add("fade-in")
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll, .fade-in, .slide-up, .slide-in-right")
    elements.forEach((el) => observer.observe(el))

    // 페이지 로드 시 초기 애니메이션 적용
    setTimeout(applyInitialAnimations, 100)

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // 폼 제출 처리
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Google Apps Script 웹 앱 URL
      const response = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("문의 제출에 실패했습니다.")
      }

      toast({
        title: "문의가 성공적으로 제출되었습니다.",
        description: "빠른 시일 내에 답변 드리겠습니다.",
      })

      // 폼 초기화
      form.reset()
    } catch (error) {
      toast({
        title: "오류가 발생했습니다.",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
          <h1 className="text-4xl font-bold mb-4">문의하기</h1>
          <p className="text-lg text-muted-foreground">
            HWON 제품에 대한 문의나 궁금한 점이 있으시면 아래 양식을 통해 문의해주세요.
          </p>
        </div>

        <div className="max-w-md mx-auto animate-on-scroll">
          <Card>
            <CardHeader>
              <CardTitle>문의 양식</CardTitle>
              <CardDescription>
                아래 양식을 작성하여 문의를 남겨주세요. 빠른 시일 내에 답변 드리겠습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                          <Input placeholder="홍길동" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>전화번호</FormLabel>
                        <FormControl>
                          <Input placeholder="01012345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>문의 내용</FormLabel>
                        <FormControl>
                          <Textarea placeholder="문의하실 내용을 입력해주세요." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "제출 중..." : "문의 제출하기"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
              <p>* 문의하신 내용은 영업일 기준 1-2일 내에 답변 드립니다.</p>
              <p>* 제품 구매 관련 문의는 02-123-4567로 연락주세요.</p>
            </CardFooter>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll">
          <div className="bg-secondary rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">연락처</h2>
            <address className="not-italic space-y-2">
              <p>이메일: info@hwon.com</p>
              <p>전화: 02-123-4567</p>
              <p>운영시간: 평일 09:00 - 18:00</p>
            </address>
          </div>

          <div className="bg-secondary rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">오시는 길</h2>
            <p className="mb-2">서울특별시 강남구 테헤란로 123</p>
            <p className="text-sm text-muted-foreground">지하철 2호선 강남역 3번 출구에서 도보 5분</p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

