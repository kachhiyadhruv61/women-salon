import { useParams } from "react-router-dom";

function Servicedetails() {
  const { id } = useParams();

  // 🔹 ALL DATA INSIDE SAME FILE
  const servicesData = [
    {
      id: "hair",
      category: "Hair Services",
      description: "Organic hair care services for healthy & stylish hair.",
      services: [
        {
          name: "Hair Cut",
          details: "Professional haircut with organic wash & styling.",
          time: "45 mins",
          price: 500,
          staff: ["Neha", "Pooja"],
          products: [
            { name: "Herbal Shampoo", price: 299 },
            { name: "Organic Hair Serum", price: 399 },
          ],
        },
        {
          name: "Hair Spa",
          details: "Deep nourishment hair spa using herbal oils.",
          time: "1 hr",
          price: 1200,
          staff: ["Pooja"],
          products: [{ name: "Hair Spa Cream", price: 499 }],
        },
      ],
    },

    {
      id: "facial",
      category: "Facial & Cleanup",
      description: "Natural facial services for glowing skin.",
      services: [
        {
          name: "Organic Cleanup",
          details: "Gentle herbal cleanup for all skin types.",
          time: "40 mins",
          price: 700,
          staff: ["Aarti"],
          products: [{ name: "Herbal Face Wash", price: 249 }],
        },
        {
          name: "Gold Facial",
          details: "Premium gold facial for instant glow.",
          time: "1 hr",
          price: 1500,
          staff: ["Aarti", "Neha"],
          products: [{ name: "Gold Facial Kit", price: 899 }],
        },
      ],
    },

    {
      id: "bridal",
      category: "Bridal Package",
      description: "Complete organic bridal beauty services.",
      services: [
        {
          name: "Full Bridal Package",
          details:
            "Pre-bridal care, makeup, hair styling, manicure & pedicure.",
          time: "6 hrs",
          price: 6000,
          staff: ["Senior Stylist", "Makeup Artist"],
          products: [
            { name: "Bridal Glow Kit", price: 1999 },
            { name: "Organic Makeup Kit", price: 2499 },
          ],
        },
      ],
    },
     {
      id: "manicure",
      category: "Manicure Services",
      description: "Organic manicure for clean & healthy hands.",
      services: [
        {
          name: "Classic Manicure",
          details: "Nail shaping, cuticle care & massage.",
          time: "30 mins",
          price: 400,
          staff: ["Pooja"],
          products: [{ name: "Hand Cream", price: 199 }],
        },
      ],
    },

    {
      id: "pedicure",
      category: "Pedicure Services",
      description: "Relaxing pedicure for soft & healthy feet.",
      services: [
        {
          name: "Herbal Pedicure",
          details: "Deep cleansing, scrub & massage.",
          time: "40 mins",
          price: 450,
          staff: ["Neha"],
          products: [{ name: "Foot Care Cream", price: 249 }],
        },
      ],
    },

    {
      id: "threading",
      category: "Threading Services",
      description: "Precise threading for perfect shape.",
      services: [
        {
          name: "Eyebrow Threading",
          details: "Perfect eyebrow shaping with minimal pain.",
          time: "15 mins",
          price: 100,
          staff: ["Aarti"],
          products: [{ name: "Aloe Vera Gel", price: 149 }],
        },
        {
          name: "Upper Lip Threading",
          details: "Gentle threading for upper lips.",
          time: "10 mins",
          price: 80,
          staff: ["Aarti"],
          products: [{ name: "Soothing Gel", price: 129 }],
        },
      ],
    },

    {
      id: "waxing",
      category: "Waxing Services",
      description: "Natural honey & sugar waxing for smooth skin.",
      services: [
        {
          name: "Full Arms Waxing",
          details: "Smooth waxing using natural honey wax.",
          time: "30 mins",
          price: 350,
          staff: ["Neha"],
          products: [{ name: "Post Wax Lotion", price: 199 }],
        },
        {
          name: "Full Legs Waxing",
          details: "Gentle waxing suitable for sensitive skin.",
          time: "45 mins",
          price: 600,
          staff: ["Pooja"],
          products: [{ name: "Aloe Cooling Gel", price: 249 }],
        },
      ],
    },
  ];

  const category = servicesData.find((c) => c.id === id);

  if (!category) {
    return <h2 className="text-center mt-5">Service Not Found</h2>;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-2">{category.category}</h1>
      <p className="mb-4">{category.description}</p>

      {category.services.map((service, index) => (
        <div key={index} className="card p-4 mb-4 shadow-sm">
          <h3>{service.name}</h3>
          <p>{service.details}</p>

          <p>
            <strong>⏱ Time:</strong> {service.time}
          </p>
          <p>
            <strong>💰 Price:</strong> ₹{service.price}
          </p>
          <p>
            <strong>👩‍💼 Specialist:</strong>{" "}
            {service.staff.join(", ")}
          </p>

          <h5 className="mt-3">🧴 Suggested Products</h5>
          <ul>
            {service.products.map((p, i) => (
              <li key={i}>
                {p.name} – ₹{p.price}
              </li>
            ))}
          </ul>

          <button className="btn btn-success btn-sm mt-2">
            Book Service
          </button>
        </div>
      ))}
    </div>
  );
}

export default Servicedetails;