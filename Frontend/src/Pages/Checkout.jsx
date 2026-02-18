import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Checkout() {
  const { cart, clearCart } = useCart(); // clearCart optional

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash",
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddresses, setShowAddresses] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* ================= LOAD ADDRESSES ================= */
  useEffect(() => {
    const stored = localStorage.getItem("myAddresses");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSavedAddresses(parsed);

      // 🔥 Auto select default address
      const defaultAddress = parsed.find(
        (addr) => addr.isDefault
      );
      if (defaultAddress) {
        setForm((prev) => ({
          ...prev,
          name: defaultAddress.name,
          phone: defaultAddress.phone,
          address: defaultAddress.fullAddress,
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SELECT SAVED ADDRESS ================= */
  const selectAddress = (addr) => {
    setForm({
      ...form,
      name: addr.name,
      phone: addr.phone,
      address: addr.fullAddress,
    });
    setShowAddresses(false);
  };

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
  if (!form.name || !form.phone || !form.address) {
    alert("Please fill all details");
    return;
  }

  setLoading(true);

  const orderData = {
    orderId: "ORD-" + Date.now(),
    userName: form.name,
    contact: form.phone,
    address: form.address,
    items: cart,
    totalAmount: total,
    paymentMethod: form.payment,
    paymentStatus:
      form.payment === "Cash" ? "Pending" : "Paid",
    orderStatus: "Pending",
    createdAt: new Date(),
  };

  try {
    const res = await fetch(
      "http://localhost:5000/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!res.ok) throw new Error("API failed");

    alert("Order Placed Successfully ✅");

    if (clearCart) clearCart();

    setShowBill(false);

    // ✅ Redirect AFTER success
    navigate("/");
  } catch (err) {
    alert("Backend not reachable ❌");
  }

  setLoading(false);
};

  /* ================= DOWNLOAD BILL ================= */
  const downloadBill = () => {
    const doc = new jsPDF();

    doc.text("Women Organic Services - Order Bill", 14, 15);
    doc.text(`Name: ${form.name}`, 14, 25);
    doc.text(`Phone: ${form.phone}`, 14, 32);
    doc.text(`Address: ${form.address}`, 14, 39);
    doc.text(`Payment: ${form.payment}`, 14, 46);

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

      {!showBill && (
        <div className="card p-4 mb-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control mb-2"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="form-control mb-2"
            value={form.phone}
            onChange={handleChange}
          />

          {/* 🔥 ADDRESS FIELD */}
          <textarea
            name="address"
            placeholder="Click to select saved address or enter new"
            className="form-control mb-2"
            value={form.address}
            onClick={() =>
              setShowAddresses(!showAddresses)
            }
            onChange={handleChange}
          />

          {/* 🔥 SAVED ADDRESS RADIO */}
          {showAddresses && savedAddresses.length > 0 && (
            <div className="border p-3 mb-3 rounded bg-light">
              <h6>Select Saved Address</h6>

              {savedAddresses.map((addr) => (
                <div key={addr.id} className="mb-2">
                  <input
                    type="radio"
                    name="savedAddress"
                    onChange={() =>
                      selectAddress(addr)
                    }
                  />
                  <label className="ms-2">
                    <b>{addr.type}</b> -{" "}
                    {addr.fullAddress}
                  </label>
                </div>
              ))}
            </div>
          )}

          <select
            name="payment"
            className="form-control mb-3"
            value={form.payment}
            onChange={handleChange}
          >
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
          </select>

          {form.payment === "UPI" && (
            <div className="mb-3">
              <p>Scan & Pay ₹{total}</p>
              <img src="/img/qr.png" width="150" alt="QR" />
            </div>
          )}

          <button
            className="btn btn-primary"
            onClick={() => setShowBill(true)}
            disabled={cart.length === 0}
          >
            Preview Bill
          </button>
        </div>
      )}

{/* ================= BILL PREVIEW ================= */}
{showBill && (
  <div className="card p-4">
    <h4>Order Bill Preview</h4>

    <p><b>Name:</b> {form.name}</p>
    <p><b>Phone:</b> {form.phone}</p>
    <p><b>Address:</b> {form.address}</p>
    <p><b>Payment:</b> {form.payment}</p>

    <hr />

    {cart.map((item) => (
      <div
        key={item.id}
        className="d-flex justify-content-between"
      >
        <span>
          {item.name} × {item.qty}
        </span>
        <span>
          ₹{item.price * item.qty}
        </span>
      </div>
    ))}

    <hr />
    <h5>Total: ₹{total}</h5>

    <div className="d-flex gap-2 mt-3 flex-nowrap">
      <button
        className="btn btn-success btn-sm"
        onClick={placeOrder}
        disabled={loading}
      >
        {loading ? "Placing..." : "Place Order"}
      </button>

      <button
        className="btn btn-outline-primary btn-sm"
        onClick={downloadBill}
      >
        Download Bill
      </button>

      <button
        className="btn btn-secondary btn-sm"
        onClick={() => setShowBill(false)}
      >
        Edit Details
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default Checkout;
