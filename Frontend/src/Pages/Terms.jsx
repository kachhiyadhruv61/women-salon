function Terms() {
  return (
    <div className="container py-5">

      <h2 className="text-center mb-4" style={{ color: "#bf9456" }}>
        Terms & Conditions
      </h2>

      <p>
        Welcome to A² Women Organic Salon. By accessing or using our website, 
        services, or purchasing our products, you agree to comply with and be 
        bound by the following Terms & Conditions.
      </p>

      {/* 1️⃣ SERVICES */}
      <h5 className="mt-4">1. Services & Products</h5>
      <p>
        We offer organic beauty products and salon services made with natural 
        ingredients. While we strive to maintain high quality, results may vary 
        depending on individual skin and hair types.
      </p>

      {/* 2️⃣ USER RESPONSIBILITY */}
      <h5 className="mt-4">2. User Responsibility</h5>
      <p>
        You agree to provide accurate and complete information while registering, 
        placing orders, or booking services. Any misuse of the website or false 
        information may lead to account restriction.
      </p>

      {/* 3️⃣ ORDERS */}
      <h5 className="mt-4">3. Orders</h5>
      <ul>
        <li>Orders are confirmed only after successful placement.</li>
        <li>Once an order is processed or shipped, it cannot be cancelled.</li>
        <li>We reserve the right to cancel any order due to stock unavailability or other issues.</li>
      </ul>

      {/* 4️⃣ PRICING */}
      <h5 className="mt-4">4. Pricing & Availability</h5>
      <p>
        All prices are listed in INR (₹). Prices and product availability are 
        subject to change without prior notice.
      </p>

      {/* 5️⃣ PAYMENTS */}
      <h5 className="mt-4">5. Payment Terms</h5>
      <ul>
        <li>We accept Cash on Delivery (COD) and Online Payments.</li>
        <li>For online payments, secure payment gateways are used.</li>
        <li>Orders will be processed only after payment confirmation (for online mode).</li>
      </ul>

      {/* 6️⃣ DELIVERY */}
      <h5 className="mt-4">6. Delivery</h5>
      <ul>
        <li>Delivery is available only within selected city areas.</li>
        <li>Estimated delivery time: 1–3 working days.</li>
        <li>Delays may occur due to external factors (traffic, weather, etc.).</li>
      </ul>

      {/* 7️⃣ RETURNS */}
      <h5 className="mt-4">7. Returns & Refunds</h5>
      <p>
        Returns and refunds are governed by our Refund Policy. Products are 
        eligible for return only if damaged or defective and reported within 
        the specified time.
      </p>

      {/* 8️⃣ HEALTH DISCLAIMER */}
      <h5 className="mt-4">8. Health & Safety Disclaimer</h5>
      <p>
        Our products are made using natural ingredients. However, customers are 
        advised to check ingredients before use. We are not responsible for any 
        allergic reactions or skin sensitivities.
      </p>

      {/* 9️⃣ LIMITATION OF LIABILITY */}
      <h5 className="mt-4">9. Limitation of Liability</h5>
      <p>
        A² Women Organic Salon shall not be held responsible for any indirect, 
        incidental, or consequential damages arising from the use of our products 
        or services.
      </p>

      {/* 🔟 CHANGES */}
      <h5 className="mt-4">10. Changes to Terms</h5>
      <p>
        We reserve the right to update or modify these Terms & Conditions at any 
        time without prior notice. Continued use of the website implies acceptance 
        of the updated terms.
      </p>

      {/* 📞 CONTACT */}
      <h5 className="mt-4">11. Contact Us</h5>
      <p>
        For any questions regarding these Terms & Conditions, please contact us:
      </p>
      <p>
        📞 Phone: +91 XXXXX XXXXX <br />
        📧 Email: womenogsalon@email.com
      </p>

    </div>
  );
}

export default Terms;