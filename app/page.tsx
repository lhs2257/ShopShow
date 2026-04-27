import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/supabase";

export const revalidate = 60; // 60초마다 재생성

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .order("view_count", { ascending: false });

  if (error) {
    console.error("상품 조회 오류:", error.message);
  }

  const items: Product[] = products ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">인기 추천 상품</h2>
        <p className="text-sm text-gray-500 mt-1">
          유튜브에서 화제가 된 상품들을 모았습니다.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-4xl mb-4">🛒</p>
          <p>아직 등록된 상품이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
