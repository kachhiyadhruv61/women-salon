import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function Service() {
  return (
    <div className="container-fluid service py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="font-dancing-script text-primary">Our Service</h1>
          <h1>Explore Our Services</h1>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          <SwiperSlide>
            <div className="service-item h-100 p-4 text-center bg-light">
              <img className="img-fluid mb-3" src="/img/haircut.png" alt="" />
              <h3>Haircut</h3>
              <p>Our Professional Hair Cut Service is provided by trained female stylists.</p>
              <a className="btn btn-sm btn-primary text-uppercase" href="#">Read More</a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="service-item h-100 p-4 text-center bg-light">
              <img className="img-fluid mb-3" src="/img/makeup.png" alt="" />
              <h3>Bridal Package</h3>
              <p>Complete organic bridal therapy & beauty care.</p>
              <a className="btn btn-sm btn-primary text-uppercase" href="#">Read More</a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="service-item h-100 p-4 text-center bg-light">
              <img className="img-fluid mb-3" src="/img/manicure.png" alt="" />
              <h3>Manicure</h3>
              <p>Organic spa manicure using herbal oils.</p>
              <a className="btn btn-sm btn-primary text-uppercase" href="#">Read More</a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="service-item h-100 p-4 text-center bg-light">
              <img className="img-fluid mb-3" src="/img/pedicure.png" alt="" />
              <h3>Pedicure</h3>
              <p>Relaxing herbal pedicure for soft & healthy feet.</p>
              <a className="btn btn-sm btn-primary text-uppercase" href="#">Read More</a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="service-item h-100 p-4 text-center bg-light">
              <img className="img-fluid mb-3" src="/img/massage.png" alt="" />
              <h3>Facial / Clean-up</h3>
              <p>100% organic facial & herbal cleanup for natural glow.</p>
              <a className="btn btn-sm btn-primary text-uppercase" href="#">Read More</a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="service-item h-100 p-4 text-center bg-light">
              <img className="img-fluid mb-3" src="/img/skin-care.png" alt="" />
              <h3>Waxing</h3>
              <p>100% natural honey & sugar wax safe for all skin types.</p>
              <a className="btn btn-sm btn-primary text-uppercase" href="#">Read More</a>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Service;
