import { useParams, Link } from "react-router-dom";
import { useState } from "react";

function Servicedetails() {
  const { id } = useParams();
  const [location, setLocation] = useState("salon");

  const servicesData = [
    /* ================= FACIAL ================= */
    {
      id: "facial",
      category: "Facial & Cleanup",
      description:
        "Live fruit & organic facial services at salon, natural place or your home.",
      services: [
        {
          name: "Organic Cleanup",
          details: "Gentle herbal & fruit-based cleanup.",
          locationDetails: {
            salon: { price: 700, time: "40 mins", staff: ["Aarti"] },
            natural: {
              price: 1100,
              time: "60 mins",
              staff: ["Aarti"],
              note: "Fresh fruit facial prepared live",
            },
            home: { price: 1300, time: "70 mins", staff: [] },
              products: [{ name: "Herbal Face Wash", price: 249 }],

          },
        },
         {
          name: "Gold Facial",
          details: "Premium glow facial with organic products.",
          locationDetails: {
            salon: { price: 1500, time: "60 mins", staff: ["Neha"] },
            natural: { price: 2000, time: "75 mins", staff: ["Neha"] },
            home: { price: 2300, time: "90 mins", staff: [] },
              products: [{ name: "Gold Facial Kit", price: 899 }],

          },
        },
      ],
      
   },
    
    /* ================= HAIR ================= */
    {
      id: "hair",
      category: "Hair Services",
      description: "Organic hair care & styling services.",
      services: [
          {
      name: "Hair Cut",
      details:
        "Choose your preferred haircut shape done by trained female stylists.Professional haircut & organic wash.",
      shapes: [
        "Layer Cut",
        "Step Cut",
        "U Cut",
        "V Cut",
        "Feather Cut",
        "Bob Cut",
        "Lob (Long Bob)",
        "Straight Cut",
        "Butterfly Cut",
        "Curtain Bangs",
        "Front Fringe",
        "Korean Style Cut",
      ],

          
          locationDetails: {
            salon: { price: 500, time: "45 mins", staff: ["Neha"] },
            natural: { price: 800, time: "60 mins", staff: ["Neha"] },
            home: { price: 1000, time: "60 mins", staff: [] },
              products: [
            { name: "Herbal Shampoo", price: 299 },
            { name: "Organic Hair Serum", price: 399 },
          ],
          },
        },
        {
          name: "Hair Spa",
          details: "Deep nourishment hair spa.",
          locationDetails: {
            salon: { price: 1200, time: "1 hr", staff: ["Pooja"] },
            natural: { price: 1600, time: "90 mins", staff: ["Pooja"] },
            home: { price: 1800, time: "90 mins", staff: [] },
             products: [{ name: "Hair Spa Cream", price: 499 }],


          },
        },
      ],
    },

    /* ================= MANICURE ================= */
{
  id: "manicure",
  category: "Manicure Services",
  description: "Organic manicure for clean & healthy hands.",
  services: [
    {
      name: "Classic Manicure",
      details: "Nail shaping, cuticle care & massage.",
      locationDetails: {
        salon: { price: 400, time: "30 mins", staff: ["Pooja"] },
        natural: { price: 650, time: "45 mins", staff: ["Pooja"] },
        home: { price: 750, time: "45 mins", staff: [] },
        products: [{ name: "Hand Cream", price: 199 }],
      },
    },
  ],
},

 /* ================= MEHENDI ================= */
{
  id: "mehendi",
  category: "Mehendi Services",
  description:
    "Traditional & modern organic mehendi designs for all occasions using natural henna.",
  services: [
    {
      name: "Basic Hand Mehendi",
      details:
        "Simple and elegant mehendi design for hands using 100% organic henna.",
      locationDetails: {
        salon: {
          price: 500,
          time: "30 mins",
          staff: ["Priya"],
        },
        natural: {
          price: 700,
          time: "45 mins",
          staff: ["Priya"],
        },
        home: {
          price: 900,
          time: "45 mins",
          staff: [],
        },
        products: [
          { name: "Organic Henna Cone", price: 199 },
          { name: "Lemon Sugar Sealant", price: 99 },
        ],
      },
    },
    {
      name: "Bridal Mehendi",
      details:
        "Detailed bridal mehendi for hands & legs with dark color guarantee.",
      locationDetails: {
        salon: {
          price: 3500,
          time: "4–5 hrs",
          staff: ["Ayra"],
        },
        natural: {
          price: 4200,
          time: "4–5 hrs",
          staff: ["Ayra"],
        },
        home: {
          price: 5000,
          time: "4–5 hrs",
          staff: ["Ayra"],
        },
        products: [
          { name: "Premium Bridal Henna Kit", price: 999 },
          { name: "Herbal Mehendi Oil", price: 299 },
        ],
      },
    },
    {
      name: "Arabic Mehendi",
      details:
        "Bold Arabic mehendi designs suitable for festivals & functions.",
      locationDetails: {
        salon: {
          price: 800,
          time: "45 mins",
          staff: ["Riya", "Neha"],
        },
        natural: {
          price: 1100,
          time: "1 hr",
          staff: ["Riya"],
        },
        home: {
          price: 1300,
          time: "1 hr",
          staff: [],
        },
        products: [
          { name: "Arabic Henna Cone", price: 249 },
        ],
      },
    },
  ],
},


    /* ================= PEDICURE ================= */
    {
      id: "pedi",
      category: "Pedicure Services",
      description: "Relaxing organic pedicure treatments.",
      services: [
        {
          name: "Spa Pedicure",
          details: "Foot soak, scrub & massage.",
          locationDetails: {
            salon: { price: 999, time: "60 mins", staff: ["Reena"] },
            natural: { price: 1400, time: "75 mins", staff: ["Reena"] },
            home: { price: 1600, time: "90 mins", staff: [] },
          },
        },
         {
          name: "Classic Pedicure",
          details: "Foot soak, scrub & massage.",
          locationDetails: {
            salon: { price: 999, time: "60 mins", staff: ["Reena"] },
            natural: { price: 1400, time: "75 mins", staff: ["Reena"] },
            home: { price: 1600, time: "90 mins", staff: [] },
          },
        },
        {
          name: "Fish Tank Therapy 🐟",
          details: "Doctor fish remove dead skin naturally.",
          locationDetails: {
            salon: { price: 1299, time: "30 mins", staff: ["Neha"] },
            natural: {
              price: 1700,
              time: "40 mins",
              staff: [],
              note: "Eco-friendly fish therapy setup",
            },
            home: { price: "-", time: "-", staff: [] },
             suggestedProducts: [
        {
          name: "Herbal Foot Cream",
          price: "₹349",
          img: "/img/footcream.png",
        },
        {
          name: "Natural Foot Scrub",
          price: "₹399",
          img: "/img/footscrub.png",
        },
        {
          name: "Fish Therapy Hygiene Spray",
          price: "₹299",
          img: "/img/fish-spray.png",
        },
      ],

          },
        },
      ],
    },

    /* ================= WAXING ================= */
    {
      id: "waxing",
      category: "Waxing Services",
      description: "Natural honey & sugar waxing.",
      services: [
        {
          name: "Full Arms Waxing",
          details: "Smooth waxing for sensitive skin.",
          locationDetails: {
            salon: { price: 350, time: "30 mins", staff: ["Diya"] },
            natural: { price: 550, time: "40 mins", staff: ["Diya"] },
            home: { price: 700, time: "45 mins", staff: [] },
              products: [{ name: "Post Wax Lotion", price: 199 }],

          },
        },
         {
          name: " Full Legs Waxing",
          details: "Gentle waxing suitable for sensitive skin.",
          locationDetails: {
            salon: { price: 350, time: "30 mins", staff: ["Diya"] },
            natural: { price: 550, time: "40 mins", staff: ["Diya"] },
            home: { price: 700, time: "45 mins", staff: [] },
             products: [{ name: "Aloe Cooling Gel", price: 249 }],

          },
        },
      ],
    },

    /* ================= THREADING ================= */
    {
      id: "threading",
      category: "Threading Services",
      description: "Precise threading for perfect shape.",
      services: [
        {
          name: "Eyebrow Threading",
          details: "Perfect eyebrow shaping.",
          locationDetails: {
            salon: { price: 100, time: "15 mins", staff: ["Riya"] },
            natural: { price: 150, time: "20 mins", staff: ["Riya"] },
            home: { price: 200, time: "20 mins", staff: [] },
            products: [{ name: "Aloe Vera Gel", price: 149 }],

          },
        },
         {
          name: "Upper Lip Threading",
          details: "Gentle threading for upper lips.",
          locationDetails: {
            salon: { price: 80, time: "15 mins", staff: ["Riya"] },
            natural: { price: 100, time: "20 mins", staff: ["Riya"] },
            home: { price: 150, time: "20 mins", staff: [] },
            products: [{ name: "Soothing Gel", price: 129 }],


          },
        },
      ],
    },

    /* ================= BRIDAL ================= */
   {
  id: "bridal",
  category: "Bridal Package",
  description: "Complete organic bridal beauty services (Pre-bridal to Wedding day).",
  services: [
    {
      name: "Full Bridal Package",
      details:
        "Pre-bridal services, bridal day makeup, hairstyle, mehendi & organic skin care.",
      
      includes: [
        // 1️⃣ Pre-Bridal Services
        "Pre-Bridal Consultation",
        "Organic Fruit Facial (Multiple Sittings)",
        "Full Body Polishing / Scrub",
        "Hair Spa / Hair Treatment",
        "Manicure",
        "Pedicure",
        "Threading (Eyebrow + Upper Lip)",
        "Full Body Waxing",
        "Mehendi Trial (Optional)",

        // 2️⃣ Bridal Day Services
        "Bridal Makeup (HD / Airbrush / Organic)",
        "Bridal Hairstyle",
        "Dupatta / Saree / Lehenga Draping",
        "Eye Makeup & Eye Lashes",
        "Organic Skin Prep",
        "Touch-up Kit for Bride",

        // 3️⃣ Mehendi Services
        "Full Hand Mehendi",
        "Leg Mehendi",
        "Bridal Mehendi (Dark Stain Guarantee)",
        "Natural Henna Only",
      ],

      packageTypes: [
        {
          type: "💎 Basic Bridal Package",
          priceRange: "₹5,000 – ₹7,000",
          includes: [
            "Pre-Bridal Facial",
            "Waxing",
            "Manicure + Pedicure",
            "Bridal Makeup & Hairstyle",
          ],
        },
        {
          type: "👑 Premium Bridal Package",
          priceRange: "₹9,000 – ₹12,000",
          includes: [
            "Multiple Fruit Facials",
            "Hair Spa",
            "Full Body Polishing",
            "Bridal Makeup + Hairstyle",
            "Mehendi (Hands)",
            "Draping",
          ],
        },
        {
          type: "🌿 Luxury Organic Bridal Package",
          priceRange: "₹15,000 – ₹20,000",
          includes: [
            "Live Fruit Facial (Natural Place)",
            "Herbal Body Polishing",
            "Hair Treatment",
            "HD Bridal Makeup",
            "Full Bridal Mehendi",
            "Touch-up Kit",
          ],
        },
      ],

      locationDetails: {
        salon: {
          price: 6000,
          time: "6 hrs",
          staff: ["Senior Team"],
          availability: "Full Package",
        },
        natural: {
          price: 8500,
          time: "7 hrs",
          staff: [],
          availability: "Premium Package",
        },
        home: {
          price: 9000,
          time: "7 hrs",
          staff: [],
          availability: "Limited / On Request",
          products: [
            { name: "Bridal Glow Kit", price: 1999 },
            { name: "Organic Makeup Kit", price: 2499 },
          ],

        },
        suggestedProducts: [
  {
    name: "Organic Bridal Glow Face Pack",
    usage: "Use twice a week before wedding",
  },
  {
    name: "Herbal Hair Growth Oil",
    usage: "Apply 2–3 times a week",
  },
  {
    name: "Natural Ubtan Powder",
    usage: "Use for pre-bridal body polishing",
  },
  {
    name: "Rose Water Toner",
    usage: "Daily skin refresh & hydration",
  },
  {
    name: "Mehendi Care Balm",
    usage: "Apply after mehendi for dark stain",
  },
],

      },
    },
    
  ],
},


    /* ================= LIVE FRUIT SERVICE ================= */
    {
      id: "live",
      category: "Live Fruit Beauty Services",
      description:
        "Fresh fruits prepared live for skin & foot treatments.",
      services: [
        {
          name: "Live Fruit Facial",
          details: "Papaya, orange & aloe vera facial.",
          locationDetails: {
            salon: { price: 1200, time: "60 mins", staff: ["Aarti"] },
            natural: {
              price: 1800,
              time: "75 mins",
              staff: ["Aarti"],
              note: "Prepared in front of client",
            },
            home: { price: 2000, time: "80 mins", staff: [] },
          },
        },
      ],
    },


  ];
  

  const category = servicesData.find((c) => c.id === id);
  if (!category) return <h2 className="text-center mt-5">Service Not Found</h2>;

  return (
    <div className="container py-5">
      <h1>{category.category}</h1>
      <p className="mb-4">{category.description}</p>

      {/* LOCATION */}
      <div className="mb-4">
        <h5>Select Service Location</h5>
        {["salon", "natural", "home"].map((loc) => (
          <label key={loc} className="me-4">
            <input
              type="radio"
              checked={location === loc}
              onChange={() => setLocation(loc)}
            />{" "}
            {loc === "salon"
              ? "At Salon"
              : loc === "natural"
              ? "At Natural Place"
              : "At Home"}
          </label>
        ))}
      </div>

      {category.services.map((service, i) => {
  const data = service.locationDetails[location];
  const staffAvailable = data.staff && data.staff.length > 0;

  return (
    <div key={i} className="card p-4 mb-4 shadow-sm">
<h3>{service.name}</h3>
<p>{service.details}</p>

            {service.shapes && (
  <>
    <h6 className="mt-3">✂️ Available Hair Cut Shapes</h6>
    <ul>
      {service.shapes.map((shape, i) => (
        <li key={i}>{shape}</li>
      ))}
    </ul>
  </>
)}

          {service.includes && (
  <>
    <h6 className="mt-3 text-primary">🎁 Bridal Package Includes</h6>
    <ul className="list-unstyled">
      {service.includes.map((item, i) => (
        <li key={i} className="mb-1">✅ {item}</li>
      ))}
    </ul>
  </>
)}
{service.packageTypes && (
  <>
    <h5 className="mt-4">💍 Bridal Package Options</h5>
    {service.packageTypes.map((pkg, i) => (
      <div key={i} className="border rounded p-3 mb-3">
        <h6>{pkg.type}</h6>
        <p><strong>{pkg.priceRange}</strong></p>
        <ul>
          {pkg.includes.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      </div>
    ))}
  </>
)}
 {service.locationDetails.products &&
 service.locationDetails.products.length > 0 && (
  <div className="mt-3">
    <h6 className="text-success">🧴 Products Used</h6>
    <ul>
      {service.locationDetails.products.map((p, i) => (
        <li key={i}>
          {p.name} – ₹{p.price}
        </li>
      ))}
    </ul>
  </div>
)},

            <p><strong>⏱ Time:</strong> {data.time}</p>
            <p><strong>💰 Price:</strong> ₹{data.price}</p>
            <p><strong>👩‍💼 Staff:</strong> {staffAvailable ? data.staff.join(", ") : "Not Available"}</p>
          
            {data.note && <p className="text-success">🌿 {data.note}</p>}


            {staffAvailable ? (
              <Link to="/register" className="btn btn-success btn-sm mt-2">
                Register & Book Now
              </Link>
            ) : (
              <p className="text-danger mt-2">❌ Not available at this location</p>
            )}
            
          </div>
        );
      })}
    </div>
  );
}

export default Servicedetails;
