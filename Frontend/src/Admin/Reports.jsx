import React from "react";

function Reports() {
  const reportsData = {
    users: 120,
    bookings: 85,
    orders: 40,
    revenue: 56000,
  };

  const recentReports = [
    { id: 1, title: "Daily Booking Report", date: "2026-01-20" },
    { id: 2, title: "Monthly Revenue Report", date: "2026-01-01" },
    { id: 3, title: "Service Usage Report", date: "2025-12-30" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📊 Admin Reports</h2>

      {/* SUMMARY CARDS */}
      <div className="row">
        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Users</h5>
              <h3>{reportsData.users}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Bookings</h5>
              <h3>{reportsData.bookings}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Orders</h5>
              <h3>{reportsData.orders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total Revenue</h5>
              <h3>₹ {reportsData.revenue}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* REPORT TABLE */}
      <div className="card mt-4 shadow">
        <div className="card-body">
          <h5 className="mb-3">📄 Recent Reports</h5>

          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Report Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report, index) => (
                <tr key={report.id}>
                  <td>{index + 1}</td>
                  <td>{report.title}</td>
                  <td>{report.date}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default Reports;
