# Discord Bot Sales Platform

Gerçek ödeme entegrasyonuna hazır, modern ve üretime hazır bir Discord Bot Satış Platformu.

## 🚀 Özellikler

- **Responsive Tasarım**: Mobile-first Discord temasıyla (Blurple, Dark Gray)
- **Kimlik Doğrulama**: Supabase/Firebase Auth entegrasyonu
- **Sepet Yönetimi**: Zustand ile state management
- **Ödeme Entegrasyonu**: Stripe ve iyzico desteği
- **Admin Paneli**: Bot yönetimi ve fiyatlandırma
- **Müşteri Dashboard**: Satın alınan botlar ve yönetimi
- **TypeScript**: Tam tip güvenliği
- **Framer Motion**: Animasyonlar ve geçişler
- **Tailwind CSS**: Styling ve Dark Theme

## 📁 Klasör Yapısı

```
discord-bot-sales-platform/
├── app/
│   ├── layout.tsx              # Ana layout
│   ├── page.tsx                # Ana sayfa (Hero + Bots Grid)
│   ├── globals.css             # Global stiller
│   ├── auth/
│   │   ├── login/page.tsx       # Giriş sayfası
│   │   └── register/page.tsx    # Kayıt sayfası
│   ├── dashboard/
│   │   └── page.tsx             # Müşteri paneli
│   ├── admin/
│   │   └── page.tsx             # Admin paneli
│   ├── checkout/
│   │   ├── page.tsx             # Sepet ve ödeme
│   │   ├── success/page.tsx      # Ödeme başarılı
│   │   └── cancel/page.tsx       # Ödeme iptal
│   └── api/
│       ├── checkout/route.ts     # Checkout API
│       ├── webhooks/
│       │   ├── stripe/route.ts    # Stripe webhook
│       │   └── iyzico/route.ts    # iyzico webhook
│       ├── admin/stats/route.ts   # Admin istatistikleri
│       ├── purchases/route.ts     # Kullanıcı satın alımları
│       ├── user-bots/route.ts     # Kullanıcı botları
│       └── bots/route.ts          # Bot listesi
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── BotCard.tsx
│   │   ├── ProtectedRoute.tsx
│   ├── store/
│   │   ├── authStore.ts
│   │   └── cartStore.ts
│   ├── services/
│   │   ├── supabaseClient.ts
│   │   ├── stripeService.ts
│   │   └── iyzicoService.ts
│   ├── utils/
│   │   ├── auth.ts
│   │   ├── formatting.ts
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   └── middleware.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── .env.example
```

## 🛠️ Teknoloji Stack

- **Frontend**: React 18, Next.js 14 (App Router)
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Authentication**: Supabase / Firebase
- **Payments**: Stripe, iyzico
- **Language**: TypeScript
- **UI Components**: Custom Discord-themed components

## 📦 Kurulum

1. **Repository'yi klonlayın**:
```bash
git clone https://github.com/shadow2028-blip/discord-bot-sales-platform.git
cd discord-bot-sales-platform
```

2. **Bağımlılıkları yükleyin**:
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın**:
```bash
cp .env.example .env.local
```

`.env.local` dosyasını aşağıdaki bilgilerle doldurun:

```env
# Supabase (veya Firebase)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# iyzico (alternatif)
IYZICO_API_KEY=your_api_key
IYZICO_SECRET_KEY=your_secret_key

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Geliştirme sunucusunu başlatın**:
```bash
npm run dev
```

Açık: [http://localhost:3000](http://localhost:3000)

## 🔑 Ana Özellikler Açıklaması

### Ana Sayfa (`/`)
- Modern Hero bölümü animasyonlarla
- Bot Grid'i dinamik kartlarla
- Framer Motion animasyonları

### Kimlik Doğrulama (`/auth/login`, `/auth/register`)
- Supabase/Firebase entegrasyonu
- Form validasyonu
- JWT token yönetimi

### Müşteri Dashboard (`/dashboard`)
- Satın alınan botlar listesi
- Bot daveti linki
- İstatistikler

### Admin Paneli (`/admin`)
- Yeni bot ekleme formu
- Bot fiyatlandırması
- Bot silme/düzenleme

### Checkout (`/checkout`)
- Sepet görünümü
- Stripe/iyzico seçimi
- Payment Intent oluşturma

### Ödeme Sonuçları
- Başarı sayfası (`/checkout/success`)
- İptal sayfası (`/checkout/cancel`)

## 🔐 Güvenlik

- JWT tabanlı kimlik doğrulama
- Middleware koruması (Protected Routes)
- Environment değişkenler
- Webhook imza doğrulaması (Stripe/iyzico)
- CORS güvenliği

## 📚 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/api/checkout` | Ödeme başlatma |
| POST | `/api/webhooks/stripe` | Stripe webhook |
| POST | `/api/webhooks/iyzico` | iyzico webhook |
| GET | `/api/bots` | Bot listesi |
| GET | `/api/user-bots` | Kullanıcı botları |
| GET | `/api/purchases` | Kullanıcı satın alımları |
| GET | `/api/admin/stats` | Admin istatistikleri |

## 🎨 Tema Renkleri

- **Blurple**: `#5865F2` (Ana renk)
- **Dark**: `#1E1F22` (Arka plan)
- **Dark Gray**: `#2B2D31` (Kartlar)
- **Medium Gray**: `#313338` (Vurgular)
- **Green**: `#57F287` (Başarı)
- **Red**: `#ED4245` (Hata)
- **Yellow**: `#FED330` (Rating)

## 🚀 Production Hazırlığı

1. **Veritabanı Sütun Yapısı** (Supabase SQL):

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bots Table
CREATE TABLE bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  detailed_description TEXT,
  price DECIMAL(10, 2),
  currency VARCHAR(10),
  image_url VARCHAR(500),
  features TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Purchases Table
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  bot_id UUID REFERENCES bots(id),
  amount DECIMAL(10, 2),
  currency VARCHAR(10),
  status VARCHAR(20),
  stripe_payment_intent_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User Bots Table
CREATE TABLE user_bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  bot_id UUID REFERENCES bots(id),
  purchase_date TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active',
  invite_url VARCHAR(500)
);
```

2. **Deployment**:
```bash
npm run build
npm run start
```

3. **Environment Variables** (Production):
- Gerçek API anahtarlarını ayarlayın
- Webhook secretlerini yapılandırın
- Database bağlantı stringini güncelleyin

## 📝 Lisans

MIT

## 👨‍💻 Geliştirici

Shadow2028 - [GitHub](https://github.com/shadow2028-blip)

## 📞 Destek

Sorunlar veya sorularınız varsa, lütfen GitHub Issues'te oluşturun.

---

**Başarılı Projeler!** 🚀
