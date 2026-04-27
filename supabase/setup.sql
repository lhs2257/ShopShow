-- showcase-web products 테이블 생성
-- Supabase SQL Editor (https://app.supabase.com/project/ijmomdrrydhitngwwias/sql/new) 에서 실행

CREATE TABLE IF NOT EXISTS products (
  id            bigint PRIMARY KEY,
  title         text NOT NULL,
  product_name  text,
  thumbnail_url text,
  coupang_url   text,
  view_count    bigint DEFAULT 0,
  is_visible    boolean DEFAULT true,
  synced_at     timestamptz DEFAULT now()
);

-- 공개 읽기 허용 (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "누구나 읽기 가능" ON products
  FOR SELECT USING (is_visible = true);

CREATE POLICY "service_role 쓰기 가능" ON products
  FOR ALL USING (true);
