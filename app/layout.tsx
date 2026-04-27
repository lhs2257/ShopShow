import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "쇼핑쇼츠 - 추천 상품 모음",
  description: "유튜브 쇼핑쇼츠 채널 추천 상품 모음. 쿠팡 최저가 상품을 한 눈에.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-orange-500">
              쇼핑쇼츠
            </a>
            <p className="text-sm text-gray-500">유튜브 인기 상품 모음</p>
          </div>
        </header>
        <main className="min-h-screen bg-gray-50">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-400">
            <p>
              본 페이지의 상품 링크는 쿠팡 파트너스 링크로, 구매 시 일정
              수수료를 제공받습니다.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
