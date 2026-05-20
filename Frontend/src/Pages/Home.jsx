import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Services from "./Service";
import About from "./About";
import Gallery from "./Gallery";
import Testimonial from "./Testimonial";
import Team from "./Team";


function Home() {
  return (
  <div className="herome position-relative">
    <div className="container-fluid p-0 mb-5" >
      <div className="">
        <div className="hero-section">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 hero-header-text py-5">
            <div className="py-5 px-3 ps-lg-0">
              <h1 className="font-dancing-script text-primary text-center mb-4">Welcome to</h1>
              <h2 className="display-1 mb-4 animated slideInLeft">A<sup>2</sup> Women Salon</h2>
                <p>A women’s salon offering organic beauty services, relaxing therapies, and personalized care in a hygienic and peaceful environment.</p>
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
                      <p className="fs-5 text-dark mb-0">kachhiyadhruv61@gmail.com</p>
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
        </div>

        <div className="container py-5">

  <div className="text-center why-section py-5">
    <h2 className="font-dancing-script text-primary">Why Choose Us</h2>
    <p className="text-muted">
      Experience natural beauty with trusted organic care
    </p>
  </div>

  <div className="row g-4">

    {/* 🌿 Organic */}
    <div className="col-md-3 col-sm-6">
      <div className="text-center p-4 shadow-sm h-100 rounded">
        <div style={{ fontSize: "40px" }}>🌿</div>
        <h5 className="mt-3">Organic Products</h5>
        <p className="small text-muted">
          Made with carefully selected natural & herbal ingredients
        </p>
      </div>
    </div>

    {/* 🧪 Chemical Free */}
    <div className="col-md-3 col-sm-6">
      <div className="text-center p-4 shadow-sm h-100 rounded">
        <div style={{ fontSize: "40px" }}>🧪</div>
        <h5 className="mt-3">Chemical-Free</h5>
        <p className="small text-muted">
          Free from harmful chemicals, safe for regular use
        </p>
      </div>
    </div>

    {/* 🌸 Handmade */}
    <div className="col-md-3 col-sm-6">
      <div className="text-center p-4 shadow-sm h-100 rounded">
        <div style={{ fontSize: "40px" }}>🌸</div>
        <h5 className="mt-3">Handcrafted Care</h5>
        <p className="small text-muted">
          Handmade with love for better quality & results
        </p>
      </div>
    </div>

    {/* 💖 Trusted */}
    <div className="col-md-3 col-sm-6">
      <div className="text-center p-4 shadow-sm h-100 rounded">
        <div style={{ fontSize: "40px" }}>💖</div>
        <h5 className="mt-3">Trusted by Clients</h5>
        <p className="small text-muted">
          Loved by customers for visible and natural results
        </p>
      </div>
    </div>

  </div>

</div>
         <Services/>
            <About/>
            <Gallery/>
            <Team/>
            <Testimonial/>
            
      </div>
    </div>
  </div> 
  );
}

export default Home;
