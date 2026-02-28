import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const products = [
  {
    id: 1,
    name: "Herbal Face Pack",
    price: 499,
    img: "/img/facepack.png",
    short: "100% organic herbal face pack",
    description:
      "Removes tan, improves glow and made from pure organic ingredients.",
    suggestedFor: ["Facial", "Cleanup"],
  },
  {
    id: 2,
    name: "Organic Hair Oil",
    price: 399,
    img: "/img/hairoil.png",
    short: "Strengthens hair naturally",
    description:
      "Reduces hair fall and nourishes scalp using herbal oils.",
    suggestedFor: ["Hair Spa"],
  },
  {
    id: 3,
    name: "Natural Skin Cream",
    price: 599,
    img: "/img/skincream.png",
    short: "Chemical free skin cream",
    description:
      "Deep hydration and long lasting glow without side effects.",
    suggestedFor: ["Facial", "Threading"],
  },

  // 🌸 MANICURE
  {
    id: 4,
    name: "Organic Cuticle Oil",
    price: 299,
    img: "/img/cuticle-oil.png",
    short: "Nourishes nails & cuticles",
    description:
      "Strengthens nails, softens cuticles and improves nail health.",
    suggestedFor: ["Manicure"],
  },

  // 🌸 PEDICURE
  {
    id: 5,
    name: "Herbal Foot Cream",
    price: 349,
    img: "/img/footcream.png",
    short: "Deep moisture for heels",
    description:
      "Repairs cracked heels and keeps feet soft & fresh.",
    suggestedFor: ["Pedicure"],
  },
  {
    id: 6,
    name: "Natural Foot Scrub",
    price: 399,
    img: "/img/footscrub.png",
    short: "Removes dead skin",
    description:
      "Gently exfoliates feet using walnut & herbal extracts.",
    suggestedFor: ["Pedicure"],
  },
   {
      id: 13,
      name: "Herbal Foot Soak Salt",
      price: 299,
      img: "/img/footsoak.png",
      short: "Relaxing foot soak for pedicure",
      description:
        "Relieves tired feet, removes odor and softens skin before pedicure.",
    },
    {
      id: 12,
      name: "Crack Heel Repair Balm",
      price: 349,
      img: "/img/heelbalm.png",
      short: "Deep repair cracked heels",
      description:
        "Heals cracked heels naturally with shea butter & neem oil.",
    },
    {
      id: 11,
      name: "Foot Relaxation Essential Oil",
      price: 399,
      img: "/img/foot-oil.png",
      short: "Foot massage oil",
      description:
        "Improves blood circulation and relaxes muscles after pedicure.",
    },
    {
      id: 10,
      name: "Anti-Fungal Foot Spray",
      price: 279,
      img: "/img/foot-spray.png",
      short: "Keeps feet fresh & hygienic",
      description:
        "Prevents fungal infection and keeps feet odor-free.",
    },

  // 🌸 THREADING
  {
    id: 7,
    name: "Aloe Vera Soothing Gel",
    price: 199,
    img: "/img/aloevera.png",
    short: "Soothes skin after threading",
    description:
      "Reduces redness and calms sensitive skin naturally.",
    suggestedFor: ["Threading"],
  },

  // 🌸 WAXING
  {
    id: 8,
    name: "Herbal Wax Powder",
    price: 449,
    img: "/img/herbalwax.png",
    short: "Gentle herbal waxing",
    description:
      "Reduces pain, suitable for sensitive skin, slows hair growth.",
    suggestedFor: ["Waxing"],
  },
  // 🐟 FISH SPA / PEDICURE (NEW)
  {
    id: 9,
    name: "Fish Spa Detox Foot Gel",
    price: 449,
    img: "/img/fish-spa-gel.png",
    short: "Pre & post fish spa foot care",
    description:
      "Special detox gel used before and after fish spa therapy to soften skin, remove toxins and maintain hygiene.",
    suggestedFor: ["Pedicure", "Fish Spa"],
  },
];


  const addToCart = () => {
    // Add your product to cart logic here
    console.log("Product added to cart:", products);

    // Navigate to cart page
    navigate("/cart");
  };

  const buyNow = () => {
    navigate("/checkout", {
      state: {
        product: selectedProduct,
        quantity: qty,
      },
    });
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Our Organic Products 🌿</h1>

      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card h-100 text-center p-3">
              <img
                src={product.img}
                alt={product.name}
                className="img-fluid mb-3"
                style={{ height: "180px", objectFit: "contain" }}
              />
              <h5>{product.name}</h5>
              <p>{product.short}</p>
              <h6 className="text-success">₹{product.price}</h6>

              <button
                className="btn btn-primary mt-2"
                onClick={() => {
                  setSelectedProduct(product);
                  setQty(1);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔽 DETAILS */}
      {selectedProduct && (
        <div className="mt-5 p-4 border rounded bg-light">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="img-fluid"
              />
            </div>

            <div className="col-md-8">
              <h2>{selectedProduct.name}</h2>
              <h4 className="text-success">₹{selectedProduct.price}</h4>
              <p>{selectedProduct.description}</p>

              {/* Quantity */}
              <div className="d-flex align-items-center mb-3">
                <button
                  className="btn btn-secondary"
                  disabled={qty === 1}
                  onClick={() => setQty(qty - 1)}
                >
                  -
                </button>
                <span className="mx-3">{qty}</span>
                <button
                  className="btn btn-secondary"
                  disabled={qty === 10}
                  onClick={() => setQty(qty + 1)}
                >
                  +
                </button>
              </div>

             <button className="btn btn-warning me-2" onClick={addToCart}>
                 Add to Cart
            </button>

              

              <button className="btn btn-success me-2" onClick={buyNow}>
                Buy Now
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;