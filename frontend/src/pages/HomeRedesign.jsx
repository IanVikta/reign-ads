import Hero3D from '../components/Hero3D';
import ClientLogos from '../components/ClientLogos';
import AboutSection from '../components/AboutSection';
import ServicesGrid from '../components/ServicesGrid';
import LocationsMap from '../components/LocationsMap';
import CampaignsGrid from '../components/CampaignsGrid';

import TestimonialsSlider from '../components/TestimonialsSlider';
import CTASection from '../components/CTASection';
import BlogPreview from '../components/BlogPreview';

const HomeRedesign = () => {
  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <Hero3D />

      {/* 2. Client Logos */}
      <ClientLogos />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Services Grid */}
      <ServicesGrid />

      {/* 5. Billboard Locations Map */}
      <LocationsMap />

      {/* 6. Featured Campaigns */}
      <CampaignsGrid />


      {/* 8. Testimonials */}
      <TestimonialsSlider />

      {/* 9. Call to Action */}
      <CTASection />

      {/* 10. Blog Preview */}
      <BlogPreview />
    </div>
  );
};

export default HomeRedesign;
