import { useState } from "react";

const testimonials = [
  {
    text: "I had an amazing facial experience. The products felt truly organic and my skin is glowing naturally. Highly recommended!",
    img: "/img/wom1.jpg",
    name: "Priya Sharma",
    profession: "Teacher, Ahmedabad",
  },
  {
    text: "Very hygienic salon with professional staff. I loved the herbal hair spa treatment. Totally worth it.",
    img: "/img/wom2.jpg",
    name: "Ritika Patel",
    profession: "Bank Manager, Surat",
  },
  {
    text: "The pedicure session was so relaxing. My feet feel soft and fresh. Will definitely visit again.",
    img: "/img/women3.jpg",
    name: "Neha Verma",
    profession: "HR Executive, Mumbai",
  },
  {
    text: "I appreciate that they use chemical-free products. My skin did not react at all after threading.",
    img: "/img/women4.jpg",
    name: "Anjali Mehta",
    profession: "Student, Vadodara",
  },
  {
    text: "Best organic salon experience I’ve had so far. Staff is polite and atmosphere is very peaceful.",
    img: "/img/women5.jpg",
    name: "Kavita Desai",
    profession: "Business Owner, Rajkot",
  },
  {
    text: "Fish spa was very unique and relaxing. I felt completely refreshed.",
    img: "/img/wom6.jpg",
    name: "Sneha Kapoor",
    profession: "Software Engineer, Pune",
  },

  // Extra 14 for Show All
  {
    text: "Affordable pricing and premium service. I’m impressed.",
    img: "/img/wom7.jpg",
    name: "Pooja Shah",
    profession: "Homemaker, Ahmedabad",
  },
  {
    text: "Loved the organic wax treatment. Less pain and smooth finish.",
    img: "/img/wom8.jpg",
    name: "Riya Nair",
    profession: "Fashion Designer, Mumbai",
  },
  {
    text: "The ambience is calm and very clean. Perfect for self-care day.",
    img: "/img/women9.jpg",
    name: "Mansi Trivedi",
    profession: "Chartered Accountant, Surat",
  },
  {
    text: "My acne reduced after regular organic facials here.",
    img: "/img/member.jpg",
    name: "Shweta Joshi",
    profession: "College Student, Indore",
  },
  {
    text: "Staff explained every product before applying. Very professional.",
    img: "/img/wom9.jpg",
    name: "Isha Malhotra",
    profession: "Marketing Executive, Delhi",
  },
  {
    text: "Great experience and very reasonable packages.",
    img: "/img/wom10.jpg",
    name: "Meera Iyer",
    profession: "Doctor, Bangalore",
  },
  {
    text: "Natural glow after facial. Loved it!",
    img: "/img/wom4.jpg",
    name: "Komal Patel",
    profession: "Teacher, Surat",
  },
  {
    text: "Very satisfied with manicure service.",
    img: "/img/member3.jpg",
    name: "Tanvi Shah",
    profession: "Entrepreneur, Ahmedabad",
  },
  {
    text: "Highly recommend for organic lovers.",
    img: "/img/img2.jpg",
    name: "Nidhi Arora",
    profession: "IT Professional, Hyderabad",
  },
  {
    text: "Clean, safe and professional staff.",
    img: "/img/img7.jpg",
    name: "Aarti Singh",
    profession: "Lawyer, Delhi",
  },
];


function Testimonial() {
  const [showAll, setShowAll] = useState(false);
  const [index, setIndex] = useState(0);

  // Arrow functions
  const prev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    );
  };

  const next = () => {
    setIndex((prevIndex) =>
      prevIndex >= testimonials.length - 3 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container-fluid py-5">
      <div className="container text-center">
        <h1 className="font-dancing-script text-primary">Testimonial</h1>
        <h2 className="mb-5">What Clients Say!</h2>

        {/* ===== DEFAULT SLIDER VIEW ===== */}
        {!showAll && (
          <>
            <div className="row justify-content-center">
              {testimonials
                .slice(index, index + 3)
                .map((t, i) => (
                  <div className="col-lg-4 mb-4" key={i}>
                    <div className="premium-card p-4 text-center h-100">
                      <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                      <p>{t.text}</p>
                      <img
                        src={t.img}
                        className="img-fluid rounded-circle border p-1 mb-3"
                        style={{ width: "90px", height: "90px" }}
                        alt=""
                      />
                      <h5 className="mb-1">{t.name}</h5>
                      <small className="text-muted">{t.profession}</small>
                    </div>
                  </div>
                ))}
            </div>

            {/* Arrows */}
            <div className="d-flex justify-content-center mt-3 gap-3">
              <button className="btn btn-primary px-3 py-2" onClick={prev}>
                ❮
              </button>
              <button className="btn btn-primary px-3 py-2" onClick={next}>
                ❯
              </button>
            </div>
          </>
        )}

        {/* ===== SHOW ALL GRID VIEW ===== */}
        {showAll && (
          <div className="row">
            {testimonials.map((t, i) => (
              <div className="col-lg-4 mb-4" key={i}>
                <div className="premium-card p-4 text-center h-100">
                  <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                  <p>{t.text}</p>
                  <img
                    src={t.img}
                    className="img-fluid rounded-circle border p-1 mb-3"
                    style={{ width: "90px", height: "90px" }}
                    alt=""
                  />
                  <h5 className="mb-1">{t.name}</h5>
                  <small className="text-muted">{t.profession}</small>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show All Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary px-4 py-2"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show All Reviews"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;