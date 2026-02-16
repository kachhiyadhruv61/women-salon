import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Pages/CartContext";

function UserShop() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // 🔥 Per product quantity store karva mate object
  const [quantities, setQuantities] = useState({});

  const products = [
    {
      id: 1,
      name: "Herbal Face Pack",
      price: 499,
      img: "/img/facepack.png",
      short: "100% organic herbal face pack",
    },
    {
      id: 2,
      name: "Organic Hair Oil",
      price: 399,
      img: "/img/hairoil.png",
      short: "Strengthens hair naturally",
    },
    {
      id: 3,
      name: "Natural Skin Cream",
      price: 599,
      img: "/img/skincream.png",
      short: "Chemical free skin cream",
    },
    {
      id: 4,
      name: "Organic Cuticle Oil",
      price: 299,
      img: "/img/cuticle-oil.png",
      short: "Nourishes nails & cuticles",
    },
    {
      id: 5,
      name: "Herbal Foot Cream",
      price: 349,
      img: "/img/footcream.png",
      short: "Deep moisture for heels",
    },
    {
      id: 6,
      name: "Natural Foot Scrub",
      price: 399,
      img: "/img/footscrub.png",
      short: "Removes dead skin",
    },
    {
      id: 13,
      name: "Herbal Foot Soak Salt",
      price: 299,
      img: "/img/footsoak.png",
      short: "Relaxing foot soak",
    },
    {
      id: 12,
      name: "Crack Heel Repair Balm",
      price: 349,
      img: "/img/heelbalm.png",
      short: "Deep repair cracked heels",
    },
    {
      id: 11,
      name: "Foot Relaxation Essential Oil",
      price: 399,
      img: "/img/foot-oil.png",
      short: "Foot massage oil",
    },
    {
      id: 10,
      name: "Anti-Fungal Foot Spray",
      price: 279,
      img: "/img/foot-spray.png",
      short: "Keeps feet fresh & hygienic",
    },
    {
      id: 7,
      name: "Aloe Vera Soothing Gel",
      price: 199,
      img: "/img/aloevera.png",
      short: "Soothes skin after threading",
    },
    {
      id: 8,
      name: "Herbal Wax Powder",
      price: 449,
      img: "/img/herbalwax.png",
      short: "Gentle herbal waxing",
    },
    {
      id: 9,
      name: "Fish Spa Detox Foot Gel",
      price: 449,
      img: "/img/fish-spa-gel.png",
      short: "Pre & post fish spa foot care",
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
      <h1 className="text-center mb-4">Our Organic Products 🌿</h1>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card p-3 text-center shadow-sm">
              <img
                src={product.img}
                alt={product.name}
                className="img-fluid mb-3"
                style={{ height: "180px", objectFit: "contain" }}
              />

              <h5>{product.name}</h5>
              <p>{product.short}</p>
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
