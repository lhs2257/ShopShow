import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "쇼쇼 | 유튜브 쇼츠 잇템 모음",
  description: "유튜브 쇼츠에서 화제가 된 상품만 큐레이션합니다. 쿠팡 최저가로 바로 구매하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
