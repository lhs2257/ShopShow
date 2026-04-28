// 상품 상세 페이지 — 심플 버전
function DetailPage({ product, accent, mobile, onBack }) {
  if (!product) return null;
  const pid = String(product.id).padStart(2, "0");
  const pagePad = mobile ? 16 : 40;

  return (
    <div style={{
      width:"100%", minHeight:"100%",
      background:"#faf9f7",
      fontFamily:'Pretendard, ui-sans-serif, system-ui, -apple-system, sans-serif',
      color:"#1a1a1a",
      paddingBottom: mobile ? 100 : 60,
    }}>
      {/* 상단 바 */}
      <header style={{
        position:"sticky", top:0, zIndex:10,
        padding: `${mobile ? 14 : 18}px ${pagePad}px`,
        background:"rgba(250,249,247,0.92)",
        backdropFilter:"blur(12px)",
        WebkitBackdropFilter:"blur(12px)",
        borderBottom:"1px solid #ececec",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <button onClick={onBack} style={{
          border:"none", background:"transparent", cursor:"pointer",
          fontFamily:"inherit", fontSize: mobile ? 13.5 : 14,
          color:"#1a1a1a", fontWeight: 500,
          display:"flex", alignItems:"center", gap: 6,
          padding: "6px 0",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          전체 상품
        </button>
        <ShoshoLogo size={mobile ? 22 : 24} />
        <div style={{ width: mobile ? 60 : 80 }}/>
      </header>

      <main style={{ padding: `${mobile ? 20 : 32}px ${pagePad}px 40px`, maxWidth: 720, margin:"0 auto" }}>
        {/* No. 라벨 + 카테고리 */}
        <div style={{
          display:"flex", alignItems:"center", gap: 10, marginBottom: 14,
          fontFamily:'"SF Mono", ui-monospace, Menlo, monospace',
          fontSize: 12,
          color:"#7a7468",
          letterSpacing:"0.04em",
        }}>
          <span style={{
            color:"#1a1a1a", fontWeight: 600,
          }}>No.{pid}</span>
          <span style={{color:"#d4cfc4"}}>·</span>
          <span style={{fontFamily:"inherit"}}>{product.category}</span>
        </div>

        {/* 상품명 */}
        <h1 style={{
          fontSize: mobile ? 22 : 28,
          fontWeight: 700,
          letterSpacing:"-0.02em",
          lineHeight: 1.3,
          margin:"0 0 18px",
          textWrap: "pretty",
        }}>
          {product.name}
        </h1>

        {/* 썸네일 */}
        <div style={{
          borderRadius: 12,
          overflow:"hidden",
          border:"1px solid #ececec",
          marginBottom: mobile ? 22 : 28,
        }}>
          <ProductThumb product={product} ratio={mobile ? "1 / 1" : "4 / 3"} showLabel={false} />
        </div>

        {/* 영상 설명 */}
        <div style={{
          background:"#f5f1ea",
          borderRadius: 10,
          padding: mobile ? "16px 18px" : "20px 22px",
          marginBottom: mobile ? 28 : 36,
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color:"#9a8e72",
            marginBottom: 8,
          }}>
            ▶ 쇼츠에서 본 그 장면
          </div>
          <p style={{
            fontSize: mobile ? 14 : 15,
            lineHeight: 1.65,
            color:"#3d3a32",
            margin: 0,
            textWrap:"pretty",
          }}>
            {product.desc}
          </p>
        </div>

        {/* 데스크탑용 CTA */}
        {!mobile && (
          <a href="#" onClick={e => e.preventDefault()} style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap: 8,
            width:"100%",
            background: accent,
            color:"#fff",
            fontFamily:"inherit",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing:"-0.01em",
            padding: "18px 24px",
            borderRadius: 10,
            border:"none",
            cursor:"pointer",
            textDecoration:"none",
            boxShadow:"0 6px 18px -6px rgba(60,50,40,0.3)",
          }}>
            쿠팡에서 구매하기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M7 7h10v10"/>
            </svg>
          </a>
        )}

        {/* 데스크탑 전용 작은 안내 */}
        {!mobile && (
          <div style={{
            marginTop: 14, fontSize: 11.5, color:"#9a9387", textAlign:"center",
          }}>
            클릭 시 쿠팡 파트너스 링크로 이동합니다.
          </div>
        )}
      </main>

      {/* 모바일용 고정 CTA 바 */}
      {mobile && (
        <div style={{
          position:"sticky", bottom: 0, left: 0, right: 0,
          padding: "12px 16px 18px",
          background:"linear-gradient(180deg, rgba(250,249,247,0) 0%, rgba(250,249,247,0.95) 30%, #faf9f7 60%)",
          marginTop: -40,
        }}>
          <a href="#" onClick={e => e.preventDefault()} style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap: 8,
            width:"100%", boxSizing:"border-box",
            background: accent,
            color:"#fff",
            fontFamily:"inherit",
            fontSize: 15.5,
            fontWeight: 700,
            letterSpacing:"-0.01em",
            padding: "16px 20px",
            borderRadius: 10,
            border:"none",
            textDecoration:"none",
            boxShadow:"0 8px 24px -8px rgba(60,50,40,0.35)",
          }}>
            쿠팡에서 구매하기
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M7 7h10v10"/>
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

window.DetailPage = DetailPage;
