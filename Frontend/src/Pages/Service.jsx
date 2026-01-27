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
      img: "/img/haircut.png",
      short: "Professional haircut by trained female stylists.",
      price: "₹500",
      duration: "45 min",
      status: "Available",
    },
    {
      id: "bridal",
      title: "Bridal Package",
      img: "/img/makeup.png",
      short: "Complete organic bridal beauty care.",
      price: "₹5000",
      duration: "6 hrs",
      status: "Available",
    },
    {
      id: "manicure",
      title: "Manicure",
      img: "/img/manicure.png",
      short: "Organic spa manicure.",
      price: "₹400",
      duration: "30 min",
      status: "Available",
    },
    {
      id: "pedicure",
      title: "Pedicure",
      img: "/img/pedicure.png",
      short: "Relaxing herbal pedicure.",
      price: "₹450",
      duration: "40 min",
      status: "Available",
    },
    {
      id: "facial",
      title: "Facial / Clean-up",
      img: "/img/massage.png",
      short: "100% organic facial & cleanup.",
      price: "₹800",
      duration: "1 hr",
      status: "Available",
    },
    {
      id: "waxing",
      title: "Waxing",
      img: "/img/skin-care.png",
      short: "Natural honey & sugar waxing.",
      price: "₹350",
      duration: "30 min",
      status: "Available",
    },
      // 🔹 THREADING SERVICE ADDED
    {
      id: "threading",
      title: "Threading",
      img: "/img/threading.png", // image add kari hoy to
      short: "Precise eyebrow & facial threading.",
      price: "₹100",
      duration: "15 min",
      status: "Available",
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

                <p><strong>Price:</strong> {service.price}</p>
                <p><strong>Duration:</strong> {service.duration}</p>
                <p><strong>Status:</strong> {service.status}</p>

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
