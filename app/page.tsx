import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";
import ProductsGrid from "@/components/ProductsGrid";

export const revalidate = 60;

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .order("id", { ascending: false });

  if (error) {
    console.error("상품 조회 오류:", error.message);
  }

  const items: Product[] = products ?? [];

  return <ProductsGrid products={items} />;
}
