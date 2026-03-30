# Implementation Plan: Reign Ads Website Redesign

## Overview

This implementation plan breaks down the Reign Ads website redesign into discrete, incremental tasks. Each task builds on previous work, starting with data structures and foundational components, then progressing through individual sections, and finally integrating everything into the home page. The approach ensures that each component can be developed and tested independently before integration.

## Tasks

- [x] 1. Set up data structures and utilities
  - Create data files for services, locations, campaigns, testimonials, inventory, and blog posts
  - Create animation utilities for reusable Framer Motion configurations
  - Set up placeholder images directory structure
  - _Requirements: All requirements depend on these data structures_

- [ ] 2. Update Hero3D component with Uganda-focused content
  - [ ] 2.1 Update Hero3D text content
    - Change headline to "We Reign over visibility"
    - Update subtext to "East Africa's most innovative outdoor advertising agency. Taking your brand places since 2015."
    - Update statistics to show "70+ Billboard Locations", "20+ Corporate Clients", "10M+ Monthly Impressions"
    - Update CTA buttons to "Request Advertising Space" and "View Billboard Locations"
    - _Requirements: 1.2, 1.3, 1.4, 1.5_
  
  - [ ] 2.2 Write unit tests for Hero3D component
    - Test that all text content renders correctly
    - Test that video background and overlay are present
    - Test that CTA buttons are rendered
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [ ] 3. Create ClientLogos component
  - [ ] 3.1 Implement ClientLogos with SwiperJS
    - Set up Swiper with autoplay, loop, and pauseOnHover
    - Configure responsive slidesPerView and spacing
    - Add grayscale filter with hover transition
    - Implement mobile grid fallback
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [ ] 3.2 Write property test for ClientLogos rendering
    - **Property 1: Component Data Rendering Completeness**
    - **Validates: Requirements 2.1**
  
  - [ ] 3.3 Write unit tests for ClientLogos
    - Test hover pause functionality
    - Test mobile grid layout
    - _Requirements: 2.3, 2.5_

- [ ] 4. Create AboutSection component
  - [ ] 4.1 Implement AboutSection with split layout
    - Create responsive grid layout (2 columns desktop, 1 mobile)
    - Add image with proper aspect ratio
    - Implement ScrollReveal wrapper for animations
    - Add slide-in animations for image and text
    - Style CTA button with hover effects
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  
  - [ ] 4.2 Write unit tests for AboutSection
    - Test that all content renders correctly
    - Test responsive layout at different breakpoints
    - _Requirements: 3.1, 3.4, 3.5, 3.6_

- [ ] 5. Create ServicesGrid component
  - [ ] 5.1 Implement ServicesGrid with responsive cards
    - Create responsive CSS Grid (3/2/1 columns)
    - Build service card with icon, title, description
    - Add hover effects (lift, glow, icon rotation)
    - Implement scroll-triggered stagger animations
    - Apply gradient borders and backdrop blur
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_
  
  - [ ] 5.2 Write property test for ServicesGrid rendering
    - **Property 1: Component Data Rendering Completeness**
    - **Property 2: Service Card Required Fields**
    - **Validates: Requirements 4.1, 4.3**
  
  - [ ] 5.3 Write unit tests for ServicesGrid
    - Test responsive column layouts at breakpoints
    - Test that all 6 services render
    - _Requirements: 4.1, 4.5, 4.6, 4.7_

- [ ] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Create LocationsMap component
  - [ ] 7.1 Implement interactive map with Leaflet
    - Set up React-Leaflet with MapContainer and TileLayer
    - Create custom marker icon with Reign Ads branding
    - Add markers for all 6 Uganda locations
    - Implement popup with billboard details
    - Style status badges (green/red for Available/Booked)
    - Configure map bounds and zoom controls
    - Ensure mobile touch gesture support
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_
  
  - [ ] 7.2 Write property tests for LocationsMap
    - **Property 1: Component Data Rendering Completeness**
    - **Property 3: Map Marker Interaction**
    - **Property 4: Map Popup Required Fields**
    - **Validates: Requirements 5.2, 5.3, 5.4**
  
  - [ ] 7.3 Write unit tests for LocationsMap
    - Test map initialization
    - Test that button renders
    - _Requirements: 5.1, 5.5_

- [ ] 8. Create CampaignsGrid component
  - [ ] 8.1 Implement portfolio grid with hover overlays
    - Create responsive grid (2 columns desktop, 1 mobile)
    - Set up campaign cards with proper aspect ratios
    - Implement hover overlay with dark background
    - Add overlay content (client, description, CTA)
    - Apply smooth transition animations
    - Style "View Case Study" button
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_
  
  - [ ] 8.2 Write property tests for CampaignsGrid
    - **Property 1: Component Data Rendering Completeness**
    - **Property 5: Campaign Overlay Display**
    - **Validates: Requirements 6.1, 6.2, 6.3**
  
  - [ ] 8.3 Write unit tests for CampaignsGrid
    - Test responsive layouts
    - Test that button renders
    - _Requirements: 6.4, 6.5, 6.6_

- [ ] 9. Create InventoryTable component
  - [ ] 9.1 Implement responsive inventory table
    - Build HTML table with styled thead and tbody
    - Add alternating row colors and hover effects
    - Create status badge component with conditional styling
    - Implement mobile card layout transformation
    - Add optional search/filter functionality
    - Style "View Full Inventory" button
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [ ] 9.2 Write property tests for InventoryTable
    - **Property 1: Component Data Rendering Completeness**
    - **Property 6: Inventory Status Color Coding**
    - **Property 7: Inventory Search Filtering**
    - **Validates: Requirements 7.2, 7.3, 7.6**
  
  - [ ] 9.3 Write unit tests for InventoryTable
    - Test table structure
    - Test mobile card layout
    - Test that button renders
    - _Requirements: 7.1, 7.4, 7.5_

- [ ] 10. Create TestimonialsSlider component
  - [ ] 10.1 Implement testimonials carousel with SwiperJS
    - Set up Swiper with Pagination and Navigation modules
    - Configure autoplay with 5-second delay and pauseOnHover
    - Create testimonial slide layout (quote, photo, client info)
    - Style client photo as circular (80x80px)
    - Customize navigation arrows (blue with gold hover)
    - Style pagination dots (gold active dot)
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_
  
  - [ ] 10.2 Write property tests for TestimonialsSlider
    - **Property 1: Component Data Rendering Completeness**
    - **Property 8: Testimonial Required Fields**
    - **Property 9: Testimonial Navigation**
    - **Validates: Requirements 8.1, 8.2, 8.6**
  
  - [ ] 10.3 Write unit tests for TestimonialsSlider
    - Test navigation controls render
    - Test that all testimonials are available
    - _Requirements: 8.1, 8.5_

- [ ] 11. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Create CTASection component
  - [ ] 12.1 Implement full-width CTA with parallax
    - Create full-width container with background image
    - Apply 70% dark overlay
    - Center content with flexbox
    - Style headline (text-5xl, bold)
    - Create prominent CTA button (gold, large padding)
    - Implement parallax scroll effect with Framer Motion
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_
  
  - [ ] 12.2 Write unit tests for CTASection
    - Test all content renders correctly
    - Test overlay is present
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 13. Create BlogPreview component
  - [ ] 13.1 Implement blog cards grid
    - Create responsive grid (3 columns desktop, 1 mobile)
    - Build blog card with image, title, date, excerpt
    - Set image aspect ratio to 16:9
    - Apply line-clamp to title (2 lines) and excerpt (3 lines)
    - Style "Read More" link with hover effect
    - Add card lift effect on hover
    - Style "View All Articles" button
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ] 13.2 Write property tests for BlogPreview
    - **Property 1: Component Data Rendering Completeness**
    - **Property 10: Blog Card Required Fields**
    - **Validates: Requirements 10.1, 10.2, 10.3**
  
  - [ ] 13.3 Write unit tests for BlogPreview
    - Test responsive layout
    - Test that button renders
    - _Requirements: 10.4, 10.5_

- [ ] 14. Update Footer component
  - [ ] 14.1 Update Footer with Uganda contact information
    - Update address to "Kampala, Uganda"
    - Update email to "info@reignads.co.ug"
    - Update phone to "+256 706 829 331"
    - Update business hours to "Mon-Fri, 8AM-6PM"
    - Verify all four columns render correctly
    - Verify social media icons are present
    - Verify copyright and legal links are present
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_
  
  - [ ] 14.2 Write unit tests for Footer
    - Test all contact information renders correctly
    - Test all columns are present
    - Test social media icons render
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_

- [ ] 15. Integrate all components into Home page
  - [ ] 15.1 Update Home.jsx with all new sections
    - Import all new components
    - Arrange components in correct order
    - Ensure proper spacing between sections
    - Verify scroll animations work correctly
    - Test responsive behavior across all breakpoints
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [ ] 15.2 Write integration tests for Home page
    - Test all sections render in correct order
    - Test scroll animations trigger
    - Test responsive layouts at all breakpoints
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [ ] 16. Implement image optimization and lazy loading
  - [ ] 16.1 Add image optimization
    - Convert images to WebP format with JPG fallbacks
    - Add lazy loading to below-the-fold images
    - Implement placeholder images for loading states
    - Add error handling for failed image loads
    - Optimize hero video with poster image
    - _Requirements: 14.1, 14.2, 14.3_
  
  - [ ] 16.2 Write property test for image optimization
    - **Property 11: Image Optimization**
    - **Validates: Requirements 14.1, 14.3**
  
  - [ ] 16.3 Write unit tests for image optimization
    - Test WebP with JPG fallback
    - Test lazy loading attribute
    - Test video placeholder
    - _Requirements: 14.1, 14.2, 14.3_

- [ ] 17. Add scroll animations and effects
  - [ ] 17.1 Implement scroll-triggered animations
    - Ensure ScrollReveal component wraps animated sections
    - Configure entrance animations for each section
    - Set up stagger animations for grid items
    - Verify smooth easing functions
    - Test parallax effects on CTA section
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ] 18. Final checkpoint - Comprehensive testing
  - Run all unit tests and property tests
  - Test responsive behavior on mobile, tablet, and desktop
  - Verify all animations work smoothly
  - Check performance metrics (FCP, LCP, TTI)
  - Test on multiple browsers (Chrome, Firefox, Safari, Edge)
  - Verify keyboard navigation and accessibility
  - Ensure all images load correctly
  - Test map interactions
  - Verify all sliders work correctly
  - Ask the user if questions arise.

## Notes

- All tasks are required for comprehensive implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- All components should be developed with mobile-first responsive design
- Use placeholder images from Unsplash initially until client provides actual images
- Ensure all interactive elements have proper hover states and transitions
