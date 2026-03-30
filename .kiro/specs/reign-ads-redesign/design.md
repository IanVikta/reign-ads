# Design Document: Reign Ads Website Redesign

## Overview

The Reign Ads website redesign creates a modern, interactive showcase for Uganda's premier outdoor advertising agency. The design emphasizes visual impact through cinematic animations, interactive maps, and dynamic content displays while maintaining excellent performance and mobile responsiveness.

The architecture follows a component-based approach using React, with reusable UI components for each major section. The design leverages modern web technologies including Framer Motion for animations, Leaflet for interactive maps, and Swiper for smooth content sliders.

## Architecture

### Technology Stack

- **Frontend Framework**: React 18+ with Vite
- **Styling**: TailwindCSS for utility-first styling
- **Animations**: Framer Motion for declarative animations
- **Sliders**: SwiperJS for touch-enabled carousels
- **Maps**: Leaflet with React-Leaflet wrapper
- **State Management**: React hooks (useState, useEffect, useContext)
- **Routing**: React Router for navigation

### Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Hero3D.jsx (existing - update text)
│   │   ├── ClientLogos.jsx (new)
│   │   ├── AboutSection.jsx (new)
│   │   ├── ServicesGrid.jsx (new)
│   │   ├── LocationsMap.jsx (new)
│   │   ├── CampaignsGrid.jsx (new)
│   │   ├── InventoryTable.jsx (new)
│   │   ├── TestimonialsSlider.jsx (new)
│   │   ├── CTASection.jsx (new)
│   │   ├── BlogPreview.jsx (new)
│   │   ├── Navbar.jsx (existing)
│   │   ├── Footer.jsx (existing - update contact)
│   │   └── ScrollReveal.jsx (existing)
│   ├── pages/
│   │   └── Home.jsx (update to integrate new components)
│   ├── data/
│   │   ├── services.js
│   │   ├── locations.js
│   │   ├── campaigns.js
│   │   ├── testimonials.js
│   │   ├── inventory.js
│   │   └── blogPosts.js
│   └── utils/
│       └── animations.js
└── public/
    ├── images/
    │   ├── clients/
    │   ├── billboards/
    │   ├── campaigns/
    │   └── blog/
    └── videos/
        └── hero-background.mp4
```

## Components and Interfaces

### 1. Hero3D Component (Update Existing)

**Purpose**: Full-screen cinematic hero section with video background and animated statistics.

**Props**:
```typescript
interface Hero3DProps {
  videoSrc: string;
  headline: string;
  subtext: string;
  statistics: Array<{
    value: string;
    label: string;
  }>;
  primaryCTA: {
    text: string;
    link: string;
  };
  secondaryCTA: {
    text: string;
    link: string;
  };
}
```

**Implementation Details**:
- Use HTML5 video element with autoplay, loop, and muted attributes
- Apply dark overlay (rgba(0, 0, 0, 0.6)) over video for text readability
- Animate headline with fade-in and slide-up effect (Framer Motion)
- Implement counter animation for statistics using custom hook
- Position CTAs with flexbox, style with gradient backgrounds
- Ensure video loads with poster image placeholder

### 2. ClientLogos Component

**Purpose**: Horizontal infinite scrolling showcase of client logos.

**Props**:
```typescript
interface ClientLogosProps {
  logos: Array<{
    id: string;
    name: string;
    imageSrc: string;
    alt: string;
  }>;
  scrollSpeed?: number; // default: 30 seconds
}
```

**Implementation Details**:
- Use SwiperJS with autoplay and loop enabled
- Configure slidesPerView: 'auto' for responsive display
- Set spaceBetween: 40 for consistent spacing
- Implement pauseOnHover: true for user control
- Add CSS filter: grayscale(100%) with hover transition to color
- Fallback to CSS Grid on mobile (2x4 grid)

### 3. AboutSection Component

**Purpose**: Split layout showcasing company background with image and text.

**Props**:
```typescript
interface AboutSectionProps {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  content: string;
  ctaText: string;
  ctaLink: string;
}
```

**Implementation Details**:
- Use CSS Grid with 2 columns (1fr 1fr) on desktop, 1 column on mobile
- Wrap in ScrollReveal component for viewport detection
- Animate image with translateX(-100px) to translateX(0) on scroll
- Animate text with opacity 0 to 1 and translateX(100px) to translateX(0)
- Apply stagger delay of 0.2s between heading, content, and CTA
- Use aspect-ratio: 16/9 for image container

### 4. ServicesGrid Component

**Purpose**: Responsive grid displaying 6 advertising service offerings.

**Props**:
```typescript
interface Service {
  id: string;
  icon: string; // emoji or icon component
  title: string;
  description: string;
}

interface ServicesGridProps {
  services: Service[];
}
```

**Implementation Details**:
- Use CSS Grid with grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
- Wrap each card in motion.div for scroll animations
- Apply stagger animation with delay based on index
- Hover effect: transform: translateY(-8px) and box-shadow increase
- Icon animation: rotate(360deg) on card hover
- Card styling: gradient border, backdrop-blur background
- Responsive: 3 columns desktop, 2 tablet, 1 mobile

### 5. LocationsMap Component

**Purpose**: Interactive map showing billboard locations across Uganda.

**Props**:
```typescript
interface Location {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lng]
  billboard: {
    imageSrc: string;
    size: string;
    trafficLevel: 'High' | 'Medium' | 'Low';
    status: 'Available' | 'Booked';
  };
}

interface LocationsMapProps {
  locations: Location[];
  center: [number, number]; // Uganda center: [1.3733, 32.2903]
  zoom?: number; // default: 7
}
```

**Implementation Details**:
- Use React-Leaflet with MapContainer, TileLayer, Marker, Popup
- Configure OpenStreetMap tiles: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
- Create custom marker icon with Reign Ads branding (blue pin with gold accent)
- Popup content: billboard image, location name, size, traffic level, status badge
- Status badge styling: green background for Available, red for Booked
- Add zoom controls and attribution
- Set maxBounds to Uganda boundaries to prevent excessive panning
- Mobile: reduce initial zoom, enable touch gestures

### 6. CampaignsGrid Component

**Purpose**: Portfolio grid showcasing successful advertising campaigns.

**Props**:
```typescript
interface Campaign {
  id: string;
  imageSrc: string;
  client: string;
  title: string;
  description: string;
  caseStudyLink?: string;
}

interface CampaignsGridProps {
  campaigns: Campaign[];
}
```

**Implementation Details**:
- Use CSS Grid with 2 columns on desktop, 1 on mobile
- Each campaign card has aspect-ratio: 16/9
- Overlay implementation: absolute positioned div with opacity 0, hover opacity 1
- Overlay background: rgba(0, 0, 0, 0.85)
- Overlay content: client name, description, CTA button
- Animate overlay with transition: all 0.3s ease
- Image: object-fit: cover for consistent sizing
- Add "View Case Study" button that appears on hover

### 7. InventoryTable Component

**Purpose**: Tabular display of available billboard inventory.

**Props**:
```typescript
interface InventoryItem {
  id: string;
  location: string;
  size: string;
  trafficLevel: 'High Traffic' | 'Medium Traffic' | 'Low Traffic';
  status: 'Available' | 'Booked';
}

interface InventoryTableProps {
  inventory: InventoryItem[];
  searchable?: boolean;
}
```

**Implementation Details**:
- Desktop: HTML table with styled thead and tbody
- Table styling: alternating row colors, hover effect on rows
- Status column: badge component with conditional styling
  - Available: bg-green-500/20, text-green-400, border-green-500
  - Booked: bg-red-500/20, text-red-400, border-red-500
- Mobile: transform to card layout using CSS Grid
- Each card displays all fields vertically
- Optional search: filter by location using input field
- Search implementation: useState for query, filter inventory array

### 8. TestimonialsSlider Component

**Purpose**: Carousel displaying client testimonials with photos.

**Props**:
```typescript
interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientTitle: string;
  company: string;
  photoSrc: string;
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
  autoplayDelay?: number; // default: 5000ms
}
```

**Implementation Details**:
- Use SwiperJS with Pagination and Navigation modules
- Configure autoplay with delay: 5000, pauseOnMouseEnter: true
- Slide layout: centered content with max-width: 800px
- Quote styling: large text (text-2xl), italic, with quotation marks
- Client photo: circular (rounded-full), 80x80px
- Company logo: display below client info
- Navigation: custom styled arrows (blue with gold hover)
- Pagination: dots below slider (gold active dot)

### 9. CTASection Component

**Purpose**: Full-width call-to-action with parallax background.

**Props**:
```typescript
interface CTASectionProps {
  backgroundImage: string;
  headline: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
}
```

**Implementation Details**:
- Container: relative positioning, min-height: 400px
- Background: fixed attachment for parallax effect
- Overlay: absolute positioned div with bg-black/70
- Content: centered with flexbox, z-index above overlay
- Headline: text-5xl, font-bold, text-white
- CTA button: large padding, gold background, hover scale effect
- Use Framer Motion for scroll-based parallax (translateY based on scroll)

### 10. BlogPreview Component

**Purpose**: Grid displaying recent blog articles.

**Props**:
```typescript
interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  imageSrc: string;
  slug: string;
}

interface BlogPreviewProps {
  posts: BlogPost[];
  limit?: number; // default: 3
}
```

**Implementation Details**:
- Use CSS Grid with 3 columns on desktop, 1 on mobile
- Card structure: image container + content container
- Image: aspect-ratio: 16/9, object-fit: cover
- Date: small text, text-gray-400
- Title: text-xl, font-semibold, line-clamp-2
- Excerpt: text-gray-300, line-clamp-3
- "Read More" link: text-blue-400, hover:text-gold-400
- Card hover: lift effect (translateY(-4px))

### 11. Footer Component (Update Existing)

**Purpose**: Site-wide footer with navigation and contact information.

**Updates Required**:
```typescript
const ugandaContact = {
  address: "Kampala, Uganda",
  email: "info@reignads.co.ug",
  phone: "+256 706 829 331",
  hours: "Mon-Fri, 8AM-6PM"
};
```

**Implementation Details**:
- Update contact information in existing Footer component
- Maintain existing 4-column layout
- Ensure social media links are functional
- Keep existing styling and animations

## Data Models

### Services Data Structure

```javascript
// data/services.js
export const services = [
  {
    id: 'billboard-advertising',
    icon: '🏗️',
    title: 'Billboard Advertising',
    description: 'Large format roadside billboards positioned in high-traffic areas.'
  },
  {
    id: 'rooftop-advertising',
    icon: '🏢',
    title: 'Rooftop Advertising',
    description: 'High visibility rooftop placements in major city centers.'
  },
  {
    id: 'street-poles',
    icon: '🌉',
    title: 'Street Poles',
    description: 'Strategic street pole placements across busy highways.'
  },
  {
    id: 'vehicle-branding',
    icon: '🚕',
    title: 'Taxi & Vehicle Branding',
    description: 'Mobile advertising solutions across urban transport networks.'
  },
  {
    id: 'digital-led',
    icon: '📺',
    title: 'Digital LED Screens',
    description: 'Dynamic digital outdoor advertising displays.'
  },
  {
    id: 'large-format-printing',
    icon: '🖨️',
    title: 'Large Format Printing',
    description: 'High quality branding materials for outdoor campaigns.'
  }
];
```

### Locations Data Structure

```javascript
// data/locations.js
export const locations = [
  {
    id: 'kampala',
    name: 'Kampala',
    coordinates: [0.3476, 32.5825],
    billboard: {
      imageSrc: '/images/billboards/kampala.jpg',
      size: '10x12m',
      trafficLevel: 'High',
      status: 'Available'
    }
  },
  {
    id: 'entebbe',
    name: 'Entebbe',
    coordinates: [0.0522, 32.4635],
    billboard: {
      imageSrc: '/images/billboards/entebbe.jpg',
      size: '8x10m',
      trafficLevel: 'High',
      status: 'Booked'
    }
  },
  // ... more locations
];
```

### Campaigns Data Structure

```javascript
// data/campaigns.js
export const campaigns = [
  {
    id: 'mtn-highway',
    imageSrc: '/images/campaigns/mtn-billboard.jpg',
    client: 'MTN Uganda',
    title: 'MTN Highway Billboard',
    description: 'Major highway campaign reaching 2M+ monthly viewers',
    caseStudyLink: '/portfolio/mtn-highway'
  },
  // ... more campaigns
];
```

### Testimonials Data Structure

```javascript
// data/testimonials.js
export const testimonials = [
  {
    id: 'sarah-nakato',
    quote: 'Reign Ads helped our campaign reach millions across Kampala. Their billboard locations are unmatched.',
    clientName: 'Sarah Nakato',
    clientTitle: 'Marketing Director',
    company: 'MTN Uganda',
    photoSrc: '/images/testimonials/sarah-nakato.jpg'
  },
  // ... more testimonials
];
```

### Inventory Data Structure

```javascript
// data/inventory.js
export const inventory = [
  {
    id: 'kampala-road-1',
    location: 'Kampala Road',
    size: '10x12m',
    trafficLevel: 'High Traffic',
    status: 'Available'
  },
  // ... more inventory items
];
```

### Blog Posts Data Structure

```javascript
// data/blogPosts.js
export const blogPosts = [
  {
    id: 'billboard-advertising-dominates',
    title: 'How Billboard Advertising Still Dominates Brand Awareness',
    date: '2026-03-01',
    excerpt: 'Despite digital marketing growth, billboard advertising remains one of the most effective...',
    imageSrc: '/images/blog/billboard-sunset.jpg',
    slug: 'billboard-advertising-dominates'
  },
  // ... more blog posts
];
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Component Data Rendering Completeness

*For any* component that receives an array of data items (services, locations, campaigns, testimonials, inventory, blog posts), all items in the array should be rendered in the output.

**Validates: Requirements 2.1, 4.1, 5.2, 6.1, 7.3, 8.1, 10.1**

### Property 2: Service Card Required Fields

*For any* service card rendered, the output should contain the service icon, title, and description.

**Validates: Requirements 4.3**

### Property 3: Map Marker Interaction

*For any* location marker on the map, clicking the marker should display a popup containing billboard details.

**Validates: Requirements 5.3**

### Property 4: Map Popup Required Fields

*For any* map popup displayed, the popup should contain billboard image, location name, size, traffic level, and availability status.

**Validates: Requirements 5.4**

### Property 5: Campaign Overlay Display

*For any* campaign card, hovering over the card should display an overlay containing client name, description, and a "View Case Study" button.

**Validates: Requirements 6.2, 6.3**

### Property 6: Inventory Status Color Coding

*For any* inventory item status, the status badge should use green styling for "Available" and red styling for "Booked".

**Validates: Requirements 7.2**

### Property 7: Inventory Search Filtering

*For any* search query entered in the inventory table, the filtered results should only include items where the location contains the search query (case-insensitive).

**Validates: Requirements 7.6**

### Property 8: Testimonial Required Fields

*For any* testimonial displayed, the output should contain quote, client name, client title, company, and photo.

**Validates: Requirements 8.2**

### Property 9: Testimonial Navigation

*For any* testimonial slider with navigation controls, clicking the next/previous button should change the active testimonial.

**Validates: Requirements 8.6**

### Property 10: Blog Card Required Fields

*For any* blog card rendered, the output should contain featured image, title, date, excerpt, and "Read More" link.

**Validates: Requirements 10.2, 10.3**

### Property 11: Image Optimization

*For any* image element rendered, the element should use optimized formats (WebP with JPG fallback) or have lazy loading enabled for below-the-fold images.

**Validates: Requirements 14.1, 14.3**

## Error Handling

### Image Loading Failures

- Implement fallback images for all image components
- Use onError handler to replace failed images with placeholder
- Placeholder images stored in `/images/placeholders/`

### Video Loading Failures

- Display poster image while video loads
- If video fails to load, show static hero image instead
- Log error to console for debugging

### Map Loading Failures

- Display error message if Leaflet fails to initialize
- Provide fallback to static image of Uganda map with locations
- Retry map initialization after 3 seconds

### API/Data Loading Failures

- Implement loading states for all data-dependent components
- Display skeleton loaders while data fetches
- Show error messages with retry buttons if data fails to load
- Use React Error Boundaries to catch component errors

### Responsive Breakpoint Handling

- Define breakpoints in Tailwind config: sm (640px), md (768px), lg (1024px), xl (1280px)
- Test all components at each breakpoint
- Ensure touch targets are minimum 44x44px on mobile

## Testing Strategy

### Unit Testing

Unit tests will verify specific examples, edge cases, and error conditions for individual components. Focus areas include:

- Component rendering with valid props
- Edge cases (empty arrays, missing data fields)
- Error states (failed image loads, missing required props)
- User interactions (clicks, hovers, form submissions)
- Responsive behavior at specific breakpoints

### Property-Based Testing

Property-based tests will verify universal properties across all inputs using randomized test data. Each property test will:

- Run minimum 100 iterations with randomly generated data
- Reference the design document property number
- Use tag format: **Feature: reign-ads-redesign, Property {number}: {property_text}**

**Property Testing Library**: Use `@fast-check/jest` for JavaScript/React property-based testing

**Example Property Test Structure**:
```javascript
// Feature: reign-ads-redesign, Property 1: Component Data Rendering Completeness
test('all data items are rendered', () => {
  fc.assert(
    fc.property(
      fc.array(fc.record({
        id: fc.string(),
        // ... other fields
      }), { minLength: 1, maxLength: 20 }),
      (dataItems) => {
        const { container } = render(<Component items={dataItems} />);
        // Assert all items are rendered
        dataItems.forEach(item => {
          expect(container).toHaveTextContent(item.id);
        });
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

- Test component composition (Hero + ClientLogos + AboutSection flow)
- Test navigation between sections
- Test scroll animations triggering correctly
- Test map interactions with multiple markers

### Visual Regression Testing

- Capture screenshots of each component at different breakpoints
- Compare against baseline images
- Flag visual changes for manual review

### Performance Testing

- Measure First Contentful Paint (FCP) < 1.5s
- Measure Largest Contentful Paint (LCP) < 2.5s
- Measure Time to Interactive (TTI) < 3.5s
- Test animation frame rates maintain 60fps
- Test image lazy loading reduces initial page weight

### Accessibility Testing

- Verify keyboard navigation works for all interactive elements
- Test screen reader compatibility
- Ensure color contrast ratios meet WCAG AA standards
- Verify focus indicators are visible
- Test with browser zoom up to 200%

### Browser Compatibility Testing

- Test on Chrome, Firefox, Safari, Edge (latest 2 versions)
- Test on iOS Safari and Android Chrome
- Verify video autoplay works across browsers
- Test map interactions on touch devices
