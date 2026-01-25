import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function Testimonial() {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="font-dancing-script text-primary">Testimonial</h1>
          <h1>What Clients Say!</h1>
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
            <div className="text-center bg-light p-4">
              <i className="fa fa-quote-left fa-3x mb-3"></i>
              <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos.</p>
              <img className="img-fluid mx-auto border p-1 mb-3" src="/img/testimonial-1.jpg" alt="" />
              <h4 className="mb-1">Client Name</h4>
              <span>Profession</span>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="text-center bg-light p-4">
              <i className="fa fa-quote-left fa-3x mb-3"></i>
              <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos.</p>
              <img className="img-fluid mx-auto border p-1 mb-3" src="/img/testimonial-2.jpg" alt="" />
              <h4 className="mb-1">Client Name</h4>
              <span>Profession</span>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="text-center bg-light p-4">
              <i className="fa fa-quote-left fa-3x mb-3"></i>
              <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos.</p>
              <img className="img-fluid mx-auto border p-1 mb-3" src="/img/testimonial-3.jpg" alt="" />
              <h4 className="mb-1">Client Name</h4>
              <span>Profession</span>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="text-center bg-light p-4">
              <i className="fa fa-quote-left fa-3x mb-3"></i>
              <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos.</p>
              <img className="img-fluid mx-auto border p-1 mb-3" src="/img/testimonial-4.jpg" alt="" />
              <h4 className="mb-1">Client Name</h4>
              <span>Profession</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Testimonial;
