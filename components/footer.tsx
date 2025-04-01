import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HWON</h3>
            <p className="text-muted-foreground">건강한 생활을 위한 프리미엄 생강즙 제품을 제공합니다.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  제품
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  문의
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">연락처</h3>
            <address className="not-italic text-muted-foreground">
              <p>이메일: info@hwon.com</p>
              <p>전화: 02-123-4567</p>
              <p>주소: 서울특별시 강남구 테헤란로 123</p>
            </address>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HWON. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

