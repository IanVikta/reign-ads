import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import { clients } from '../data/clients';

const ClientLogos = () => {
  // Triple the clients to ensure enough for smooth scrolling in each lane
  const allClients = [...clients, ...clients, ...clients];

  return (
    <section className="py-10 bg-white border-y border-gray-100">
      <div className="container mx-auto px-6 mb-5">
        <div className="flex items-center gap-4">
          <div className="h-px flex-grow bg-gray-100" />
          <motion.p
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.35em] text-gray-400 flex-shrink-0"
          >
            Trusted By Leading Brands
          </motion.p>
          <div className="h-px flex-grow bg-gray-100" />
        </div>
      </div>

      <div className="space-y-2">
        {/* Lane 1 - Scrolling Left */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView="auto"
          loop={true}
          autoplay={{ 
            delay: 0, 
            disableOnInteraction: false, 
            pauseOnMouseEnter: true,
          }}
          speed={3500}
          className="client-logos-swiper"
        >
          {allClients.map((client, index) => (
            <SwiperSlide key={`lane1-${index}`} style={{ width: 'auto' }}>
              <div className="flex items-center justify-center h-16 px-10 opacity-100 hover:opacity-100 transition-all duration-300">
                <img
                  src={client.imageSrc}
                  alt={client.alt}
                  className="max-h-10 w-auto object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Lane 2 - Scrolling Right */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView="auto"
          loop={true}
          autoplay={{ 
            delay: 0, 
            disableOnInteraction: false, 
            pauseOnMouseEnter: true,
            reverseDirection: true,
          }}
          speed={3500}
          className="client-logos-swiper"
        >
          {allClients.map((client, index) => (
            <SwiperSlide key={`lane2-${index}`} style={{ width: 'auto' }}>
              <div className="flex items-center justify-center h-16 px-10 opacity-100 hover:opacity-100 transition-all duration-300">
                <img
                  src={client.imageSrc}
                  alt={client.alt}
                  className="max-h-10 w-auto object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Lane 3 - Scrolling Left */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView="auto"
          loop={true}
          autoplay={{ 
            delay: 0, 
            disableOnInteraction: false, 
            pauseOnMouseEnter: true,
          }}
          speed={3500}
          className="client-logos-swiper"
        >
          {allClients.map((client, index) => (
            <SwiperSlide key={`lane3-${index}`} style={{ width: 'auto' }}>
              <div className="flex items-center justify-center h-16 px-10 opacity-100 hover:opacity-100 transition-all duration-300">
                <img
                  src={client.imageSrc}
                  alt={client.alt}
                  className="max-h-10 w-auto object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ClientLogos;