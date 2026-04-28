// 상품 썸네일 placeholder — 카테고리별 살짝 다른 톤
const CATEGORY_TONES = {
  "주방":   { bg: "#f0ebe2", stripe: "#e3dccd", label: "kitchen" },
  "뷰티":   { bg: "#f3e9e7", stripe: "#e7d6d3", label: "beauty"  },
  "생활":   { bg: "#ecebe7", stripe: "#dedcd6", label: "living"  },
  "홈데코": { bg: "#eee9e1", stripe: "#ddd5c9", label: "homedeco"},
  "패션":   { bg: "#eae7e3", stripe: "#d9d4cd", label: "fashion" },
};

function ProductThumb({ product, ratio = "1 / 1", showLabel = true }) {
  const tone = CATEGORY_TONES[product.category] || CATEGORY_TONES["생활"];
  const pid = String(product.id).padStart(2, "0");
  return (
    <div style={{
      position: "relative",
      width: "100%",
      aspectRatio: ratio,
      background: tone.bg,
      overflow: "hidden",
    }}>
      {/* 미세한 스트라이프로 placeholder 표시 */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage: `repeating-linear-gradient(135deg, ${tone.stripe} 0 1px, transparent 1px 14px)`,
        opacity: 0.55,
      }}/>
      {/* 중앙 카테고리 텍스트 placeholder */}
      <div style={{
        position:"absolute", inset:0,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontFamily:'"SF Mono", ui-monospace, Menlo, monospace',
        fontSize: 11,
        letterSpacing: "0.12em",
        color: "rgba(60,50,40,0.42)",
        textTransform: "uppercase",
      }}>
        {tone.label} · img
      </div>
      {/* No. 라벨 — 썸네일 좌상단 */}
      {showLabel && (
        <div style={{
          position:"absolute", top:10, left:10,
          fontFamily:'"SF Mono", ui-monospace, Menlo, monospace',
          fontSize: 10.5,
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: "#1a1a1a",
          background: "rgba(255,255,255,0.92)",
          padding: "3px 7px",
          borderRadius: 3,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}>
          No.{pid}
        </div>
      )}
    </div>
  );
}

window.ProductThumb = ProductThumb;
window.CATEGORY_TONES = CATEGORY_TONES;
