"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/supabase";
import ProductCard from "./ProductCard";
import ShoshoLogo from "./ShoshoLogo";

export default function ProductsGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"최신순" | "인기순" | "번호순">("최신순");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = [...products];

    if (q) {
      const numMatch = q.match(/^(?:no\.?\s*)?(\d+)$/);
      if (numMatch) {
        const num = parseInt(numMatch[1], 10);
        list = list.filter((p) => p.id === num);
      } else {
        list = list.filter(
          (p) =>
            (p.product_name ?? p.title).toLowerCase().includes(q)
        );
      }
    }

    if (sort === "인기순") {
      list.sort((a, b) => (b.view_count ?? 0) - (a.view_count ?? 0));
    } else if (sort === "번호순") {
      list.sort((a, b) => a.id - b.id);
    } else {
      list.sort((a, b) => b.id - a.id);
    }

    return list;
  }, [query, sort, products]);

  return (
    <div style={{
      width: "100%", minHeight: "100vh",
      background: "#faf9f7",
      paddingBottom: 60,
    }}>
      {/* 헤더 */}
      <header style={{
        borderBottom: "1px solid #ececec",
        background: "#faf9f7",
        position: "sticky", top: 0, zIndex: 10,
      }} className="px-4 pt-5 pb-4 md:px-10 md:pt-7 md:pb-5">
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 12,
        }}>
          <ShoshoLogo size={26} />
          <div style={{ fontSize: 11, color: "#7a7468", fontWeight: 500 }}>
            오늘의 큐레이션 {products.length}
          </div>
        </div>
        <div style={{ color: "#5d574b", lineHeight: 1.5, marginBottom: 14 }} className="text-sm md:text-base">
          유튜브에서 한 번쯤 봤던 그 상품, 여기 다 모아뒀어요.
        </div>

        {/* 검색바 */}
        <div style={{
          display: "flex", alignItems: "center",
          background: "#fff",
          border: "1px solid #e7e3da",
          borderRadius: 10,
          padding: "0 12px 0 14px",
          height: 42,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9a9387" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="상품 번호(No.15) 또는 상품명 검색"
            style={{
              flex: 1, marginLeft: 10,
              border: "none", outline: "none", background: "transparent",
              fontSize: 14, fontFamily: "inherit", color: "#1a1a1a",
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{
              border: "none", background: "transparent", cursor: "pointer",
              color: "#9a9387", fontSize: 14, padding: 4,
            }}>
              ✕
            </button>
          )}
        </div>

        {/* 정렬 칩 */}
        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
          {(["최신순", "인기순", "번호순"] as const).map((s) => {
            const on = s === sort;
            return (
              <button key={s} onClick={() => setSort(s)} style={{
                fontFamily: "inherit", fontSize: 12.5, fontWeight: on ? 600 : 500,
                padding: "6px 12px", borderRadius: 999,
                border: "1px solid " + (on ? "#1a1a1a" : "#e7e3da"),
                background: on ? "#1a1a1a" : "transparent",
                color: on ? "#fff" : "#5d574b",
                cursor: "pointer", transition: "all .15s",
              }}>
                {s}
              </button>
            );
          })}
        </div>
      </header>

      {/* 상품 그리드 */}
      <main className="px-4 pt-5 pb-10 md:px-10 md:pt-7">
        {filtered.length === 0 ? (
          <div style={{ padding: "60px 20px", textAlign: "center", color: "#7a7468" }}>
            <div style={{
              width: 56, height: 56, margin: "0 auto 16px",
              borderRadius: "50%", background: "#f0ebe2",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9a9387" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
              </svg>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: 6 }}>
              검색 결과가 없습니다
            </div>
            <div style={{ fontSize: 13, color: "#7a7468", marginBottom: 18 }}>
              &ldquo;{query}&rdquo;에 해당하는 상품을 찾지 못했어요.
            </div>
            <button onClick={() => setQuery("")} style={{
              fontFamily: "inherit", fontSize: 12.5, fontWeight: 500,
              padding: "8px 16px", border: "1px solid #1a1a1a",
              background: "transparent", borderRadius: 999, cursor: "pointer",
            }}>
              전체 상품 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* 푸터 */}
        <div style={{
          marginTop: 60, paddingTop: 24,
          borderTop: "1px solid #ececec",
          fontSize: 11, color: "#9a9387", lineHeight: 1.6,
          textAlign: "center",
        }}>
          쇼쇼는 유튜브 쇼츠에서 발견한 상품을 큐레이션합니다.<br />
          상품 구매는 쿠팡 파트너스를 통해 이루어지며, 일정 수수료를 받습니다.
        </div>
      </main>
    </div>
  );
}
