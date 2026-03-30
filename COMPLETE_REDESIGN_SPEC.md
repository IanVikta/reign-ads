# Reign Ads Website - Complete Redesign Specification

## Overview
Complete redesign of the Reign Ads website with focus on Uganda market, billboard advertising, and modern UX.

---

## 1. HERO SECTION ✅ (Already Updated)

### Design
- Full-screen cinematic hero
- Drone-style video background of billboards in busy city
- Dark overlay for text readability
- Smooth text animation on load

### Content
- **Headline**: "We Reign over visibility"
- **Subtext**: "East Africa's most innovative outdoor advertising agency.
Taking your brand places since 2015."
- **Primary CTA**: Request Advertising Space
- **Secondary CTA**: View Billboard Locations

### Animated Statistics
- 70+ Billboard Locations
- 20+ Corporate Clients
- 10M+ Monthly Impressions

### Technology
- Framer Motion for animations
- Parallax scrolling
- Counter animations

**Status**: Hero section already created with similar features. Needs text updates.

---

## 2. TRUSTED BY / CLIENT LOGOS

### Design
- Horizontal scrolling section
- Clean white/light background
- Smooth infinite scroll

### Clients to Display
- LEDON
- KFC
- CJ'S
- Nile Special
- Uganda Breweries
- Pepsi
- Stanbic Bank
- Safaricom

### Technology
- SwiperJS for smooth scrolling
- Auto-play with pause on hover
- Responsive grid fallback

### File Structure
```
frontend/public/images/clients/
├── mtn.png
├── airtel.png
├── coca-cola.png
├── nile-special.png
├── uganda-breweries.png
├── pepsi.png
├── stanbic.png
└── safaricom.png
```

---

## 3. ABOUT REIGN ADS

### Design
- Split layout (50/50)
- Left: Large billboard highway image
- Right: Content with scroll animations

### Content
- **Heading**: "Uganda's Premier Outdoor Advertising Partner"
- **Text**: "Reign Ads provides strategic outdoor advertising solutions across Uganda. Our premium billboard locations and creative branding services help businesses connect with millions of potential customers every day."
- **Button**: Learn More About Us

### Animations
- Image slides in from left
- Text fades in from right
- Staggered paragraph animations

---

## 4. SERVICES SECTION

### Design
- Modern grid layout (3 columns on desktop, 2 on tablet, 1 on mobile)
- Animated service cards
- Icon + Title + Description
- Hover effects (lift + glow)

### Services

1. **Billboard Advertising**
   - Icon: 🏗️
   - Description: Large format roadside billboards positioned in high-traffic areas.

2. **Rooftop Advertising**
   - Icon: 🏢
   - Description: High visibility rooftop placements in major city centers.

3. **Street poles**
   - Icon: 🌉
   - Description: Strategic street pole placements across busy highways.

4. **Taxi & Vehicle Branding**
   - Icon: 🚕
   - Description: Mobile advertising solutions across urban transport networks.

5. **Digital LED Screens**
   - Icon: 📺
   - Description: Dynamic digital outdoor advertising displays.

6. **Large Format Printing**
   - Icon: 🖨️
   - Description: High quality branding materials for outdoor campaigns.

### Animations
- Cards animate when entering viewport
- Hover: Scale up + shadow
- Icon rotates on hover

---

## 5. BILLBOARD LOCATIONS PREVIEW

### Design
- Interactive map section
- Map with location markers
- Popup on marker click

### Locations to Display
- **Kampala** (Primary - most billboards)
- **Entebbe** (Airport route)
- **Jinja** (Industrial hub)
- **Mbarara** (Western region)
- **Gulu** (Northern region)
- **Masaka** (Central region)

### Popup Content
- Billboard image
- Location name
- Size (e.g., 10x12m)
- Traffic level (High/Medium)
- Availability status

### Technology
- Leaflet.js or Mapbox for interactive map
- Custom markers with Reign Ads branding
- Responsive map container

### Button
- "Explore All Billboard Locations" → Links to dedicated locations page

---

## 6. FEATURED CAMPAIGNS / PORTFOLIO

### Design
- Portfolio grid (2 columns on desktop, 1 on mobile)
- Large campaign images
- Hover overlay with details

### Example Campaigns

1. **MTN Highway Billboard**
   - Image: MTN billboard on highway
   - Client: MTN Uganda
   - Description: Major highway campaign reaching 2M+ monthly viewers

2. **Coca-Cola City Campaign**
   - Image: Coca-Cola rooftop billboard
   - Client: Coca-Cola
   - Description: City center domination across 15 locations

3. **Airtel Bridge Banner**
   - Image: Airtel bridge banner
   - Client: Airtel Uganda
   - Description: Strategic bridge placement on Kampala-Entebbe road

4. **Nile Special Rooftop Billboard**
   - Image: Nile Special rooftop
   - Client: Uganda Breweries
   - Description: Premium rooftop placement in downtown Kampala

### Hover Effect
- Dark overlay appears
- Campaign details slide up
- "View Case Study" button appears

### Button
- "View Full Portfolio" → Links to portfolio page

---

## 7. BILLBOARD INVENTORY PREVIEW

### Design
- Modern table with alternating row colors
- Responsive (cards on mobile)
- Status badges (Available/Booked)

### Table Columns
- Location
- Billboard Size
- Traffic Level
- Status

### Example Data
```
| Location        | Size   | Traffic Level | Status    |
|----------------|--------|---------------|-----------|
| Kampala Road   | 10x12m | High Traffic  | Available |
| Jinja Road     | 8x10m  | High Traffic  | Booked    |
| Entebbe Road   | 12x8m  | High Traffic  | Available |
| Mbarara Road   | 10x10m | Medium Traffic| Available |
| Gulu Highway   | 8x12m  | Medium Traffic| Booked    |
```

### Features
- Search/filter by location
- Sort by traffic level
- Status color coding (Green = Available, Red = Booked)

### Button
- "View Full Inventory" → Links to inventory page

---

## 8. TESTIMONIALS

### Design
- Testimonial slider
- Large quote with client photo
- Company logo
- Navigation arrows + dots

### Example Testimonials

1. **Sarah Nakato - Marketing Director, MTN Uganda**
   - Quote: "Reign Ads helped our campaign reach millions across Kampala. Their billboard locations are unmatched."
   - Photo: Professional headshot
   - Company: MTN Uganda

2. **James Okello - Brand Manager, Coca-Cola**
   - Quote: "The strategic placement and quality of service from Reign Ads exceeded our expectations. Highly recommended."
   - Photo: Professional headshot
   - Company: Coca-Cola East Africa

3. **Grace Nambi - CEO, Local Business**
   - Quote: "As a local business, Reign Ads made outdoor advertising accessible and effective for us. Great ROI!"
   - Photo: Professional headshot
   - Company: Nambi Enterprises

### Technology
- SwiperJS slider
- Auto-play with 5-second intervals
- Smooth transitions
- Pause on hover

---

## 9. CALL TO ACTION SECTION

### Design
- Full-width section
- Large billboard background image
- Dark overlay (70% opacity)
- Centered content

### Content
- **Headline**: "Ready to Put Your Brand in the Spotlight?"
- **Subtext**: "Secure premium advertising space across Uganda today."
- **Button**: Request Advertising Space (Large, prominent)

### Styling
- Bold, large typography
- Gold/yellow CTA button
- Parallax background effect

---

## 10. BLOG PREVIEW

### Design
- 3-column grid (1 column on mobile)
- Featured image + title + date + excerpt
- "Read More" link

### Example Posts

1. **How Billboard Advertising Still Dominates Brand Awareness**
   - Date: March 1, 2026
   - Excerpt: "Despite digital marketing growth, billboard advertising remains one of the most effective..."
   - Image: Billboard at sunset

2. **Top Advertising Locations in Kampala**
   - Date: February 28, 2026
   - Excerpt: "Discover the most strategic billboard locations in Uganda's capital city..."
   - Image: Kampala cityscape

3. **Outdoor Advertising Trends in Africa**
   - Date: February 25, 2026
   - Excerpt: "The outdoor advertising landscape in Africa is evolving rapidly..."
   - Image: Modern LED billboard

### Button
- "View All Articles" → Links to blog page

---

## 11. FOOTER (Already Exists - Needs Updates)

### Sections

**Column 1: Company Info**
- Reign Ads logo
- Tagline: "Taking Your Brand Places"
- Brief description
- Social media icons

**Column 2: Quick Links**
- Home
- About Us
- Services
- Portfolio
- Billboard Locations
- Contact

**Column 3: Services**
- Billboard Advertising
- Rooftop Advertising
- Bridge Banners
- Vehicle Branding
- LED Screens
- Large Format Printing

**Column 4: Contact**
- Address: Kampala, Uganda
- Email: info@reignads.co.ug
- Phone: +256 706 829 331
- Business Hours: Mon-Fri, 8AM-6PM

### Social Media
- Facebook
- Instagram
- LinkedIn
- Twitter

### Bottom Bar
- © 2026 Reign Ads Limited. All Rights Reserved.
- Privacy Policy | Terms of Service

---

## TECHNICAL REQUIREMENTS

### Dependencies to Install
```bash
npm install swiper leaflet react-leaflet
```

### Image Requirements

**Hero Video**
- Format: MP4
- Resolution: 1920x1080 minimum
- Duration: 10-30 seconds loop
- Content: Drone footage of billboards in Kampala

**Client Logos**
- Format: PNG with transparency
- Size: 200x200px
- Background: Transparent

**Billboard Images**
- Format: JPG/WebP
- Resolution: 1200x800px minimum
- Quality: High (85-90%)

**Campaign Images**
- Format: JPG/WebP
- Resolution: 1920x1280px
- Quality: High (85-90%)

**Blog Images**
- Format: JPG/WebP
- Resolution: 800x600px
- Quality: Medium-High (80%)

### Color Scheme (Existing)
- Primary: Blue (#3B82F6, #1E40AF)
- Accent: Gold (#D4AF37)
- Background: Black (#0a0a0a, #111)
- Text: White with opacity variations

### Typography (Existing)
- Headings: Display font (bold, black weights)
- Body: Sans-serif
- Mono: For labels and badges

---

## IMPLEMENTATION PRIORITY

### Phase 1 (Immediate)
1. ✅ Hero Section (Already done - needs text updates)
2. Client Logos Section
3. About Section
4. Services Section

### Phase 2
5. Billboard Locations Map
6. Featured Campaigns
7. Testimonials

### Phase 3
8. Billboard Inventory Table
9. Blog Preview
10. CTA Section
11. Footer Updates

---

## NEXT STEPS

1. **Update Hero Section** - Change text to Uganda-focused content
2. **Create Client Logos Component** - Implement SwiperJS slider
3. **Build About Section** - Split layout with animations
4. **Develop Services Grid** - 6 service cards with hover effects
5. **Integrate Map** - Interactive billboard locations
6. **Portfolio Grid** - Campaign showcase
7. **Testimonials Slider** - Client quotes
8. **Inventory Table** - Available billboards
9. **Blog Cards** - Latest articles
10. **Update Footer** - Uganda contact info

---

## FILES TO CREATE/UPDATE

### New Components
- `ClientLogos.jsx` - Logo slider
- `AboutSection.jsx` - Split layout about
- `ServicesGrid.jsx` - Service cards
- `LocationsMap.jsx` - Interactive map
- `CampaignsGrid.jsx` - Portfolio showcase
- `TestimonialsSlider.jsx` - Client testimonials
- `InventoryTable.jsx` - Billboard inventory
- `BlogPreview.jsx` - Blog cards
- `CTASection.jsx` - Call to action

### Update Existing
- `Hero3D.jsx` - Update text content
- `Footer.jsx` - Update contact info
- `Home.jsx` - Integrate all new sections

---

## CONTENT UPDATES NEEDED

### From Client
- [ ] Actual client logos (MTN, Airtel, etc.)
- [ ] Real billboard photos
- [ ] Campaign case study images
- [ ] Testimonial photos and quotes
- [ ] Blog post content
- [ ] Exact billboard locations with coordinates
- [ ] Current inventory data
- [ ] Hero video footage

### Placeholder Content
- Using Unsplash images temporarily
- Generic testimonials
- Sample blog posts
- Approximate map locations

---

This specification provides a complete roadmap for the redesign. Ready to implement?
