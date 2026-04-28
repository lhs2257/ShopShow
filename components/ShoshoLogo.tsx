export default function ShoshoLogo({ size = 28 }: { size?: number }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="28" height="28" rx="9" fill="#1a1a1a" />
        <path d="M13 11.5 L21.5 16 L13 20.5 Z" fill="#fff" />
      </svg>
      <span style={{
        fontFamily: "Pretendard, ui-sans-serif, system-ui, sans-serif",
        fontWeight: 800,
        fontSize: size * 0.72,
        letterSpacing: "-0.02em",
        color: "#1a1a1a",
      }}>
        쇼쇼
      </span>
    </div>
  );
}
