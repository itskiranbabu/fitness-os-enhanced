# 🚀 FitnessOS Enhanced - Professional AI SaaS Platform

<div align="center">

![FitnessOS Enhanced](https://img.shields.io/badge/FitnessOS-Enhanced-6366f1?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

**The AI Operating System to Build, Launch & Grow a Fitness Business in Minutes**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

**FitnessOS Enhanced** is a production-ready, enterprise-grade SaaS platform that empowers fitness coaches to build, launch, and scale their businesses using advanced AI technology. This is a complete rewrite and enhancement of the original FitnessOS with professional features, real-time capabilities, and cutting-edge AI integrations.

### 🎯 What's New in Enhanced Version?

| Feature | Original | Enhanced |
|---------|----------|----------|
| **Framework** | React + Vite | Next.js 15 (App Router) |
| **AI Models** | Gemini only | Multi-model (Gemini, GPT-4, Claude) |
| **Database** | JSON + Supabase | Prisma + PostgreSQL |
| **Real-time** | Polling (5s) | WebSockets + Realtime |
| **Payments** | None | Stripe Subscriptions |
| **Analytics** | Basic | Advanced + Predictive |
| **CRM** | Simple | Pipeline + Sequences |
| **Testing** | None | Jest + Playwright |
| **Performance** | Good | Excellent (95+ Lighthouse) |

---

## ✨ Features

### 🤖 Advanced AI Capabilities

- **Multi-Model AI Support**
  - Google Gemini 2.0 for fast generation
  - OpenAI GPT-4 for complex reasoning
  - Anthropic Claude for long-form content
  - Automatic model selection based on task

- **AI Chat Assistant**
  - 24/7 business coaching
  - Strategy recommendations
  - Context-aware responses
  - Natural language commands

- **Predictive Analytics**
  - Client churn prediction
  - Revenue forecasting
  - Lead scoring (0-100)
  - Lifetime value estimation

- **Content Intelligence**
  - Auto-scheduling based on engagement
  - Hashtag recommendations
  - AI image generation
  - Video script creation

### 💼 Professional CRM

- **Pipeline Management**
  - Custom stages
  - Drag-and-drop kanban
  - Deal tracking
  - Revenue forecasting

- **Communication Hub**
  - Email sequences
  - SMS campaigns
  - WhatsApp integration
  - Call logging
  - Meeting scheduler

- **Client Portal**
  - Self-service dashboard
  - Progress tracking
  - Document sharing
  - Payment portal

### 🌐 Website Builder

- **High-Converting Templates**
  - AI-generated copy
  - Mobile-responsive
  - SEO optimized
  - A/B testing

- **Custom Domains**
  - SSL certificates
  - DNS management
  - CDN integration

- **Lead Capture**
  - Smart forms
  - Exit-intent popups
  - Chat widgets

### 📊 Analytics & Reporting

- **Real-time Dashboard**
  - Custom widgets
  - Drag-and-drop layout
  - Goal tracking
  - Comparative metrics

- **Advanced Analytics**
  - Cohort analysis
  - Retention curves
  - Attribution modeling
  - Funnel visualization

- **AI Insights**
  - Automated recommendations
  - Anomaly detection
  - Trend predictions

### 🔄 Automations

- **Visual Workflow Builder**
  - Drag-and-drop interface
  - Conditional logic
  - Multi-channel support

- **Smart Triggers**
  - Time-based
  - Event-based
  - Behavior-based
  - AI-suggested

- **A/B Testing**
  - Message variants
  - Send time optimization
  - Performance tracking

### 💳 Payments & Billing

- **Stripe Integration**
  - Subscription management
  - Invoice generation
  - Usage-based billing
  - Payment links

- **Pricing Tiers**
  - Starter: $29/mo
  - Pro: $79/mo
  - Agency: $199/mo

### 🔗 Integrations

- **Calendar**: Google Calendar, Outlook
- **Social Media**: Instagram, Facebook, TikTok, LinkedIn
- **Email**: Gmail, Outlook, SendGrid, Mailchimp
- **Automation**: Zapier, Make, n8n
- **Communication**: Twilio, WhatsApp Business

### 👥 Team Management

- **Multi-user Accounts**
  - Role-based permissions
  - Activity logs
  - Team analytics

- **White-Label Options**
  - Custom branding
  - Remove FitnessOS branding
  - Custom email templates

### 📱 Mobile & PWA

- **Progressive Web App**
  - Offline mode
  - Push notifications
  - Install prompt

- **Mobile Optimized**
  - Touch gestures
  - Camera integration
  - Responsive design

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Shadcn UI** - Component library
- **Zustand** - State management
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless functions
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Primary database
- **Supabase** - Auth & Realtime
- **Redis** - Caching (optional)

### AI & ML
- **Google Gemini 2.0** - Primary AI
- **OpenAI GPT-4** - Secondary AI
- **Anthropic Claude** - Alternative AI
- **Vercel AI SDK** - Unified interface

### Payments & Communications
- **Stripe** - Payment processing
- **Resend** - Transactional emails
- **Twilio** - SMS integration
- **WhatsApp Business API** - WhatsApp messaging

### DevOps & Monitoring
- **Vercel** - Hosting & deployment
- **GitHub Actions** - CI/CD
- **Sentry** - Error tracking
- **PostHog** - Product analytics
- **Vercel Analytics** - Performance monitoring

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or Supabase account)
- API keys for:
  - Google Gemini AI
  - Supabase
  - Stripe (for payments)
  - Resend (for emails)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fitness-os-enhanced.git
   cd fitness-os-enhanced
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your API keys (see [Configuration](#configuration))

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## ⚙️ Configuration

### Required Environment Variables

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI
GOOGLE_GEMINI_API_KEY=your_gemini_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

# Email
RESEND_API_KEY=your_resend_key
```

### Optional Environment Variables

```env
# Additional AI Models
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# SMS & WhatsApp
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
WHATSAPP_API_KEY=your_whatsapp_key

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
SENTRY_DSN=your_sentry_dsn
```

---

## 📖 Documentation

### Project Structure

```
fitness-os-enhanced/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── api/               # API routes
│   │   └── p/[slug]/          # Public sites
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn UI components
│   │   ├── dashboard/        # Dashboard components
│   │   └── shared/           # Shared components
│   ├── lib/                   # Utilities & services
│   │   ├── ai/               # AI integrations
│   │   ├── db/               # Database utilities
│   │   ├── email/            # Email service
│   │   └── stripe/           # Stripe integration
│   ├── hooks/                 # Custom React hooks
│   ├── stores/                # Zustand stores
│   └── types/                 # TypeScript types
├── prisma/
│   └── schema.prisma          # Database schema
└── public/                    # Static assets
```

### Key Concepts

#### 1. Multi-Model AI

The platform supports multiple AI models and automatically selects the best one for each task:

- **Gemini 2.0 Flash**: Fast content generation, social posts
- **GPT-4**: Complex reasoning, business strategy
- **Claude**: Long-form content, detailed analysis

#### 2. Real-time Updates

Uses Supabase Realtime for instant updates:
- New lead notifications
- Dashboard metrics
- Collaborative editing

#### 3. Predictive Analytics

AI-powered predictions for:
- Client churn risk (0-1 probability)
- Lead conversion score (0-100)
- Revenue forecasting
- Lifetime value estimation

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
# Or deploy via CLI
npm install -g vercel
vercel
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 📊 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s
- **Core Web Vitals**: All green

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Original FitnessOS by [@itskiranbabu](https://github.com/itskiranbabu)
- [Next.js](https://nextjs.org/) team
- [Vercel](https://vercel.com/) for hosting
- [Supabase](https://supabase.com/) for backend
- [Shadcn UI](https://ui.shadcn.com/) for components

---

## 📞 Support

- **Documentation**: [docs.fitnessos.ai](https://docs.fitnessos.ai)
- **Discord**: [Join our community](https://discord.gg/fitnessos)
- **Email**: support@fitnessos.ai
- **Twitter**: [@FitnessOS](https://twitter.com/fitnessos)

---

## 🗺️ Roadmap

- [x] Multi-model AI support
- [x] Real-time updates
- [x] Stripe integration
- [x] Advanced CRM
- [ ] Mobile apps (iOS/Android)
- [ ] API access
- [ ] Marketplace revenue sharing
- [ ] White-label reseller program
- [ ] AI voice assistant
- [ ] Video content generation

---

<div align="center">

**Built with ❤️ for fitness coaches worldwide**

[Get Started](https://fitnessos.ai) • [View Demo](https://demo.fitnessos.ai) • [Read Docs](https://docs.fitnessos.ai)

</div>
