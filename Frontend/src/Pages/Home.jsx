import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import About from "./About";
import Services from "./Service";
import Testimonial from "./Testimonial";
import Team from "./Team";


function Home() {
  return (
    <div className="container-fluid p-0 hero-header bg-light mb-5">
      <div className="container p-0">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 hero-header-text py-5">
            <div className="py-5 px-3 ps-lg-0">
              <h1 className="font-dancing-script text-primary animated slideInLeft">Welcome</h1>
              <h1 className="display-1 mb-4 animated slideInLeft">A<sup>2</sup> Women Organic Services</h1>

              <div className="row g-4 animated slideInLeft">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <div className="btn-square btn btn-primary flex-shrink-0">
                      <i className="fa fa-phone text-dark"></i>
                    </div>
                    <div className="px-3">
                      <h5 className="text-primary mb-0">Call Us</h5>
                      <p className="fs-5 text-dark mb-0">9574568855</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <div className="btn-square btn btn-primary flex-shrink-0">
                      <i className="fa fa-envelope text-dark"></i>
                    </div>
                    <div className="px-3">
                      <h5 className="text-primary mb-0">Mail Us</h5>
                      <p className="fs-5 text-dark mb-0">beenakachhiya.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Swiper Slider */}
          <div className="col-lg-6">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              pagination={{ clickable: true }}
              navigation={true}
              className="header-swiper"
            >
              <SwiperSlide>
                <img className="img-fluid w-100" src="img/hero-slider-1.jpg" alt="Slide 1" />
              </SwiperSlide>

              <SwiperSlide>
                <img className="img-fluid w-100" src="img/hero-slider-2.jpg" alt="Slide 2" />
              </SwiperSlide>

              <SwiperSlide>
                <img className="img-fluid w-100" src="img/hero-slider-3.jpg" alt="Slide 3" />
              </SwiperSlide>
            </Swiper>
           
          </div>
        </div>
         <About/>
            <Services/>
            <Team/>
            <Testimonial/>
            
      </div>
    </div>
    
  );
}

export default Home;
