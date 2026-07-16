import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import { clients } from '../data/clients';

const ClientLogos = () => {
  // Distribute 37 clients into 3 lanes: 10, 11, 10
  const lane1Clients = clients.slice(0, 10);
  const lane2Clients = clients.slice(10, 21);
  const lane3Clients = clients.slice(21, 31);
  
  // Repeat each lane 5 times for truly seamless infinite scrolling
  const lane1All = [...lane1Clients, ...lane1Clients, ...lane1Clients, ...lane1Clients, ...lane1Clients];
  const lane2All = [...lane2Clients, ...lane2Clients, ...lane2Clients, ...lane2Clients, ...lane2Clients];
  const lane3All = [...lane3Clients, ...lane3Clients, ...lane3Clients, ...lane3Clients, ...lane3Clients];

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
        {/* Lane 1 - Scrolling Left (10 unique logos) */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView="auto"
          loop={true}
          loopAdditionalSlides={10}
          autoplay={{ 
            delay: 0, 
            disableOnInteraction: false, 
            pauseOnMouseEnter: true,
          }}
          speed={3500}
          allowTouchMove={false}
          className="client-logos-swiper"
        >
          {lane1All.map((client, index) => (
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

        {/* Lane 2 - Scrolling Right (11 unique logos) */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView="auto"
          loop={true}
          loopAdditionalSlides={11}
          autoplay={{ 
            delay: 0, 
            disableOnInteraction: false, 
            pauseOnMouseEnter: true,
            reverseDirection: true,
          }}
          speed={3500}
          allowTouchMove={false}
          className="client-logos-swiper"
        >
          {lane2All.map((client, index) => (
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

        {/* Lane 3 - Scrolling Left (10 unique logos) */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView="auto"
          loop={true}
          loopAdditionalSlides={10}
          autoplay={{ 
            delay: 0, 
            disableOnInteraction: false, 
            pauseOnMouseEnter: true,
          }}
          speed={3500}
          allowTouchMove={false}
          className="client-logos-swiper"
        >
          {lane3All.map((client, index) => (
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