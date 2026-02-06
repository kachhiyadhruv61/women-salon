import { useState } from "react";

const testimonials = [
  {
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    img: "/img/testimonial-1.jpg",
    name: "Client Name",
    profession: "Profession",
  },
  {
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    img: "/img/testimonial-2.jpg",
    name: "Client Name",
    profession: "Profession",
  },
  {
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    img: "/img/testimonial-3.jpg",
    name: "Client Name",
    profession: "Profession",
  },
  {
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. gebaseerd ipsum et lorem et sit.",
    img: "/img/testimonial-4.jpg",
    name: "Client Name",
    profession: "Profession",
  },
];

function Testimonial() {
  const [index, setIndex] = useState(1);

  const prev = () => {
    setIndex(index === 0 ? testimonials.length - 1 : index - 1);
  };

  const next = () => {
    setIndex(index === testimonials.length - 1 ? 0 : index + 1);
  };

  const getItem = (i) =>
    testimonials[(index + i + testimonials.length) % testimonials.length];

  return (
    <div className="container-fluid py-5">
      <div className="container text-center">
        <h1 className="font-dancing-script text-primary">Testimonial</h1>
        <h2 className="mb-5">What Clients Say!</h2>

        <div className="row g-4 align-items-center">
          {[ -1, 0, 1 ].map((pos, i) => {
            const t = getItem(pos);
            const active = pos === 0;

            return (
              <div className="col-lg-4" key={i}>
                <div
                  className={`p-4 text-center ${
                    active ? "bg-primary text-white" : "bg-light"
                  }`}
                  style={{ minHeight: "380px" }}
                >
                  <i className="fa fa-quote-left fa-3x mb-3"></i>
                  <p>{t.text}</p>
                  <img
                    src={t.img}
                    className="img-fluid rounded-circle border p-1 mb-3"
                    style={{ width: "90px", height: "90px" }}
                    alt=""
                  />
                  <h5 className="mb-1">{t.name}</h5>
                  <small>{t.profession}</small>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <div className="d-flex justify-content-center mt-4 gap-3">
          <button className="btn btn-primary px-3 py-2" onClick={prev}>
            ❮
          </button>
          <button className="btn btn-primary px-3 py-2" onClick={next}>
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
