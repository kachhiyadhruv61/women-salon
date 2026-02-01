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
              <div class="team-img">
              <img className="img-fluid w-100" src="/img/neha1.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Hair Specialist</p>
                <h4>Neha Patel</h4>
               </div>
              </div>
            </div>
          </SwiperSlide>
           <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
              <div class="team-img">
              <img className="img-fluid w-100" src="/img/pooja.jpeg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Hair Specialist</p>
                <h4>Pooja Joshi</h4>
               </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
               <div class="team-img">
              <img className="img-fluid w-100" src="/img/aarti.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Face Specialist </p>
                <h4>Aarti Parmar</h4>
               </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
               <div class="team-img">
              <img className="img-fluid w-100" src="/img/team-3.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Beauty Specialist</p>
                <h4>Parul Mehta</h4>
                <h4>Senior Stylist</h4>
               </div>
              </div>
            </div>
          </SwiperSlide>

           <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
               <div class="team-img">
              <img className="img-fluid w-100" src="/img/prachi.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Beauty Specialist</p>
                <h4>Prachi Solanki</h4>
                <h4>Make-up Artist</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
               <div class="team-img">
              <img className="img-fluid w-100" src="/img/reena.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Pedicure Specialist</p>
                <h4>Reena Arora</h4>
               </div>
              </div>
            </div>
          </SwiperSlide>

           <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
               <div class="team-img">
              <img className="img-fluid w-100" src="/img/kajal.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Pedicure Specialist</p>
                <h4>Kajal Patel</h4>
               </div>
              </div>
            </div>
          </SwiperSlide>

           <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
               <div class="team-img">
              <img className="img-fluid w-100" src="/img/Ayra.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Mehandi Specialist</p>
                <h4>Ayra Vhora</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

           <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
               <div class="team-img">
              <img className="img-fluid w-100" src="/img/lily1.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Spa Specialist</p>
                <h4>Lily Smith</h4>
               </div>
              </div>
            </div>
          </SwiperSlide>

           <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
               <div class="team-img">
              <img className="img-fluid w-100" src="/img/riya.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Threading Specialist</p>
                <h4>Riya Pitroda</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

           <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
               <div class="team-img">
              <img className="img-fluid w-100" src="/img/Diya.jpeg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Waxing Specialist</p>
                <h4>Diya Patel</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

           <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
               <div class="team-img">
              <img className="img-fluid w-100" src="/img/priya.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">Waxing Specialist</p>
                <h4>Priya Patel</h4>
               </div>
              </div>
            </div>
          </SwiperSlide>

           <SwiperSlide>
            <div className="team-item position-relative overflow-hidden">
               <div class="team-img">
              <img className="img-fluid w-100" src="/img/khushi.jpg" alt="" />
              <div className="team-overlay text-center">
                <p className="text-primary mb-1">All in one Specialist</p>
                <h4>Khushi Mehta</h4>
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
