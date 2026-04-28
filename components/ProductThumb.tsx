import Image from "next/image";
import type { Product } from "@/lib/supabase";

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function ProductThumb({ product }: { product: Product }) {
  // 나의 유튜브 링크 썸네일 우선, 없으면 소재 썸네일, 없으면 placeholder
  let imgSrc: string | null = null;

  if (product.my_youtube_url) {
    const vid = extractYouTubeId(product.my_youtube_url);
    if (vid) imgSrc = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
  }
  if (!imgSrc && product.thumbnail_url) {
    imgSrc = product.thumbnail_url;
  }

  const no = String(product.id).padStart(2, "0");

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", background: "#f0ebe2", overflow: "hidden" }}>
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={product.product_name ?? product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, 25vw"
          unoptimized={imgSrc.includes("ytimg.com")}
        />
      ) : (
        <>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(135deg, #e3dccd 0 1px, transparent 1px 14px)",
            opacity: 0.55,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: '"SF Mono", ui-monospace, monospace',
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "rgba(60,50,40,0.42)",
            textTransform: "uppercase",
          }}>
            img
          </div>
        </>
      )}
      {/* No. 배지 */}
      <div style={{
        position: "absolute", top: 10, left: 10,
        fontFamily: '"SF Mono", ui-monospace, monospace',
        fontSize: 10.5, fontWeight: 600, letterSpacing: "0.06em",
        color: "#1a1a1a",
        background: "rgba(255,255,255,0.92)",
        padding: "3px 7px", borderRadius: 3,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}>
        No.{no}
      </div>
    </div>
  );
}
