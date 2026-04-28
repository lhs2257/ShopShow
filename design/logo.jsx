// 쇼쇼 로고 — 한글 워드마크 + 미니 심볼
// 심볼은 재생 삼각형 + 둥근 코너 사각형 = "쇼츠"의 시각적 함축
function ShoshoMark({ size = 28, color = "#1a1a1a" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="9" fill={color}/>
      <path d="M13 11.5 L21.5 16 L13 20.5 Z" fill="#fff"/>
    </svg>
  );
}

function ShoshoLogo({ size = 28, color = "#1a1a1a", showWordmark = true }) {
  return (
    <div style={{display:"inline-flex", alignItems:"center", gap:8}}>
      <ShoshoMark size={size} color={color}/>
      {showWordmark && (
        <span style={{
          fontFamily:'Pretendard, ui-sans-serif, system-ui, sans-serif',
          fontWeight: 800,
          fontSize: size * 0.72,
          letterSpacing: "-0.02em",
          color
        }}>쇼쇼</span>
      )}
    </div>
  );
}

Object.assign(window, { ShoshoMark, ShoshoLogo });
