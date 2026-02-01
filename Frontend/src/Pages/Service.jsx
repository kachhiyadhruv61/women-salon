import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

function Service() {
  const services = [
    {
      id: "hair",
      title: "Haircut",
      img: "/img/layercut.jpg",
      short: "Professional haircut by trained female stylists.",
      
    },
    {
      id: "bridal",
      title: "Bridal Package",
      img: "/img/bridal.jpg",
      short: "Complete organic bridal beauty care.",
     
    },
    {
      id: "manicure",
      title: "Manicure",
      img: "/img/manicure.jpg",
      short: "Organic spa manicure.",
      
    },
    {
      id: "pedi",
      title: "Pedicure",
      img: "/img/pedicure.jpg",
      short: "Relaxing herbal pedicure.",
    
    },
    {
      id: "facial",
      title: "Facial / Clean-up",
      img: "/img/facial.jpg",
      short: "100% organic facial & cleanup.",
      
    },
    {
      id: "waxing",
      title: "Waxing",
      img: "/img/waxing.jpg",
      short: "Natural honey & sugar waxing.",
    },
      // 🔹 THREADING SERVICE ADDED
    {
      id: "threading",
      title: "Threading",
      img: "/img/threading.jpg", // image add kari hoy to
      short: "Precise eyebrow & facial threading.",
    },
     {
      id: "mehendi",
      title: "Mehendi",
      img: "/img/Mehndi design.jpg",
      short: "Traditional & modern organic mehendi designs for all occasions using natural henna.",
    },

   
  ];

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
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="service-item h-100 p-4 text-center bg-light">
                <img className="img-fluid mb-3" src={service.img} alt="" />
                <h3>{service.title}</h3>
                <p>{service.short}</p>

               
                {/* ✅ UPDATED READ MORE */}
                <Link
                  to={`/service/${service.id}`}
                  className="btn btn-sm btn-primary text-uppercase"
                >
                  Read More
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Service;

