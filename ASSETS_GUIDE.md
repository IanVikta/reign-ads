# Assets & Images Guide for Reign Ads Website

## ✅ Current Status

### Already Uploaded:
- ✅ Logo files (blue and white versions in PNG and SVG)
- ✅ Favicon configured (using blue logo)

### Still Needed:
- ❌ Hero section images/video
- ❌ CEO photo
- ❌ Service category images
- ❌ Portfolio project images
- ❌ Client logos

---

## 📁 Complete Directory Structure

```
frontend/
├── public/
│   ├── images/
│   │   ├── logo/                           ✅ UPLOADED
│   │   │   ├── png logo blue.png           ✅ Main blue logo
│   │   │   ├── png logo white.png          ✅ White logo for dark backgrounds
│   │   │   ├── svg logo blue.svg           ✅ Blue SVG version
│   │   │   └── svg logo white.svg          ✅ White SVG version
│   │   │
│   │   ├── hero/                           ❌ NEEDED
│   │   │   ├── hero-video.mp4              (Hero section video montage)
│   │   │   ├── hero-image-1.jpg            (Alternative: Static hero images)
│   │   │   ├── hero-image-2.jpg
│   │   │   └── hero-image-3.jpg
│   │   │
│   │   ├── about/                          ❌ NEEDED
│   │   │   ├── ceo-photo.jpg               (CEO Hajji Ibrahim Rayan Kavuma)
│   │   │   ├── team-photo.jpg              (Optional team photo)
│   │   │   ├── office-1.jpg                (Office/workspace photos)
│   │   │   └── office-2.jpg
│   │   │
│   │   ├── services/                       ❌ NEEDED (HIGH PRIORITY)
│   │   │   ├── billboards.jpg              (Spectacular billboards)
│   │   │   ├── led-screens.jpg             (LED screen installations)
│   │   │   ├── wall-branding.jpg           (Wall branding projects)
│   │   │   ├── fleet-branding.jpg          (Vehicle branding)
│   │   │   ├── fabrication.jpg             (3D letters, signage)
│   │   │   ├── printing.jpg                (Large format printing)
│   │   │   ├── events.jpg                  (Event branding)
│   │   │   └── interior.jpg                (Interior branding)
│   │   │
│   │   ├── portfolio/                      ❌ NEEDED (HIGH PRIORITY)
│   │   │   ├── billboard-kampala-road.jpg
│   │   │   ├── led-screen-downtown.jpg
│   │   │   ├── wall-branding-mall.jpg
│   │   │   ├── fleet-branding-trucks.jpg
│   │   │   ├── fabrication-3d-letters.jpg
│   │   │   ├── printing-banners.jpg
│   │   │   └── ... (15-30 project images recommended)
│   │   │
│   │   ├── clients/                        ❌ NEEDED
│   │   │   ├── client-logo-1.png
│   │   │   ├── client-logo-2.png
│   │   │   ├── client-logo-3.png
│   │   │   └── ... (20-50 client logos)
│   │   │
│   │   ├── testimonials/                   ❌ OPTIONAL
│   │   │   ├── testimonial-person-1.jpg
│   │   │   ├── testimonial-person-2.jpg
│   │   │   └── testimonial-person-3.jpg
│   │   │
│   │   └── backgrounds/                    ❌ OPTIONAL
│   │       ├── pattern-overlay.png
│   │       ├── texture.jpg
│   │       └── grid-pattern.png
```

---

## 🖼️ Logo Files - What to Upload

### Recommended: Upload ALL formats for flexibility

1. **PNG Format (REQUIRED)**
   - `reign-ads-logo.png` - Main logo with transparent background
   - `reign-ads-logo-white.png` - White version for dark backgrounds
   - `reign-ads-icon.png` - Icon/symbol only (for favicon)
   - Recommended size: 2000px width (high resolution)
   - Format: PNG-24 with transparency

2. **SVG Format (OPTIONAL but RECOMMENDED)**
   - Convert your Illustrator file to SVG
   - Best for web (scalable, small file size)
   - Place in: `frontend/public/images/logo/reign-ads-logo.svg`

3. **Favicon**
   - Create from your logo icon
   - Size: 512x512px PNG
   - Place in: `frontend/public/favicon.ico` (convert to .ico)
   - Also create: `frontend/public/images/logo/reign-ads-icon.png`

### How to Export from Illustrator:
1. **For PNG:**
   - File → Export → Export As
   - Format: PNG
   - Resolution: 300 PPI
   - Background: Transparent
   - Export at 2x or 3x size

2. **For SVG:**
   - File → Save As
   - Format: SVG
   - SVG Options: Presentation Attributes
   - Decimal Places: 2
   - Minify: Yes

---

## 📸 Image Specifications

### Hero Video
- **Format:** MP4 (H.264 codec)
- **Resolution:** 1920x1080 (Full HD)
- **Duration:** 10-30 seconds (looping)
- **Size:** Under 5MB (compressed)
- **Content:** Montage of billboards, LED screens, installations, etc.

### CEO Photo
- **Format:** JPG or PNG
- **Resolution:** 800x1000px minimum
- **Aspect Ratio:** 4:5 (portrait)
- **Size:** Under 500KB

### Service Images
- **Format:** JPG
- **Resolution:** 1200x800px
- **Aspect Ratio:** 3:2
- **Size:** Under 300KB each

### Portfolio Project Images
- **Format:** JPG
- **Resolution:** 1600x1200px minimum
- **Aspect Ratio:** 4:3 or 16:9
- **Size:** Under 500KB each
- **Naming:** Use descriptive names (e.g., `billboard-kampala-road.jpg`)

### Client Logos
- **Format:** PNG with transparency
- **Resolution:** 400x200px (or maintain aspect ratio)
- **Size:** Under 100KB each
- **Background:** Transparent
- **Color:** Preferably white or original colors

---

## 🎨 Image Optimization Tips

### Before Uploading:
1. **Compress images** using:
   - TinyPNG (https://tinypng.com)
   - ImageOptim (Mac)
   - Squoosh (https://squoosh.app)

2. **Resize to exact dimensions** needed
   - Don't upload 4000px images if you only need 1200px

3. **Use correct format:**
   - JPG for photos
   - PNG for logos/graphics with transparency
   - SVG for vector graphics
   - WebP for modern browsers (optional)

### Video Optimization:
```bash
# Use FFmpeg to compress video
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 1M -b:a 128k output.mp4
```

---

## 🔧 How to Use Images in Code

### Logo in Navbar:
```jsx
<img 
  src="/images/logo/reign-ads-logo-white.png" 
  alt="Reign Ads Logo" 
  className="h-12 w-auto"
/>
```

### Hero Video:
```jsx
<video autoPlay muted loop playsInline className="w-full h-full object-cover">
  <source src="/images/hero/hero-video.mp4" type="video/mp4" />
</video>
```

### CEO Photo:
```jsx
<img 
  src="/images/about/ceo-photo.jpg" 
  alt="Hajji Ibrahim Rayan Kavuma - CEO" 
  className="w-full h-full object-cover"
/>
```

### Service Images:
```jsx
<img 
  src="/images/services/billboards.jpg" 
  alt="Spectacular Billboards" 
  className="w-full h-64 object-cover"
/>
```

### Client Logos:
```jsx
<img 
  src="/images/clients/client-logo-1.png" 
  alt="Client Name" 
  className="h-16 w-auto grayscale hover:grayscale-0 transition-all"
/>
```

---

## 📋 Upload Checklist

### Essential (Upload First):
- [ ] Main logo PNG (transparent background)
- [ ] White logo PNG (for dark backgrounds)
- [ ] Favicon (512x512px PNG)
- [ ] CEO photo
- [ ] 3-5 portfolio project images

### Important (Upload Soon):
- [ ] Hero video montage
- [ ] 8 service category images
- [ ] 10-20 client logos
- [ ] More portfolio images

### Optional (Nice to Have):
- [ ] Logo SVG version
- [ ] Team photos
- [ ] Office photos
- [ ] Behind-the-scenes images
- [ ] Event photos

---

## 🎯 Current Placeholders to Replace

### In Components:
1. **Navbar** - Logo placeholder (text-based)
2. **Hero3D** - 3D billboard (can add logo texture)
3. **About Page** - CEO photo placeholder (colored box)
4. **Services** - Service icons (currently emojis)
5. **Portfolio** - Project images (none yet)
6. **Clients** - Client logos (currently emojis)

---

## 💡 Pro Tips

1. **Consistent Naming:**
   - Use lowercase
   - Use hyphens, not spaces
   - Be descriptive: `billboard-kampala-road.jpg` not `IMG_1234.jpg`

2. **Organize by Category:**
   - Keep related images in same folder
   - Makes maintenance easier

3. **Version Control:**
   - Don't commit large images to Git
   - Use `.gitignore` for large assets
   - Consider using a CDN for production

4. **Responsive Images:**
   - Provide multiple sizes if needed
   - Use `srcset` for different screen sizes
   - Consider WebP format with JPG fallback

5. **Accessibility:**
   - Always include descriptive `alt` text
   - Don't use images for text (use actual text)

---

## 🚀 Next Steps After Upload

1. Update Navbar with actual logo
2. Replace CEO photo placeholder
3. Add service images to cards
4. Populate portfolio with real projects
5. Add client logos to carousel
6. Add hero video
7. Update favicon

---

**Need Help?** 
After uploading images, I can help you integrate them into the components!
