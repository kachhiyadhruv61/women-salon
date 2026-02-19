import { Link } from "react-router-dom";

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
    {
      id: "threading",
      title: "Threading",
      img: "/img/threading.jpg",
      short: "Precise eyebrow & facial threading.",
    },
    {
      id: "mehendi",
      title: "Mehendi",
      img: "/img/Mehndi design.jpg",
      short: "Traditional & modern organic mehendi designs.",
    },
  ];

  return (
  <div className="service position-relative">
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="font-dancing-script text-primary">Our Service</h1>
          <h2>Explore Our Services</h2>
        </div>

        {/* ✅ 4 BOX PER ROW + PARTITION */}
        <div className="row service-grid">
          {services.map((service, index) => (
            <div className="col-lg-3 col-md-6 service-col" key={index}>
              <div className="service-item text-center p-4 h-100">
                <img
                  src={service.img}
                  alt={service.title}
                  className="img-fluid mb-3"
                />
                <h5>{service.title}</h5>
                <p>{service.short}</p>

                <Link
                  to={`/service/${service.id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
  );
}

export default Service;
