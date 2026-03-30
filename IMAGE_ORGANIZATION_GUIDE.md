# Image Organization Guide for Reign Ads Website

## Directory Structure

```
frontend/public/images/
├── logo/                          # Company logos (already exists)
│   ├── png logo blue.png
│   ├── png logo white.png
│   ├── svg logo blue.svg
│   └── svg logo white.svg
│
├── hero/                          # Hero section images
│   ├── hero-billboard-1.jpg       # Main hero billboard image
│   ├── hero-billboard-2.jpg       # Alternative hero image
│   └── hero-background.jpg        # Background texture/pattern
│
├── services/                      # Service category images
│   ├── billboards.jpg             # Billboard service showcase
│   ├── led-screens.jpg            # LED screen installations
│   ├── wall-branding.jpg          # Wall branding examples
│   ├── fleet-branding.jpg         # Vehicle branding
│   ├── fabrication.jpg            # Fabrication work
│   ├── large-format-print.jpg     # Printing services
│   ├── events-branding.jpg        # Event branding
│   └── interior-branding.jpg      # Interior branding
│
├── projects/                      # Portfolio/project images
│   ├── project-1-main.jpg         # Project 1 main image
│   ├── project-1-detail.jpg       # Project 1 detail shot
│   ├── project-2-main.jpg         # Project 2 main image
│   ├── project-2-detail.jpg       # Project 2 detail shot
│   ├── project-3-main.jpg
│   ├── project-3-detail.jpg
│   └── ...                        # Continue numbering
│
├── clients/                       # Client logos
│   ├── client-1.png               # Client logo 1 (transparent PNG)
│   ├── client-2.png               # Client logo 2
│   ├── client-3.png
│   └── ...                        # Continue numbering
│
├── team/                          # Team member photos
│   ├── ceo-ibrahim-kavuma.jpg     # CEO photo
│   ├── team-member-1.jpg          # Team member 1
│   ├── team-member-2.jpg
│   └── ...
│
├── about/                         # About page images
│   ├── company-office.jpg         # Office/facility photos
│   ├── team-group.jpg             # Team group photo
│   ├── workshop.jpg               # Workshop/production area
│   └── installation-team.jpg      # Installation crew
│
├── testimonials/                  # Testimonial images
│   ├── testimonial-1.jpg          # Client testimonial photo
│   ├── testimonial-2.jpg
│   └── ...
│
└── gallery/                       # General gallery images
    ├── installation-1.jpg         # Installation process
    ├── installation-2.jpg
    ├── before-after-1.jpg         # Before/after comparisons
    └── ...
```

## Naming Conventions

### General Rules
- Use lowercase letters only
- Use hyphens (-) instead of spaces or underscores
- Be descriptive but concise
- Include numbers for sequences (project-1, project-2, etc.)
- Use consistent file extensions (.jpg for photos, .png for logos/graphics with transparency)

### Examples
✅ GOOD:
- `billboard-kampala-road-main.jpg`
- `led-screen-installation-night.jpg`
- `client-logo-mtn.png`
- `project-5-detail.jpg`

❌ BAD:
- `IMG_1234.jpg`
- `Billboard Kampala Road.JPG`
- `led_screen.jpeg`
- `Project5Detail.jpg`

## Image Specifications & Requirements

### Hero Images (Full-Width Banners)
- **Optimal Dimensions**: 2560x1440px (2K resolution)
- **Minimum Dimensions**: 1920x1080px (Full HD)
- **Retina/4K Option**: 3840x2160px (for premium displays)
- **Format**: JPG (photos) or WebP (better compression)
- **Quality**: 85-92% (balance between quality and file size)
- **File Size**: 
  - Standard: 400-600KB
  - Retina: 800KB-1.2MB
- **Aspect Ratio**: 16:9 (widescreen)
- **DPI**: 72 DPI (web standard)
- **Color Space**: sRGB
- **Notes**: 
  - Use progressive JPEG for faster loading
  - Ensure important content is centered (safe zone)
  - Avoid text in images (use overlays instead)

### Service Images (Cards & Thumbnails)
- **Optimal Dimensions**: 1200x900px
- **Minimum Dimensions**: 800x600px
- **Retina Option**: 1600x1200px
- **Format**: JPG or WebP
- **Quality**: 80-85%
- **File Size**: 
  - Standard: 150-250KB
  - Retina: 300-400KB
- **Aspect Ratio**: 4:3 (standard) or 16:9 (widescreen)
- **DPI**: 72 DPI
- **Color Space**: sRGB
- **Notes**: 
  - Sharp focus on main subject
  - Good lighting and contrast
  - Avoid busy backgrounds

### Project/Portfolio Images
**Main/Featured Images**:
- **Optimal Dimensions**: 1920x1280px
- **Minimum Dimensions**: 1200x800px
- **Retina Option**: 2400x1600px
- **Format**: JPG or WebP
- **Quality**: 85-90% (showcase quality)
- **File Size**: 
  - Standard: 300-500KB
  - Retina: 600-800KB
- **Aspect Ratio**: 3:2 (photography standard)
- **DPI**: 72 DPI
- **Color Space**: sRGB

**Detail/Secondary Images**:
- **Optimal Dimensions**: 1200x900px
- **Minimum Dimensions**: 800x600px
- **Format**: JPG or WebP
- **Quality**: 80-85%
- **File Size**: 200-350KB
- **Aspect Ratio**: 4:3 or 3:2
- **DPI**: 72 DPI

**Gallery Thumbnails**:
- **Dimensions**: 600x400px
- **Format**: JPG or WebP
- **Quality**: 75-80%
- **File Size**: 50-100KB
- **Aspect Ratio**: 3:2

### Client Logos
- **Optimal Dimensions**: 800x800px (square) or maintain brand aspect ratio
- **Minimum Dimensions**: 400x400px
- **Maximum Dimensions**: 1000x1000px
- **Format**: PNG (with transparency) or SVG (vector, preferred)
- **Quality**: Maximum (100% for PNG, lossless)
- **File Size**: 
  - PNG: 50-150KB
  - SVG: 5-50KB
- **Background**: Transparent (alpha channel)
- **DPI**: 144 DPI (for sharp display on retina)
- **Color Space**: sRGB
- **Notes**: 
  - Provide white/light version for dark backgrounds
  - Ensure logo has padding/whitespace around it
  - SVG preferred for scalability

### Team Photos (Staff/Leadership)
- **Optimal Dimensions**: 800x800px (square)
- **Minimum Dimensions**: 600x600px
- **Retina Option**: 1200x1200px
- **Format**: JPG or WebP
- **Quality**: 85-90% (professional quality)
- **File Size**: 
  - Standard: 100-200KB
  - Retina: 200-350KB
- **Aspect Ratio**: 1:1 (square/circle crop)
- **DPI**: 72 DPI (144 DPI for retina)
- **Color Space**: sRGB
- **Notes**: 
  - Professional headshots preferred
  - Consistent lighting and background
  - Face should occupy 60-70% of frame
  - Neutral or branded background

### Testimonial Images (Client Photos)
- **Optimal Dimensions**: 600x600px (square)
- **Minimum Dimensions**: 400x400px
- **Retina Option**: 800x800px
- **Format**: JPG or WebP
- **Quality**: 80-85%
- **File Size**: 
  - Standard: 60-120KB
  - Retina: 120-200KB
- **Aspect Ratio**: 1:1 (square/circle crop)
- **DPI**: 72 DPI
- **Color Space**: sRGB
- **Notes**: 
  - Clear, well-lit faces
  - Professional or candid style
  - Consistent style across all testimonials

### About Page Images (Office/Facility)
- **Optimal Dimensions**: 1600x1200px
- **Minimum Dimensions**: 1200x900px
- **Format**: JPG or WebP
- **Quality**: 85-90%
- **File Size**: 300-500KB
- **Aspect Ratio**: 4:3 or 16:9
- **DPI**: 72 DPI
- **Notes**: 
  - Wide-angle shots for facilities
  - Good natural or professional lighting
  - Show scale and professionalism

### Background Images/Textures
- **Optimal Dimensions**: 1920x1080px or larger
- **Format**: JPG or WebP
- **Quality**: 70-80% (can be lower as they're often blurred)
- **File Size**: 200-400KB
- **Opacity**: Often used at 10-30% opacity
- **Notes**: 
  - Subtle patterns work best
  - Low contrast for readability
  - Can be heavily compressed

## Resolution & Display Guidelines

### Understanding Display Resolutions

**Standard Displays (1x)**:
- Most desktop monitors: 1920x1080 (Full HD)
- Tablets: 1024x768 to 2048x1536
- Mobile phones: 375x667 to 414x896 (logical pixels)

**Retina/High-DPI Displays (2x)**:
- MacBook Pro, iMac Retina
- iPhone, iPad Retina
- High-end Android devices
- Requires 2x image dimensions for sharp display

**4K/Ultra HD Displays (3x-4x)**:
- 4K monitors: 3840x2160
- Premium laptops and desktops
- Requires even larger images for optimal sharpness

### Responsive Image Strategy

**Provide Multiple Sizes** (Recommended):
```
hero-billboard-1.jpg       (1920x1080 - standard)
hero-billboard-1@2x.jpg    (3840x2160 - retina)
hero-billboard-1-mobile.jpg (750x1334 - mobile)
```

**Or Use Single Optimal Size**:
- Use 1.5x to 2x the display size
- Example: For 800px display width, use 1200-1600px image
- Browser will scale down, maintaining sharpness

### Image Sharpness Checklist

✅ **For Sharp, Clear Images**:
- [ ] Use optimal dimensions (not minimum)
- [ ] Shoot/export at high resolution
- [ ] Use proper lighting (avoid underexposed images)
- [ ] Ensure proper focus (no blur)
- [ ] Use tripod for product/billboard shots
- [ ] Shoot in RAW format when possible
- [ ] Apply subtle sharpening in post-processing
- [ ] Export at 85-92% quality for JPG
- [ ] Test on multiple devices before finalizing

❌ **Avoid These Issues**:
- [ ] Upscaling small images (causes pixelation)
- [ ] Over-compression (causes artifacts)
- [ ] Motion blur or out-of-focus shots
- [ ] Poor lighting (grainy/noisy images)
- [ ] Screenshots of images (quality loss)
- [ ] Saving JPG multiple times (generation loss)

## How to Prepare Images

### 1. Capture/Source High-Quality Images
- **Professional Photography**: Hire photographer for key images
- **High-Resolution Camera**: Minimum 12MP camera
- **Proper Lighting**: Natural light or professional lighting setup
- **Stable Shots**: Use tripod for sharpness
- **RAW Format**: Shoot in RAW for maximum editing flexibility

### 2. Edit & Enhance
- **Color Correction**: Adjust white balance, exposure, contrast
- **Cropping**: Crop to exact aspect ratios needed
- **Sharpening**: Apply subtle sharpening (not over-sharpening)
- **Retouching**: Remove distractions, clean up backgrounds
- **Consistency**: Match color tone across similar images

**Recommended Tools**:
- Adobe Lightroom (professional)
- Adobe Photoshop (advanced editing)
- Affinity Photo (affordable alternative)
- GIMP (free alternative)
- Canva (simple edits)

### 3. Resize to Specifications
- **Maintain Aspect Ratio**: Don't distort images
- **Downscale Only**: Never upscale (causes blur)
- **Use Quality Algorithms**: Bicubic or Lanczos resampling
- **Create Multiple Versions**: Standard and retina sizes

**Batch Resize Tools**:
- Adobe Photoshop (Actions/Batch)
- XnConvert (free, cross-platform)
- ImageMagick (command-line)
- Bulk Resize Photos (online)

### 4. Optimize & Compress
- **Lossless First**: Start with highest quality
- **Progressive JPEG**: Enable for faster perceived loading
- **Strip Metadata**: Remove EXIF data (privacy & file size)
- **Test Quality**: View at 100% zoom to check for artifacts
- **Target File Sizes**: Follow specifications above

**Optimization Tools**:
- **TinyPNG/TinyJPG**: Excellent compression (online)
- **Squoosh**: Google's image optimizer (online)
- **ImageOptim**: Mac app for optimization
- **RIOT**: Windows optimization tool
- **Kraken.io**: Bulk optimization (online)
- **ShortPixel**: WordPress plugin or API

### 5. Format Selection Guide

**JPG/JPEG** - Use for:
- Photographs
- Complex images with gradients
- Images with many colors
- When file size is critical
- No transparency needed

**PNG** - Use for:
- Logos with transparency
- Graphics with text
- Images with sharp edges
- When transparency is needed
- Screenshots with text

**WebP** - Use for:
- Modern browsers (95%+ support)
- Better compression than JPG
- Supports transparency like PNG
- Smaller file sizes (20-30% smaller)
- Recommended for new projects

**SVG** - Use for:
- Vector logos
- Icons and simple graphics
- Infinitely scalable
- Tiny file sizes
- When available from designer

### 6. File Naming Checklist
- [ ] Lowercase only
- [ ] Hyphens instead of spaces
- [ ] Descriptive name
- [ ] Include size indicator (@2x for retina)
- [ ] Proper extension
- [ ] No special characters
- [ ] Sequential numbering for series

**Examples**:
```
✅ billboard-kampala-road-main.jpg
✅ billboard-kampala-road-main@2x.jpg
✅ led-screen-night-view.webp
✅ client-logo-mtn.png
✅ team-member-john-doe.jpg

❌ IMG_1234.JPG
❌ Billboard Kampala Road.jpeg
❌ led_screen (1).jpg
❌ logo final FINAL v2.png
```

## Quality Assurance Checklist

Before uploading images, verify:

### Technical Quality
- [ ] Correct dimensions (optimal, not minimum)
- [ ] Proper aspect ratio maintained
- [ ] File size within limits
- [ ] Correct format (JPG/PNG/WebP/SVG)
- [ ] No visible compression artifacts
- [ ] Sharp and in focus
- [ ] Proper exposure and color balance
- [ ] No noise or grain (unless intentional)

### Content Quality
- [ ] Subject is clear and prominent
- [ ] Good composition (rule of thirds)
- [ ] Professional appearance
- [ ] Consistent style with other images
- [ ] No distracting elements
- [ ] Appropriate for brand image
- [ ] Copyright cleared/owned

### Web Optimization
- [ ] Optimized/compressed
- [ ] Metadata stripped
- [ ] Progressive JPEG enabled
- [ ] Tested on multiple devices
- [ ] Fast loading time
- [ ] Retina version provided (if needed)

## Testing Images

### Before Final Upload
1. **View at 100% zoom** - Check for sharpness
2. **Test on mobile** - Ensure clarity on small screens
3. **Test on retina display** - Check if sharp enough
4. **Check file size** - Ensure fast loading
5. **Verify colors** - Check on multiple monitors
6. **Test loading speed** - Use browser dev tools

### Tools for Testing
- **Google PageSpeed Insights**: Check image optimization
- **GTmetrix**: Analyze image sizes and loading
- **WebPageTest**: Test from different locations
- **Browser DevTools**: Check actual loaded sizes

## Usage in Code

### Current Logo Usage
```jsx
<img src="/images/logo/png logo white.png" alt="Reign Ads Logo" />
```

### Service Images
```jsx
<img src="/images/services/billboards.jpg" alt="Billboard Advertising Services" />
```

### Project Images
```jsx
<img src="/images/projects/project-1-main.jpg" alt="Project Name - Main View" />
```

### Client Logos
```jsx
<img src="/images/clients/client-1.png" alt="Client Name" />
```

### Hero Images
```jsx
<img src="/images/hero/hero-billboard-1.jpg" alt="Reign Ads Billboard" />
```

## Quick Reference: Where Each Image Type Goes

| Image Type | Folder | Used In | Optimal Size | Format | Max File Size |
|------------|--------|---------|--------------|--------|---------------|
| Company Logos | `/images/logo/` | Navbar, Footer, About | 800x800px | PNG/SVG | 150KB |
| Hero Banners | `/images/hero/` | Home Hero, Page Headers | 2560x1440px | JPG/WebP | 600KB |
| Service Photos | `/images/services/` | Services Page, Service Cards | 1200x900px | JPG/WebP | 250KB |
| Project Photos | `/images/projects/` | Portfolio, Home Featured | 1920x1280px | JPG/WebP | 500KB |
| Client Logos | `/images/clients/` | Clients Page, Home Clients | 800x800px | PNG/SVG | 150KB |
| Team Photos | `/images/team/` | About Page, Team Section | 800x800px | JPG/WebP | 200KB |
| Testimonials | `/images/testimonials/` | Home, About Testimonials | 600x600px | JPG/WebP | 120KB |
| General Gallery | `/images/gallery/` | Gallery, About, Process | 1600x1200px | JPG/WebP | 400KB |

## Batch Renaming Tips

### For Windows (PowerShell)
```powershell
# Rename all files in current directory
Get-ChildItem *.jpg | ForEach-Object -Begin { $count=1 } -Process { 
    Rename-Item $_ -NewName "project-$count-main.jpg"; $count++ 
}
```

### For Mac/Linux (Terminal)
```bash
# Rename all files in current directory
count=1
for file in *.jpg; do
    mv "$file" "project-$count-main.jpg"
    ((count++))
done
```

## Image Delivery Checklist

When providing images to me, please:
1. ✅ Organize them in folders matching the structure above
2. ✅ Rename them according to conventions
3. ✅ Optimize/compress them
4. ✅ Provide a list of what each image represents
5. ✅ Indicate which images are for which sections

## Example Image List Format

```
HERO IMAGES:
- hero-billboard-1.jpg → Main hero image showing billboard on highway
- hero-billboard-2.jpg → Alternative hero with LED screen at night

SERVICES:
- billboards.jpg → Double decker billboard on Kampala Road
- led-screens.jpg → LED screen installation at shopping mall
- wall-branding.jpg → Building wall branding for MTN

PROJECTS:
- project-1-main.jpg → MTN Billboard Campaign - Main view
- project-1-detail.jpg → MTN Billboard Campaign - Close-up
- project-2-main.jpg → Coca-Cola Fleet Branding - Full vehicle
- project-2-detail.jpg → Coca-Cola Fleet Branding - Detail shot

CLIENTS:
- client-mtn.png → MTN Uganda logo
- client-coca-cola.png → Coca-Cola logo
- client-airtel.png → Airtel logo
```

## Image Optimization Workflow

### Step-by-Step Process

1. **Capture/Collect** high-resolution images (2x final size)
2. **Edit** in photo editor (color, crop, retouch)
3. **Export** at optimal dimensions with high quality
4. **Optimize** using compression tools
5. **Rename** following naming conventions
6. **Organize** into correct folders
7. **Test** on multiple devices
8. **Upload** to project

### Recommended Settings for Export

**Adobe Photoshop**:
- File > Export > Save for Web (Legacy)
- Format: JPEG
- Quality: 80-85 (or "Very High")
- ☑ Progressive
- ☑ Optimized
- ☑ Convert to sRGB

**Adobe Lightroom**:
- Export > File Settings
- Format: JPEG
- Quality: 85
- Color Space: sRGB
- Resize to Fit: Long Edge (specify pixels)
- Sharpening: Screen, Standard

**Online Tools (TinyPNG, Squoosh)**:
- Upload high-quality image
- Adjust quality slider to 80-85%
- Download optimized version
- Compare before/after

## Common Issues & Solutions

### Issue: Images Look Blurry
**Solutions**:
- Use larger dimensions (1.5-2x display size)
- Ensure original image is sharp and in focus
- Don't upscale small images
- Export at higher quality (85-92%)
- Provide @2x retina versions

### Issue: File Sizes Too Large
**Solutions**:
- Compress using TinyPNG or Squoosh
- Reduce dimensions slightly
- Lower quality to 75-80% (test visually)
- Convert to WebP format
- Use progressive JPEG

### Issue: Colors Look Different on Website
**Solutions**:
- Export in sRGB color space (not Adobe RGB)
- Calibrate your monitor
- Test on multiple devices
- Adjust in photo editor before export

### Issue: Images Load Slowly
**Solutions**:
- Reduce file sizes (compress more)
- Use WebP format
- Implement lazy loading
- Provide smaller mobile versions
- Use CDN for image delivery

### Issue: Images Look Pixelated
**Solutions**:
- Use higher resolution source images
- Don't upscale images
- Export at 2x dimensions for retina
- Check if browser is scaling incorrectly
- Ensure proper aspect ratio

## Advanced Tips

### For Best Results

1. **Shoot in RAW**: Maximum editing flexibility
2. **Use Tripod**: Eliminates motion blur
3. **Golden Hour**: Best natural lighting (sunrise/sunset)
4. **Consistent Style**: Match color grading across images
5. **Professional Equipment**: Invest in good camera/lens
6. **Batch Processing**: Edit similar images together
7. **Version Control**: Keep original high-res files
8. **Regular Updates**: Refresh images periodically

### Performance Optimization

- **Lazy Loading**: Load images as user scrolls
- **Responsive Images**: Serve different sizes for different screens
- **CDN**: Use Content Delivery Network for faster loading
- **Caching**: Enable browser caching for images
- **Preloading**: Preload critical above-the-fold images
- **WebP with Fallback**: Serve WebP to supported browsers

### Accessibility

- **Alt Text**: Descriptive text for screen readers
- **Meaningful Names**: Descriptive file names
- **Contrast**: Ensure text over images is readable
- **File Size**: Consider users on slow connections
- **Responsive**: Images work on all screen sizes

## Notes
- All paths are relative to `frontend/public/`
- Images in `public/` folder are accessible via `/images/...` in the browser
- Always provide alt text for accessibility
- Provide 2x versions for retina displays (recommended)
- WebP format recommended for 20-30% smaller file sizes
- Progressive JPEG loads faster (shows low-res preview first)
- Test images on multiple devices before finalizing

## Need Help?
Just provide your images in any format, and I can:
1. Suggest proper naming and organization
2. Recommend optimal dimensions and formats
3. Advise on compression and optimization
4. Update the code to use them correctly
5. Provide specific guidance for your use case

**When Providing Images, Include**:
- What the image shows (description)
- Where it should be used (hero, service, project, etc.)
- Original dimensions and file size
- Any specific requirements or concerns


managing director
g m
cfo
head of ops
head of sales
creative lead
head of pdn

Admin



