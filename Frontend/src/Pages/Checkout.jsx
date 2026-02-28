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
 /* ================= ADDED ADDRESS SAVED TO ADDRESSES================= */

const saveAddressToAddressPage = () => {
  if (!form.address.trim()) return;

  // LocalStorage mathi current addresses lao
  const stored = localStorage.getItem("myAddresses");
  const existingAddresses = stored ? JSON.parse(stored) : [];

  // Check duplicate (same fullAddress)
  const alreadyExists = existingAddresses.some(
    (addr) => addr.fullAddress === form.address
  );

  if (!alreadyExists) {
    const newAddress = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      fullAddress: form.address,
      type: "Other",
      isDefault: existingAddresses.length === 0,
    };

    const updated = [...existingAddresses, newAddress];

    localStorage.setItem(
      "myAddresses",
      JSON.stringify(updated)
    );
  }
};

 /* ================= BILLING CALCULATION LOGIC ================= */
  const discountPercent = 10;   // Example 10% discount
const taxPercent = 5;         // Example 5% GST

const subtotal = cart.reduce(
  (acc, item) => acc + item.price * item.qty,
  0
);

const discountAmount = (subtotal * discountPercent) / 100;
const taxableAmount = subtotal - discountAmount;
const taxAmount = (taxableAmount * taxPercent) / 100;
const grandTotal = taxableAmount + taxAmount;

//order preview bill logic
const [invoiceNumber] = useState(
  "INV" + Math.floor(Math.random() * 100000)
);
const today = new Date();


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

  const discountPercent = 10;
  const taxPercent = 5;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * taxPercent) / 100;
  const grandTotal = taxableAmount + taxAmount;

  const invoiceNumber = "INV" + Math.floor(Math.random() * 100000);
  const today = new Date();

  let y = 20;
  const centerX = 105;

  // ===== HEADER =====
  doc.setFontSize(18);
  doc.setTextColor(191, 148, 86);
  doc.text("A² Women Organic Salon", centerX, y, { align: "center" });

  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text("Professional Service Invoice", centerX, y, {
    align: "center",
  });

  y += 10;

  doc.setFontSize(10);
  doc.text(
    `Invoice No: ${invoiceNumber}    |    Date: ${today.toLocaleString()}`,
    centerX,
    y,
    { align: "center" }
  );

  y += 15;

  // ===== CUSTOMER DETAILS (Centered Block) =====
  doc.setFontSize(11);
  doc.text("Customer Details", centerX, y, { align: "center" });

  y += 8;
  doc.setFontSize(10);

  doc.text(`Customer: ${form.name}`, centerX, y, { align: "center" });
  y += 6;
  doc.text(`Phone: ${form.phone}`, centerX, y, { align: "center" });
  y += 6;
  doc.text(`Address: ${form.address}`, centerX, y, { align: "center" });
  y += 6;
  doc.text(`Payment Mode: ${form.payment}`, centerX, y, {
    align: "center",
  });

  y += 12;

  // ===== SERVICES TABLE (CENTERED WIDTH) =====
  autoTable(doc, {
    startY: y,
    margin: { left: 30, right: 30 }, // center effect
    head: [["Service", "Qty", "Price", "Total"]],
    body: cart.map((item) => [
      item.name,
      item.qty,
      `₹${item.price}`,
      `₹${item.price * item.qty}`,
    ]),
    theme: "grid",
    headStyles: {
      fillColor: [191, 148, 86],
    },
  });

  y = doc.lastAutoTable.finalY + 15;

  // ===== SUMMARY (CENTERED) =====
  doc.setFontSize(11);
  doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, centerX, y, {
    align: "center",
  });
  y += 7;

  doc.text(
    `Discount (${discountPercent}%): - ₹${discountAmount.toFixed(2)}`,
    centerX,
    y,
    { align: "center" }
  );
  y += 7;

  doc.text(
    `GST (${taxPercent}%): ₹${taxAmount.toFixed(2)}`,
    centerX,
    y,
    { align: "center" }
  );

  y += 10;

  doc.setFontSize(14);
  doc.setTextColor(191, 148, 86);
  doc.text(
    `Grand Total: ₹${grandTotal.toFixed(2)}`,
    centerX,
    y,
    { align: "center" }
  );

  y += 15;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(
    "Thank You for Visiting A² Women Organic Salon 💖",
    centerX,
    y,
    { align: "center" }
  );

  doc.save("A2-Women-Salon-Invoice.pdf");
};



  return (
    <div className="container py-5">
      <h3 className="mb-0">Checkout & Payment</h3>


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
  onClick={() => {
     saveAddressToAddressPage();  // 🔥 New address save
    setShowBill(true);
  }}
  disabled={cart.length === 0}
>
  Preview Bill
</button>
        </div>
      )}

{/* ================= BILL PREVIEW ================= */}
{showBill && (
  <div className="d-flex justify-content-center">
 <div 
    className="card shadow-lg border-0 p-4"
    style={{
      borderRadius: "15px",
      width: "100%",
      maxWidth: "500px"   // 👈 card size control here
    }}
  >
  
  <div className="text-center mb-4">
    <h4 style={{color:"#bf9456", fontWeight:"700"}}>
      A² Women Organic Salon
    </h4>
    <small>Professional Service Invoice</small>
  </div>
  <div className="d-flex justify-content-between mb-3">
  <small><b>Invoice No:</b> {invoiceNumber}</small>
  <small><b>Date:</b> {today.toLocaleString()}</small>
</div>

  <div className="bg-light p-3 rounded mb-3">
    <p className="mb-1"><b>Customer:</b> {form.name}</p>
    <p className="mb-1"><b>Phone:</b> {form.phone}</p>
    <p className="mb-1"><b>Address:</b> {form.address}</p>
    <p className="mb-0"><b>Payment Mode:</b> {form.payment}</p>
  </div>

  <table className="table">
    <thead style={{background:"#bf9456", color:"white"}}>
      <tr>
        <th>Service</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {cart.map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.qty}</td>
          <td>₹{item.price}</td>
          <td>₹{item.price * item.qty}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="text-end">
    <p><b>Subtotal:</b> ₹{subtotal.toFixed(2)}</p>
    <p><b>Discount ({discountPercent}%):</b> - ₹{discountAmount.toFixed(2)}</p>
    <p><b>GST ({taxPercent}%):</b> ₹{taxAmount.toFixed(2)}</p>
    <hr />
    <h5 style={{color:"#bf9456"}}>
      Grand Total: ₹{grandTotal.toFixed(2)}
    </h5>
  </div>

  <div className="d-flex justify-content-between align-items-center">
    <h5>Total Amount</h5>
    <h5 style={{color:"#bf9456", fontWeight:"700"}}>
      ₹{total}
    </h5>
  </div>



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
  </div>
)}

    </div>
  );
}

export default Checkout;
