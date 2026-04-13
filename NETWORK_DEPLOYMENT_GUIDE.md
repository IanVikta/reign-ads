# Network Deployment Guide for Reign Ads Website

## Quick Start (Development)

### Option 1: Using Laravel's Built-in Server
1. **Run the network startup script:**
   ```bash
   # Double-click or run:
   start-network-servers.bat
   ```

2. **Configure Windows Firewall (if needed):**
   ```bash
   # Run as Administrator:
   configure-firewall.bat
   ```

3. **Access from any device on your network:**
   - Website: `http://192.168.1.8:5173`
   - Admin Dashboard: `http://192.168.1.8:5173/admin/dashboard`
   - API: `http://192.168.1.8:8000/api`

---

## Option 2: Using XAMPP (Production-like)

### Step 1: Move Backend to XAMPP
1. **Copy backend files to XAMPP:**
   ```bash
   # Copy entire backend folder to:
   C:\xampp\htdocs\reignads-api\
   ```

2. **Update .env file:**
   ```env
   APP_URL=http://192.168.1.8/reignads-api/public
   DB_HOST=127.0.0.1
   DB_DATABASE=reignads_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```

3. **Create Virtual Host (Optional):**
   ```apache
   # Add to C:\xampp\apache\conf\extra\httpd-vhosts.conf
   <VirtualHost *:80>
       DocumentRoot "C:/xampp/htdocs/reignads-api/public"
       ServerName reignads-api.local
       ServerAlias 192.168.1.8
   </VirtualHost>
   ```

### Step 2: Update Frontend Configuration
```env
# frontend/.env
VITE_API_URL=http://192.168.1.8/reignads-api/public/api
```

### Step 3: Build Frontend for Production
```bash
cd frontend
npm run build
```

### Step 4: Serve Frontend via XAMPP
```bash
# Copy build files to:
C:\xampp\htdocs\reignads\
```

---

## Network Access Configuration

### Current Network Settings:
- **Your IP Address:** `192.168.1.8`
- **Backend Port:** `8000` (Laravel) or `80` (XAMPP)
- **Frontend Port:** `5173` (Dev) or `80` (Production)

### Firewall Ports to Open:
- **Port 8000:** Laravel backend
- **Port 5173:** React development server
- **Port 80:** XAMPP (if using)
- **Port 3306:** MySQL (if external access needed)

### CORS Configuration:
```php
// backend/config/cors.php
'allowed_origins' => [
    'http://localhost:5173',
    'http://192.168.1.8:5173',
    'http://192.168.1.8',
    'http://192.168.1.8:3000',
    'http://192.168.1.8:4173'
],
```

---

## Testing Network Access

### From Another Device:
1. **Connect to same WiFi network**
2. **Open browser and visit:**
   - `http://192.168.1.8:5173` (Development)
   - `http://192.168.1.8` (Production via XAMPP)

### Troubleshooting:
1. **Check Windows Firewall:**
   - Run `configure-firewall.bat` as Administrator
   
2. **Check Network Connectivity:**
   ```bash
   # From another device, ping your computer:
   ping 192.168.1.8
   ```

3. **Check if ports are listening:**
   ```bash
   netstat -an | findstr :8000
   netstat -an | findstr :5173
   ```

---

## Mobile Testing

### Access from Phone/Tablet:
1. **Connect to same WiFi**
2. **Visit:** `http://192.168.1.8:5173`
3. **Test all features:**
   - Portfolio loading
   - Blog posts
   - Contact forms
   - Admin dashboard

### QR Code for Easy Access:
Generate QR codes for:
- Website: `http://192.168.1.8:5173`
- Admin: `http://192.168.1.8:5173/admin/dashboard`

---

## Production Deployment Notes

### For Live Server Deployment:
1. **Use proper domain name**
2. **Configure SSL certificates**
3. **Use production database**
4. **Set up proper web server (Apache/Nginx)**
5. **Configure environment variables**
6. **Set up automated backups**

### Environment Variables for Production:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
DB_HOST=your-db-host
DB_DATABASE=your-production-db
MAIL_MAILER=smtp
# ... other production settings
```

---

## Security Considerations

### Development Network Access:
- ✅ Safe for local network testing
- ✅ Good for client demos
- ⚠️ Don't expose to internet without security

### Production Deployment:
- 🔒 Use HTTPS
- 🔒 Secure database credentials
- 🔒 Configure proper firewall rules
- 🔒 Regular security updates
- 🔒 Backup strategies