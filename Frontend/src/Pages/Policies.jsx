function Policies() {
  return (
    <div className="container py-5">

      <h2 className="text-center mb-5" style={{ color: "#bf9456" }}>
        Our Policies
      </h2>

      {/* 🔐 PRIVACY POLICY */}
      <div className="mb-5">
        <h4 className="mb-3">Privacy Policy</h4>

        <p>
          At A² Women Organic Salon, we respect your privacy and are committed 
          to protecting your personal information.
        </p>

        <p>
          We may collect your name, phone number, email address, and delivery 
          address when you place an order or register on our website.
        </p>

        <p>
          Your information is used only for:
        </p>
        <ul>
          <li>Processing orders and providing services</li>
          <li>Customer support and communication</li>
          <li>Improving our products and services</li>
        </ul>

        <p>
          We do not sell or share your personal information with third parties, 
          except when required for delivery services or legal purposes.
        </p>

        <p>
          Your data is stored securely and protected from unauthorized access.
        </p>
      </div>

      {/* 💸 REFUND POLICY */}
      <div className="mb-5">
        <h4 className="mb-3">Return & Refund Policy</h4>

        <p>
          We ensure that all our products are carefully checked before delivery. 
          However, in case of any issue:
        </p>

        <ul>
          <li>
            Returns are accepted only for damaged, defective, or wrong products.
          </li>
          <li>
            You must inform us within 24 hours of receiving the product.
          </li>
          <li>
            The product must be unused and in its original packaging.
          </li>
        </ul>

        <p>
          Refunds will be processed after verification of the returned product.
        </p>

        <ul>
          <li>Refund time: 5–7 working days</li>
          <li>Refund will be credited to original payment method</li>
        </ul>

        <p>
          The following items are non-returnable:
        </p>

        <ul>
          <li>Used or opened products</li>
          <li>Hygiene-related items</li>
          <li>Products damaged due to misuse</li>
        </ul>
      </div>

      {/* 🚚 DELIVERY POLICY */}
      <div className="mb-5">
        <h4 className="mb-3">Delivery Policy</h4>

        <p>
          We currently provide delivery services within selected city areas only.
        </p>

        <ul>
          <li>Delivery time: 1–3 working days</li>
          <li>Delivery charges may apply based on location</li>
          <li>Same-day delivery may be available for nearby areas</li>
        </ul>

        <p>
          For customers outside the delivery area, products can be collected 
          directly from our salon.
        </p>

        <p>
          We are not responsible for delays caused by unforeseen circumstances 
          such as weather, traffic, or courier issues.
        </p>
      </div>

      {/* ⚠️ GENERAL POLICY */}
      <div className="mb-5">
        <h4 className="mb-3">General Policy</h4>

        <p>
          All products are made using organic and natural ingredients. However, 
          we recommend customers to check ingredients before use to avoid any 
          allergic reactions.
        </p>

        <p>
          Prices, offers, and services may change without prior notice.
        </p>

        <p>
          By using our services or purchasing our products, you agree to all 
          policies mentioned above.
        </p>
      </div>

    </div>
  );
}

export default Policies;