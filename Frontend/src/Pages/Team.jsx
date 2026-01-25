import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function Team() {
  return (
    <div className="container-fluid overflow-hidden py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="font-dancing-script text-primary">Team Members</h1>
          <h1>Our Experienced Specialists</h1>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 4 },
          }}
        >
          <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
              <img className="img-fluid w-100" src="/img/team-1.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Hair Specialist</p>
                <h4>Lily Taylor</h4>
                <div className="d-flex justify-content-center">
                  <a className="btn btn-dark btn-sm-square me-3" href="#"><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-dark btn-sm-square me-3" href="#"><i className="fab fa-instagram"></i></a>
                  <a className="btn btn-dark btn-sm-square" href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
              <img className="img-fluid w-100" src="/img/team-2.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Nail Designer</p>
                <h4>Olivia Smith</h4>
                <div className="d-flex justify-content-center">
                  <a className="btn btn-dark btn-sm-square me-3" href="#"><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-dark btn-sm-square me-3" href="#"><i className="fab fa-instagram"></i></a>
                  <a className="btn btn-dark btn-sm-square" href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
              <img className="img-fluid w-100" src="/img/team-3.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Beauty Specialist</p>
                <h4>Ava Brown</h4>
                <div className="d-flex justify-content-center">
                  <a className="btn btn-dark btn-sm-square me-3" href="#"><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-dark btn-sm-square me-3" href="#"><i className="fab fa-instagram"></i></a>
                  <a className="btn btn-dark btn-sm-square" href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
              <img className="img-fluid w-100" src="/img/team-4.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Spa Specialist</p>
                <h4>Amelia Jones</h4>
                <div className="d-flex justify-content-center">
                  <a className="btn btn-dark btn-sm-square me-3" href="#"><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-dark btn-sm-square me-3" href="#"><i className="fab fa-instagram"></i></a>
                  <a className="btn btn-dark btn-sm-square" href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Team;
