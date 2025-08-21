# 🎨 Camyvex Admin Dashboard

Bu dashboard, Camyvex uygulamasında AI Match özelliği ile üretilen GPT prompt'larını analiz etmek için tasarlanmıştır.

## 🚀 Kurulum ve Kullanım

### 1. Yerel Kullanım
```bash
# Admin dashboard klasörüne gidin
cd admin-dashboard

# Basit bir HTTP server başlatın
python3 -m http.server 8080
# veya
npx serve .
# veya
php -S localhost:8080
```

Tarayıcınızda `http://localhost:8080` adresine gidin.

### 2. Web Hosting
- `index.html` dosyasını herhangi bir web hosting servisine yükleyin
- Netlify, Vercel, GitHub Pages gibi ücretsiz servisler kullanabilirsiniz

## 📊 Özellikler

### İstatistikler
- **Total Jobs**: Toplam işlenen job sayısı
- **AI Match Uses**: AI Match özelliği kullanım sayısı  
- **Successful Jobs**: Başarılı job sayısı
- **Success Rate**: Başarı oranı

### Prompt Analizi
- GPT tarafından üretilen tüm prompt'ları görüntüleme
- Prompt detaylarını inceleme (karakter sayısı, tarih, durum)
- Arama ve filtreleme
- CSV formatında export

### Arama
- Job ID'ye göre arama
- User ID'ye göre arama  
- Prompt içeriğine göre arama
- Klavye kısayolu: `/` tuşu ile arama kutusuna odaklanma

## 🔒 Güvenlik

- Dashboard sadece read-only erişim sağlar
- Supabase RLS politikaları ile korunur
- Mobil uygulamada gizli değildir (App Store uyumlu)
- Admin erişimi için ayrı authentication gerekebilir

## 🛠️ Geliştirme

### Supabase Bağlantısı
Dashboard, `ai_prompt_analytics` view'ını kullanır:

```sql
-- Mevcut view
SELECT * FROM ai_prompt_analytics 
ORDER BY created_at DESC;
```

### Özelleştirme
- `index.html` dosyasını düzenleyerek görünümü değiştirebilirsiniz
- CSS stilleri dosya içinde tanımlıdır
- JavaScript fonksiyonları ile yeni özellikler ekleyebilirsiniz

## 📈 Optimizasyon İpuçları

1. **Başarılı Prompt'ları Analiz Edin**
   - Status = 'succeeded' olan job'ların prompt'larını inceleyin
   - Ortak pattern'leri belirleyin

2. **Başarısız Prompt'ları İnceleyin**
   - Status = 'failed' olan job'ların nedenlerini araştırın
   - GPT prompt'unu iyileştirmek için kullanın

3. **Prompt Uzunluğu**
   - Çok kısa veya çok uzun prompt'ların performansını karşılaştırın
   - Optimal uzunluk aralığını belirleyin

4. **Tema Analizi**
   - Hangi temaların daha çok AI Match kullandığını görün
   - Kullanıcı tercihlerini analiz edin

## 🔧 Sorun Giderme

### Veri Yüklenmiyor
- Supabase bağlantı bilgilerini kontrol edin
- RLS politikalarının doğru olduğundan emin olun
- Browser console'da hata mesajlarını kontrol edin

### Export Çalışmıyor
- Modern bir tarayıcı kullandığınızdan emin olun
- Pop-up blocker'ın kapalı olduğunu kontrol edin

## 📞 Destek

Dashboard ile ilgili sorunlar için:
1. Browser console'daki hata mesajlarını kontrol edin
2. Supabase Dashboard'da RLS politikalarını kontrol edin
3. Network sekmesinde API çağrılarını inceleyin