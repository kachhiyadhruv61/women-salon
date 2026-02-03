import { useState } from "react";
import { useCart } from "./CartContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Checkout() {
  const { cart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash",
  });

  const [showBill, setShowBill] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 👉 BILL PDF DOWNLOAD
  const downloadBill = () => {
    const doc = new jsPDF();

    doc.text("Organic Salon - Order Bill", 14, 15);

    doc.text(`Name: ${form.name}`, 14, 25);
    doc.text(`Phone: ${form.phone}`, 14, 32);
    doc.text(`Address: ${form.address}`, 14, 39);
    doc.text(`Payment Mode: ${form.payment}`, 14, 46);

    const tableData = cart.map((item) => [
      item.name,
      item.qty,
      `₹${item.price}`,
      `₹${item.price * item.qty}`,
    ]);

    autoTable(doc, {
      startY: 55,
      head: [["Service", "Qty", "Price", "Total"]],
      body: tableData,
    });

    doc.text(
      `Grand Total: ₹${total}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save("Order-Bill.pdf");
  };

  return (
    <div className="container py-5">
      <h2>Checkout & Payment</h2>

      {/* 🔹 FORM SECTION */}
      {!showBill && (
        <div className="card p-4 mb-4">
          <h5>Customer Details</h5>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control mb-2"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="form-control mb-2"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Full Address"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <h5>Payment Method</h5>

          <select
            name="payment"
            className="form-control mb-3"
            onChange={handleChange}
          >
            <option value="Cash">Cash</option>
            <option value="QR">QR</option>
          </select>

          {form.payment === "QR" && (
            <div className="mb-3">
              <p>Scan & Pay ₹{total}</p>
              <img src="/img/qr.png" width="150" alt="QR" />
            </div>
          )}

          <button
            className="btn btn-primary"
            onClick={() => setShowBill(true)}
          >
            Preview Bill
          </button>
        </div>
      )}

      {/* 🔹 BILL PREVIEW SECTION */}
      {showBill && (
        <div className="card p-4">
          <h4>Order Bill Preview</h4>

          <p><b>Name:</b> {form.name}</p>
          <p><b>Phone:</b> {form.phone}</p>
          <p><b>Address:</b> {form.address}</p>
          <p><b>Payment:</b> {form.payment}</p>

          <hr />

          {cart.map((item) => (
            <div key={item.id} className="d-flex justify-content-between">
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr />
          <h5>Total: ₹{total}</h5>

          <button className="btn btn-success me-2" onClick={downloadBill}>
            Download Bill
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => setShowBill(false)}
          >
            Edit Details
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
