import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ReportView() {
  const { id } = useParams();

  // 🔸 Dummy data (backend hoy to API thi aavse)
  const reportDetails = {
    title: "Monthly Revenue Report",
    date: "January 2026",
    rows: [
      { name: "Herbal Face Pack", qty: 20, amount: 9980 },
      { name: "Organic Hair Oil", qty: 15, amount: 5985 },
    ],
  };

  const total = reportDetails.rows.reduce(
    (sum, r) => sum + r.amount,
    0
  );

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text(reportDetails.title, 14, 15);
    doc.text(`Report ID: ${id}`, 14, 25);
    doc.text(`Date: ${reportDetails.date}`, 14, 32);

    autoTable(doc, {
      startY: 40,
      head: [["Product", "Quantity", "Amount"]],
      body: reportDetails.rows.map((r) => [
        r.name,
        r.qty,
        `₹${r.amount}`,
      ]),
    });

    doc.text(
      `Total Revenue: ₹${total}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save("Report.pdf");
  };

  return (
    <div className="container py-5">
      <h2>{reportDetails.title}</h2>
      <p><b>Month:</b> {reportDetails.date}</p>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {reportDetails.rows.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td>{r.qty}</td>
              <td>₹{r.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5>Total Revenue: ₹{total}</h5>

      <button className="btn btn-success mt-3" onClick={downloadPDF}>
        Download Report PDF
      </button>
    </div>
  );
}

export default ReportView;
