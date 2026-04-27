"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/supabase";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full aspect-video bg-gray-100">
          {product.thumbnail_url ? (
            <Image
              src={product.thumbnail_url}
              alt={product.product_name ?? product.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300 text-3xl">
              🛍️
            </div>
          )}
        </div>
        <div className="p-3">
          <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
            {product.product_name ?? product.title}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            조회수 {(product.view_count ?? 0).toLocaleString()}
          </p>
        </div>
      </Link>
      {product.coupang_url && (
        <div className="px-3 pb-3">
          <a
            href={product.coupang_url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="block w-full text-center text-sm bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            쿠팡에서 보기
          </a>
        </div>
      )}
    </div>
  );
}
