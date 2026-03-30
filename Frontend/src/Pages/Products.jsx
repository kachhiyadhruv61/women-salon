import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

function Products() {
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
  suggestedFor: ["Facial", "Cleanup"],
  ingredients: ["Multani Mitti", "Sandalwood Powder", "Neem", "Tulsi", "Rose Petals"]
},
{
  id: 14,
  name: "Herbal Face Wash",
  price: 249,
  img: "/img/facewash.png",
  short: "100% organic herbal face wash, Removes tan, improves glow and made from pure organic ingredients.",
  suggestedFor: ["Facial", "Cleanup"],
  ingredients: ["Aloe Vera", "Neem Extract", "Tulsi", "Vitamin E", "Herbal Base"]
},
{
  id: 2,
  name: "Organic Hair Oil",
  price: 399,
  img: "/img/hairoil.png",
  short: "Strengthens hair naturally, Reduces hair fall and nourishes scalp using herbal oils.",
  suggestedFor: ["Hair Spa"],
  ingredients: ["Amla", "Bhringraj", "Coconut Oil", "Castor Oil", "Neem Oil"]
},
{
  id: 3,
  name: "Natural Skin Cream",
  price: 599,
  img: "/img/skincream.png",
  short: "Chemical free skin cream, Deep hydration and long lasting glow without side effects.",
  suggestedFor: ["Facial", "Threading"],
  ingredients: ["Aloe Vera", "Shea Butter", "Vitamin E", "Almond Oil", "Rose Extract"]
},

// 🌸 MANICURE
{
  id: 4,
  name: "Organic Cuticle Oil",
  price: 299,
  img: "/img/cuticleoil.png",
  short: "Nourishes nails & cuticles, Strengthens nails, softens cuticles and improves nail health.",
  suggestedFor: ["Manicure"],
  ingredients: ["Vitamin E Oil", "Jojoba Oil", "Almond Oil", "Lavender Oil"]
},

// 🌸 PEDICURE
{
  id: 5,
  name: "Herbal Foot Cream",
  price: 349,
  img: "/img/footcream.png",
  short: "Deep moisture for heels, Repairs cracked heels and keeps feet soft & fresh.",
  suggestedFor: ["Pedicure"],
  ingredients: ["Shea Butter", "Coconut Oil", "Neem Oil", "Aloe Vera"]
},
{
  id: 6,
  name: "Natural Foot Scrub",
  price: 399,
  img: "/img/footscrub.png",
  short: "Removes dead skin, Gently exfoliates feet using walnut & herbal extracts.",
  suggestedFor: ["Pedicure"],
  ingredients: ["Walnut Granules", "Coffee Powder", "Aloe Vera", "Essential Oils"]
},
{
  id: 13,
  name: "Herbal Foot Soak Salt",
  price: 299,
  img: "/img/foot soak salt.png",
  short: "Relaxing foot soak for pedicure, Relieves tired feet, removes odor and softens skin before pedicure.",
  ingredients: ["Epsom Salt", "Sea Salt", "Lavender Oil", "Mint Extract"]
},
{
  id: 12,
  name: "Crack Heel Repair Balm",
  price: 349,
  img: "/img/heelbalm.png",
  short: "Deep repair cracked heels, Heals cracked heels naturally with shea butter & neem oil.",
  ingredients: ["Shea Butter", "Neem Oil", "Beeswax", "Coconut Oil"]
},
{
  id: 11,
  name: "Foot Relaxation Essential Oil",
  price: 399,
  img: "/img/foot-oil.png",
  short: "Foot massage oil, Improves blood circulation and relaxes muscles after pedicure.",
  ingredients: ["Peppermint Oil", "Lavender Oil", "Eucalyptus Oil", "Carrier Oil"]
},
{
  id: 10,
  name: "Anti-Fungal Foot Spray",
  price: 279,
  img: "/img/foot-spray.png",
  short: "Keeps feet fresh & hygienic, Prevents fungal infection and keeps feet odor-free.",
  ingredients: ["Tea Tree Oil", "Neem Extract", "Aloe Vera", "Distilled Water"]
},

// 🌸 THREADING
{
  id: 7,
  name: "Aloe Vera Soothing Gel",
  price: 199,
  img: "/img/aloe vera gel.png",
  short: "Soothes skin after threading, Reduces redness and calms sensitive skin naturally.",
  suggestedFor: ["Threading"],
  ingredients: ["Aloe Vera Gel", "Cucumber Extract", "Vitamin E"]
},

// 🌸 WAXING
{
  id: 8,
  name: "Herbal Wax Powder",
  price: 449,
  img: "/img/herbal wax powder.png",
  short: "Gentle herbal waxing, Reduces pain, suitable for sensitive skin, slows hair growth.",
  suggestedFor: ["Waxing"],
  ingredients: ["Multani Mitti", "Rice Powder", "Aloe Vera", "Herbal Extracts"]
},
  // 🐟 FISH SPA
  {
    id: 9,
    name: "Fish Spa Detox Foot Gel",
    price: 449,
    img: "/img/fishspagel.png",
    short: "Pre & post fish spa foot care, Special detox gel used before and after fish spa therapy to soften skin, remove toxins and maintain hygiene.",
    suggestedFor: ["Pedicure" , "Fish Spa"],
    ingredients: ["Aloe Vera", "Tea Tree Oil", "Mint Extract", "Vitamin E"]
  },
  {
  id: 15,
  name: "Sandalwood Soap",
  price: 149,
  img: "/img/sandalwood soap.png",
  short: "Natural sandalwood soap that cleanses skin, reduces acne and gives a glowing look.",
  suggestedFor: ["Facial", "Bath"],
  ingredients: ["Sandalwood Extract", "Coconut Oil", "Glycerin", "Essential Oils"]
},
{
  id: 16,
  name: "Kesar Face Pack",
  price: 299,
  img: "/img/kesar facepack.png",
  short: "Brightening face pack enriched with saffron for glowing and radiant skin.",
  suggestedFor: ["Facial", "Skin Brightening"],
  ingredients: ["Saffron (Kesar)", "Sandalwood Powder", "Aloe Vera", "Rose Extract"]
},
{
  id: 17,
  name: "Multani Mitti Pack",
  price: 199,
  img: "/img/multani mitti.png",
  short: "Deep cleansing clay pack that removes oil, dirt and tightens pores.",
  suggestedFor: ["Oily Skin", "Acne Care"],
  ingredients: ["Multani Mitti", "Neem Powder", "Tulsi Extract"]
},
{
  id: 18,
  name: "Flower Face Pack",
  price: 249,
  img: "/img/flower facepack.png",
  short: "Herbal flower face pack with rose & lavender for soft glowing skin.",
  suggestedFor: ["Facial", "Glow Treatment"],
  ingredients: ["Rose Petals", "Lavender", "Chamomile", "Aloe Vera"]
},
{
  id: 19,
  name: "Fruit Soap Combo",
  price: 399,
  img: "/img/fruit soap pack.png",
  short: "Pack of fruit soaps that gently cleanse and nourish skin naturally.",
  suggestedFor: ["Bath", "Daily Use"],
  ingredients: ["Orange Extract", "Strawberry Extract", "Lemon Extract", "Glycerin", "Coconut Oil"]
},
{
  id: 20,
  name: "Fruit Cleanser",
  price: 249,
  img: "/img/rose fruit clean scrub.png",
  short: "Refreshing fruit cleanser that removes dirt and improves skin glow.",
  suggestedFor: ["Face Wash", "Daily Use"],
  ingredients: ["Orange Extract", "Aloe Vera", "Vitamin C", "Herbal Base"]
},
{
  id: 21,
  name: "Fruit Scrub",
  price: 299,
  img: "/img/rose fruit clean scrub.png",
  short: "Gentle exfoliating scrub for removing dead skin and smooth texture.",
  suggestedFor: ["Exfoliation", "Glow"],
  ingredients: ["Walnut Granules", "Strawberry Extract", "Honey", "Aloe Vera"]
},
{
  id: 22,
  name: "Herbal Hair Oil",
  price: 399,
  img: "/img/hair oil.png",
  short: "Natural hair oil that reduces hair fall and strengthens roots.",
  suggestedFor: ["Hair Care", "Hair Fall"],
  ingredients: ["Amla", "Bhringraj", "Coconut Oil", "Castor Oil"]
},
{
  id: 23,
  name: "Amla Powder",
  price: 199,
  img: "/img/amla powder.png",
  short: "Pure amla powder for strong, shiny and healthy hair.",
  suggestedFor: ["Hair Mask", "Hair Growth"],
  ingredients: ["100% Pure Amla Powder"]
},
{
  id: 24,
  name: "Ashwagandha Powder",
  price: 249,
  img: "/img/ashwagandha.png",
  short: "Herbal powder that improves scalp health and reduces hair fall.",
  suggestedFor: ["Hair Care", "Wellness"],
  ingredients: ["Ashwagandha Root Powder"]
},
{
  id: 25,
  name: "Aritha Powder",
  price: 199,
  img: "/img/aritha.png",
  short: "Natural hair cleanser that adds shine and removes dirt gently.",
  suggestedFor: ["Hair Wash"],
  ingredients: ["Reetha (Aritha) Powder"]
},
{
  id: 26,
  name: "Shikakai Powder",
  price: 199,
  img: "/img/shikakai.png",
  short: "Traditional herb for soft, silky and dandruff-free hair.",
  suggestedFor: ["Hair Wash", "Conditioning"],
  ingredients: ["Shikakai Powder"]
},
{
  id: 27,
  name: "Onion Powder",
  price: 199,
  img: "/img/onionpowder.png",
  short: "Boosts hair growth and reduces hair fall naturally.",
  suggestedFor: ["Hair Growth"],
  ingredients: ["Onion Extract Powder"]
},
{
  id: 28,
  name: "Rose Water",
  price: 199,
  img: "/img/rosewater.png",
  short: "Refreshing toner that hydrates and soothes the skin.",
  suggestedFor: ["Toner", "Face Mist"],
  ingredients: ["Rose Extract", "Distilled Water"]
},
{
  id: 29,
  name: "Mehendi Powder",
  price: 249,
  img: "/img/mehendipowder.png",
  short: "Natural henna powder for hair coloring and conditioning.",
  suggestedFor: ["Hair Coloring", "Conditioning"],
  ingredients: ["100% Natural Henna Leaves Powder"]
},
{
  id: 30,
  name: "Multani Mitti Wax Powder",
  price: 299,
  img: "/img/multani container.png",
  short: "Herbal wax powder for smooth skin and natural hair removal.",
  suggestedFor: ["Hair Removal", "Skin Care"],
  ingredients: ["Multani Mitti", "Herbal Extracts"]
},
{
  id: 31,
  name: "Rose Wax Powder",
  price: 299,
  img: "/img/rose wax powder.png",
  short: "Gentle rose-based wax powder suitable for sensitive skin.",
  suggestedFor: ["Hair Removal", "Sensitive Skin"],
  ingredients: ["Rose Extract", "Herbal Wax Base"]
}
];

  

  const handleQtyChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: value,
    });
  };

const handleAddToCart = (product) => {
  const qty = quantities[product._id] || 1;

  addToCart({
    _id: product._id,
    name: product.name,
    price: product.amount, // ✅ number fix
    img: product.img,
    qty: qty   // ✅ FIX (qty → quantity)
  });
  navigate("/cartsummary");
};
  const buyNow = (product) => {
  const qty = quantities[product._id] || 1;
  addToCart(product, qty);
  navigate("/cart");
};

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="font-dancing-script text-primary">Our Organic Products</h1>
      </div>
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">

  <span>🌿 Organic Ingredients</span>
  <span>🧪 Chemical-Free</span>
  <span>🌸 Handmade</span>
  <span>🛡 Safe for Regular Use</span>

</div>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4 d-flex" key={product._id}>
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
{/* 🌿 Ingredients */}
<div className="ingredients-box mt-2 text-start">
  <span className="fw-semibold">Ingredients:</span>
  <div className="d-flex flex-wrap gap-1 mt-1">
    {product.ingredients?.map((ing, i) => (
      <span key={i} className="badge ingredient-badge">
        {ing}
      </span>
    ))}
  </div>
</div>

              <h6 className="text-success">₹{product.price}</h6>

              {/* 🔢 Quantity */}
              <div className="d-flex justify-content-center align-items-center mb-3">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    handleQtyChange(
                      product._id,
                      Math.max(1, (quantities[product._id] || 1) - 1)
                    )
                  }
                >
                  -
                </button>

                <span className="mx-3">
                  {quantities[product._id] || 1}
                </span>

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    handleQtyChange(
                      product._id,
                      Math.min(10, (quantities[product._id] || 1) + 1)
                    )
                  }
                >
                  +
                </button>
              </div>

              {/* 🛒 Buttons */}
              <div className="d-flex gap-2 justify-content-center">

  {/* 🛒 Add To Cart */}
  <button
    className="btn btn-warning"
    onClick={() => handleAddToCart(product)}
  >
    Add to Cart
  </button>

  {/* 💳 Buy Now */}
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
       <div className="text-center mt-4">
  <p
    style={{
      background: "#fff3cd",
      color: "#856404",
      padding: "10px 15px",
      borderRadius: "10px",
      display: "inline-block",
      fontSize: "13px"
    }}
  >
    ⚠️ Results may vary depending on skin type. Please do a patch test before use.
  </p>
</div>
    </div>
  );
}

export default Products;
