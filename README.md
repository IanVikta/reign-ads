# Reign Ads - Outdoor Advertising Website

A modern, responsive website for Reign Ads Limited - Uganda's premier outdoor advertising agency.

## 🚀 Features

- **Modern Design**: Clean, professional interface with company branding
- **Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Components**: 3D hero section, testimonials slider, portfolio gallery
- **Quote System**: Integrated quote request with email notifications
- **Portfolio Showcase**: Dynamic portfolio with category filtering
- **Service Pages**: Comprehensive service listings with detailed information

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Swiper.js** for sliders
- **Leaflet** for maps
- **SweetAlert2** for notifications

### Backend
- **Laravel 11** (PHP framework)
- **MySQL** database
- **Laravel Sanctum** for API authentication
- **PHPMailer** for email functionality
- **CORS** enabled for frontend communication

## 📁 Project Structure

```
ReignAds/
├── frontend/          # React application
├── backend/           # Laravel API
├── .kiro/            # Kiro IDE specifications
└── docs/             # Documentation files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PHP (v8.1 or higher)
- Composer
- MySQL

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
# Configure your database in .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## 📧 Email Configuration

Configure SMTP settings in `backend/.env`:
```
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

## 🎨 Brand Colors

- Primary Blue: `#0220aa`
- Secondary Gold: `#ffd22a`

## 📱 Contact

**Reign Ads Limited**
- Website: [reignads.co.ug](https://reignads.co.ug)
- Email: info@reignads.co.ug
- Phone: +256 123 456 789

---
Built with ❤️ for Reign Ads Limited