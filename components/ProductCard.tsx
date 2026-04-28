"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/supabase";
import ProductThumb from "./ProductThumb";

export default function ProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textAlign: "left", display: "block", width: "100%",
        border: "none", padding: 0, background: "transparent",
        cursor: "pointer", fontFamily: "inherit", color: "inherit",
        transition: "transform .25s cubic-bezier(.2,.7,.3,1)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <Link href={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{
          background: "#fff",
          border: "1px solid " + (hover ? "#dcd6c9" : "#ececec"),
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: hover
            ? "0 10px 24px -8px rgba(60,50,40,0.18), 0 2px 6px rgba(60,50,40,0.06)"
            : "0 1px 2px rgba(60,50,40,0.04)",
          transition: "box-shadow .25s, border-color .25s",
        }}>
          <ProductThumb product={product} />
          <div style={{ padding: "12px 12px 14px" }}>
            <div style={{
              fontSize: 11, color: "#9a9387", marginBottom: 4,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span>{(product.view_count ?? 0).toLocaleString()} views</span>
            </div>
            <div style={{
              fontSize: 13.5, fontWeight: 600, lineHeight: 1.4,
              letterSpacing: "-0.01em", marginBottom: 10,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: 38,
            }}>
              {product.product_name ?? product.title}
            </div>
            <div style={{
              fontSize: 12, fontWeight: 600,
              color: hover ? "#e85c0d" : "#1a1a1a",
              display: "flex", alignItems: "center", gap: 4,
              transition: "color .2s",
            }}>
              쿠팡에서 보기
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: hover ? "translateX(2px)" : "translateX(0)", transition: "transform .2s" }}>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </button>
  );
}
