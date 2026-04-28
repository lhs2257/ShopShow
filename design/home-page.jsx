// 메인 페이지 — 헤더, 검색, 정렬 칩, 상품 그리드
function HomePage({ accent, mobile, onOpenProduct, products }) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState("최신순");

  // 검색 필터: "No.15", "15", "매트리스" 등 모두 허용
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products;
    if (q) {
      // No.숫자 또는 숫자만 있는 검색
      const numMatch = q.match(/^(?:no\.?\s*)?(\d+)$/);
      if (numMatch) {
        const num = parseInt(numMatch[1], 10);
        list = list.filter(p => p.id === num);
      } else {
        list = list.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
    }
    // 정렬
    if (sort === "인기순") {
      list = [...list].sort((a,b) => parseFloat(b.views) - parseFloat(a.views));
    } else if (sort === "번호순") {
      list = [...list].sort((a,b) => a.id - b.id);
    } else {
      // 최신순 (date 내림차순)
      list = [...list].sort((a,b) => b.date.localeCompare(a.date));
    }
    return list;
  }, [query, sort, products]);

  const cols = mobile ? 2 : 4;
  const pagePad = mobile ? 16 : 40;

  return (
    <div style={{
      width:"100%", minHeight:"100%",
      background:"#faf9f7",
      fontFamily:'Pretendard, ui-sans-serif, system-ui, -apple-system, sans-serif',
      color:"#1a1a1a",
      paddingBottom: 60,
    }}>
      {/* 헤더 */}
      <header style={{
        padding: `${mobile ? 18 : 28}px ${pagePad}px ${mobile ? 14 : 18}px`,
        borderBottom: "1px solid #ececec",
        background:"#faf9f7",
        position:"sticky", top:0, zIndex:10,
      }}>
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          marginBottom: mobile ? 12 : 16,
        }}>
          <ShoshoLogo size={mobile ? 26 : 30} />
          <div style={{
            fontSize: mobile ? 11 : 12,
            color: "#7a7468",
            fontWeight: 500,
          }}>
            오늘의 큐레이션 {products.length}
          </div>
        </div>
        <div style={{
          fontSize: mobile ? 13 : 14,
          color: "#5d574b",
          lineHeight: 1.5,
          marginBottom: mobile ? 14 : 18,
          maxWidth: 520,
        }}>
          유튜브에서 한 번쯤 봤던 그 상품, 여기 다 모아뒀어요.<br/>
          쇼츠 영상 속 ‘잇템’만 골라 큐레이션합니다.
        </div>

        {/* 검색바 */}
        <div style={{
          position:"relative",
          display:"flex", alignItems:"center",
          background:"#fff",
          border: "1px solid #e7e3da",
          borderRadius: 10,
          padding: "0 12px 0 14px",
          height: mobile ? 42 : 46,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9a9387" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
            <circle cx="11" cy="11" r="7"/>
            <path d="m20 20-3.5-3.5"/>
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="상품 번호(No.15) 또는 상품명 검색"
            style={{
              flex:1, marginLeft: 10,
              border:"none", outline:"none", background:"transparent",
              fontSize: mobile ? 14 : 15,
              fontFamily:"inherit",
              color:"#1a1a1a",
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{
              border:"none", background:"transparent", cursor:"pointer",
              color:"#9a9387", fontSize: 14, padding: 4,
            }}>✕</button>
          )}
        </div>

        {/* 정렬 칩 */}
        <div style={{
          display:"flex", gap: 6, marginTop: mobile ? 12 : 14,
        }}>
          {["최신순","인기순","번호순"].map(s => {
            const on = s === sort;
            return (
              <button key={s} onClick={() => setSort(s)} style={{
                fontFamily:"inherit",
                fontSize: 12.5,
                fontWeight: on ? 600 : 500,
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid " + (on ? "#1a1a1a" : "#e7e3da"),
                background: on ? "#1a1a1a" : "transparent",
                color: on ? "#fff" : "#5d574b",
                cursor:"pointer",
                transition:"all .15s",
              }}>
                {s}
              </button>
            );
          })}
        </div>
      </header>

      {/* 상품 그리드 */}
      <main style={{ padding: `${mobile ? 18 : 28}px ${pagePad}px 40px` }}>
        {filtered.length === 0 ? (
          <EmptyState query={query} onClear={() => setQuery("")} />
        ) : (
          <div style={{
            display:"grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: mobile ? 14 : 22,
          }}>
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                accent={accent}
                mobile={mobile}
                onClick={() => onOpenProduct(p)}
              />
            ))}
          </div>
        )}

        {/* 푸터 안내 */}
        <div style={{
          marginTop: 60, paddingTop: 24,
          borderTop: "1px solid #ececec",
          fontSize: 11, color:"#9a9387", lineHeight: 1.6,
          textAlign:"center",
        }}>
          쇼쇼는 유튜브 쇼츠에서 발견한 상품을 큐레이션합니다.<br/>
          상품 구매는 쿠팡 파트너스를 통해 이루어지며, 일정 수수료를 받습니다.
        </div>
      </main>
    </div>
  );
}

function ProductCard({ product, accent, mobile, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textAlign:"left", display:"block", width:"100%",
        border:"none", padding: 0, background:"transparent",
        cursor:"pointer", fontFamily:"inherit", color:"inherit",
        transition: "transform .25s cubic-bezier(.2,.7,.3,1)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div style={{
        background:"#fff",
        border:"1px solid #ececec",
        borderRadius: 10,
        overflow:"hidden",
        boxShadow: hover
          ? "0 10px 24px -8px rgba(60,50,40,0.18), 0 2px 6px rgba(60,50,40,0.06)"
          : "0 1px 2px rgba(60,50,40,0.04)",
        transition: "box-shadow .25s, border-color .25s",
        borderColor: hover ? "#dcd6c9" : "#ececec",
      }}>
        <ProductThumb product={product} />
        <div style={{ padding: mobile ? "12px 12px 14px" : "14px 14px 16px" }}>
          <div style={{
            fontSize: mobile ? 10.5 : 11,
            color:"#9a9387",
            marginBottom: 4,
            display:"flex", justifyContent:"space-between", alignItems:"center",
          }}>
            <span>{product.category}</span>
            <span style={{fontVariantNumeric:"tabular-nums"}}>♡ {product.views}</span>
          </div>
          <div style={{
            fontSize: mobile ? 13.5 : 14.5,
            fontWeight: 600,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            marginBottom: mobile ? 10 : 12,
            display:"-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient:"vertical",
            overflow:"hidden",
            minHeight: mobile ? 38 : 41,
          }}>
            {product.name}
          </div>
          <div style={{
            fontSize: mobile ? 12 : 12.5,
            fontWeight: 600,
            color: hover ? accent : "#1a1a1a",
            display:"flex", alignItems:"center", gap: 4,
            transition:"color .2s",
          }}>
            쿠팡에서 보기
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{transform: hover ? "translateX(2px)" : "translateX(0)", transition:"transform .2s"}}>
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

function EmptyState({ query, onClear }) {
  return (
    <div style={{
      padding: "60px 20px",
      textAlign:"center",
      color:"#7a7468",
    }}>
      <div style={{
        width: 56, height: 56, margin:"0 auto 16px",
        borderRadius: "50%",
        background:"#f0ebe2",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9a9387" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
        </svg>
      </div>
      <div style={{fontSize:15, fontWeight:600, color:"#1a1a1a", marginBottom: 6}}>
        검색 결과가 없습니다
      </div>
      <div style={{fontSize:13, color:"#7a7468", marginBottom: 18}}>
        “{query}”에 해당하는 상품을 찾지 못했어요.
      </div>
      <button onClick={onClear} style={{
        fontFamily:"inherit", fontSize:12.5, fontWeight:500,
        padding:"8px 16px",
        border:"1px solid #1a1a1a",
        background:"transparent",
        borderRadius:999,
        cursor:"pointer",
      }}>
        전체 상품 보기
      </button>
    </div>
  );
}

Object.assign(window, { HomePage, ProductCard, EmptyState });
