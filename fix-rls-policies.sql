-- RLS Politikalarını Düzelt

-- Önce mevcut politikaları temizle
DROP POLICY IF EXISTS "Public read access" ON website_content;
DROP POLICY IF EXISTS "Admin write access" ON website_content;

-- Yeni politikalar oluştur
CREATE POLICY "Allow public read access" ON website_content FOR SELECT USING (true);

CREATE POLICY "Allow service role full access" ON website_content FOR ALL USING (
  auth.role() = 'service_role'
);

-- Aynısını diğer tablolar için de yap
DROP POLICY IF EXISTS "Public read access" ON features;
DROP POLICY IF EXISTS "Admin write access" ON features;

CREATE POLICY "Allow public read features" ON features FOR SELECT USING (is_active = true);
CREATE POLICY "Allow service role features" ON features FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Public read access" ON gallery_images;
DROP POLICY IF EXISTS "Admin write access" ON gallery_images;

CREATE POLICY "Allow public read gallery" ON gallery_images FOR SELECT USING (is_active = true);
CREATE POLICY "Allow service role gallery" ON gallery_images FOR ALL USING (auth.role() = 'service_role');