import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Pages/CartContext";

function UserShop() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // 🔥 Quantity per product maintain karva mate object
  const [quantities, setQuantities] = useState({});

 const products = [
  // 🌿 FACIAL
  {
    id: 1,
    name: "Herbal Face Pack",
    price: 499,
    img: "/img/facepack.png",
    short: "100% organic herbal face pack, Removes tan, improves glow and made from pure organic ingredients.",
    suggestedFor: ["Facial" , "Cleanup"],

  },
  {
    id: 14,
    name: "Herbal Face Wash",
    price: 249,
    img: "/img/facewash.png",
    short: "100% organic herbal face wash, Removes tan, improves glow and made from pure organic ingredients.",
    suggestedFor: ["Facial" , "Cleanup"],
  },

  {
    id: 2,
    name: "Organic Hair Oil",
    price: 399,
    img: "/img/hairoil.png",
    short: "Strengthens hair naturally, Reduces hair fall and nourishes scalp using herbal oils.",
    suggestedFor: ["Hair Spa"],
  },
  {
    id: 3,
    name: "Natural Skin Cream",
    price: 599,
    img: "/img/skincream.png",
    short: "Chemical free skin cream, Deep hydration and long lasting glow without side effects.",
    suggestedFor: ["Facial" , "Threading"],
  },

  // 🌸 MANICURE
  {
    id: 4,
    name: "Organic Cuticle Oil",
    price: 299,
    img: "/img/cuticleoil.png",
    short: "Nourishes nails & cuticles, Strengthens nails, softens cuticles and improves nail health.",
    suggestedFor: ["Manicure"],
  },

  // 🌸 PEDICURE
  {
    id: 5,
    name: "Herbal Foot Cream",
    price: 349,
    img: "/img/footcream.png",
    short: "Deep moisture for heels, Repairs cracked heels and keeps feet soft & fresh.",
    suggestedFor: ["Pedicure"],

  },
  {
    id: 6,
    name: "Natural Foot Scrub",
    price: 399,
    img: "/img/footscrub.png",
    short: "Removes dead skin, Gently exfoliates feet using walnut & herbal extracts.",
    suggestedFor: ["Pedicure"],
  },
  {
    id: 13,
    name: "Herbal Foot Soak Salt",
    price: 299,
    img: "/img/foot soak salt.png",
    short: "Relaxing foot soak for pedicure, Relieves tired feet, removes odor and softens skin before pedicure.",
  },
  {
    id: 12,
    name: "Crack Heel Repair Balm",
    price: 349,
    img: "/img/heelbalm.png",
    short: "Deep repair cracked heels, Heals cracked heels naturally with shea butter & neem oil.",
  },
  {
    id: 11,
    name: "Foot Relaxation Essential Oil",
    price: 399,
    img: "/img/foot-oil.png",
    short: "Foot massage oil, Improves blood circulation and relaxes muscles after pedicure.",
  },
  {
    id: 10,
    name: "Anti-Fungal Foot Spray",
    price: 279,
    img: "/img/foot-spray.png",
    short: "Keeps feet fresh & hygienic, Prevents fungal infection and keeps feet odor-free.",
  },

  // 🌸 THREADING
  {
    id: 7,
    name: "Aloe Vera Soothing Gel",
    price: 199,
    img: "/img/aloe vera gel.png",
    short: "Soothes skin after threading, Reduces redness and calms sensitive skin naturally.",
    suggestedFor: ["Threading"],
  },

  // 🌸 WAXING
  {
    id: 8,
    name: "Herbal Wax Powder",
    price: 449,
    img: "/img/herbal wax powder.png",
    short: "Gentle herbal waxing, Reduces pain, suitable for sensitive skin, slows hair growth.",
    suggestedFor: ["Waxing"],
  },

  // 🐟 FISH SPA
  {
    id: 9,
    name: "Fish Spa Detox Foot Gel",
    price: 449,
    img: "/img/fishspagel.png",
    short: "Pre & post fish spa foot care, Special detox gel used before and after fish spa therapy to soften skin, remove toxins and maintain hygiene.",
    suggestedFor: ["Pedicure" , "Fish Spa"],
  },
];

  

  const handleQtyChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: value,
    });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);
    alert("Product added to cart ✅");
  };

  const buyNow = (product) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);
    navigate("/checkout");
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary mb-4">Our Organic Products</h1>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4 d-flex" key={product.id}>
            <div className="card p-3 text-center h-100 product-card">
              <img
                src={product.img}
                alt={product.name}
                className="img-fluid mb-3"
                style={{ height: "180px", objectFit: "contain" }}
              />

              <h5 className="product-title">
                {product.name}
              </h5>

              <p>{product.short}</p>
             <div className="suggested-box">
  <span>Suggested For:</span>{" "}
  {product.suggestedFor?.length
    ? product.suggestedFor.join(", ")
    : "General Use"}
</div>
              <h6 className="text-success">₹{product.price}</h6>

              {/* 🔢 Quantity */}
              <div className="d-flex justify-content-center align-items-center mb-3">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    handleQtyChange(
                      product.id,
                      Math.max(1, (quantities[product.id] || 1) - 1)
                    )
                  }
                >
                  -
                </button>

                <span className="mx-3">
                  {quantities[product.id] || 1}
                </span>

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    handleQtyChange(
                      product.id,
                      Math.min(10, (quantities[product.id] || 1) + 1)
                    )
                  }
                >
                  +
                </button>
              </div>

              {/* 🛒 Buttons */}
              <div className="d-flex gap-2 justify-content-center">
                <button
                  className="btn btn-warning"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => buyNow(product)}
                >
                  Buy Now
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserShop;
