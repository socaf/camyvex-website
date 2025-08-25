-- Website Content Management Tables

-- 1. Website Content Table
CREATE TABLE website_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, key)
);

-- 2. Features Table
CREATE TABLE features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Gallery Images Table
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  before_image_url TEXT,
  after_image_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Admin Users Table (Güvenlik için)
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for website content
CREATE POLICY "Public read access" ON website_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON features FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON gallery_images FOR SELECT USING (is_active = true);

-- Admin only write access (service role key gerekli)
CREATE POLICY "Admin write access" ON website_content FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin write access" ON features FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin write access" ON gallery_images FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin access only" ON admin_users FOR ALL USING (auth.role() = 'service_role');

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_website_content_updated_at BEFORE UPDATE ON website_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON features FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample Data
INSERT INTO website_content (section, key, value, type) VALUES
('hero', 'title', 'Transform Your Photos into Luxury Lifestyle Moments', 'text'),
('hero', 'subtitle', 'AI-powered photo enhancement that creates professional-quality luxury photos instantly', 'text'),
('about', 'title', 'About Camyvex', 'text'),
('about', 'description', 'We use cutting-edge AI technology to transform ordinary photos into extraordinary luxury lifestyle images.', 'text');

INSERT INTO features (title, description, icon, order_index) VALUES
('AI Photo Enhancement', 'Transform ordinary photos with advanced AI algorithms', 'sparkles', 1),
('Luxury Filters', 'Professional-grade filters for luxury lifestyle aesthetics', 'camera', 2),
('Instant Processing', 'Get results in seconds, not hours', 'lightning-bolt', 3),
('High Quality Output', '4K resolution with professional quality', 'photograph', 4);