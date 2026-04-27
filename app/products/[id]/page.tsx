import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function ProductPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params;
  const productId = Number(id);

  if (isNaN(productId)) notFound();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .eq("is_visible", true)
    .single();

  if (!product) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-orange-500 mb-6 inline-block"
      >
        ← 목록으로
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {product.thumbnail_url && (
          <div className="relative w-full aspect-video bg-gray-100">
            <Image
              src={product.thumbnail_url}
              alt={product.product_name ?? product.title}
              fill
              className="object-cover"
              sizes="672px"
              priority
            />
          </div>
        )}

        <div className="p-6 space-y-4">
          <h1 className="text-xl font-bold text-gray-800">
            {product.product_name ?? product.title}
          </h1>

          <p className="text-sm text-gray-500">
            조회수 {(product.view_count ?? 0).toLocaleString()} · 영상 제목:{" "}
            {product.title}
          </p>

          {product.coupang_url ? (
            <a
              href={product.coupang_url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block w-full text-center text-lg bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              쿠팡에서 최저가 확인하기
            </a>
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">
              쿠팡 링크 준비 중입니다.
            </p>
          )}

          <p className="text-xs text-gray-400 text-center">
            이 링크는 쿠팡 파트너스 링크로, 구매 시 일정 수수료를 제공받습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
