import { useState, useEffect } from "react";

function Settings() {
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currency, setCurrency] = useState("₹");
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState("");

  // Load settings
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("adminSettings"));
    if (data) {
      setAdminName(data.adminName);
      setEmail(data.email);
      setCurrency(data.currency);
      setNotifications(data.notifications);
    }
  }, []);

  // Save settings
  const saveSettings = (e) => {
    e.preventDefault();

    const settings = {
      adminName,
      email,
      currency,
      notifications,
    };

    localStorage.setItem("adminSettings", JSON.stringify(settings));
    setMessage("Settings saved successfully ✅");
  };

  return (
    <div className="container mt-4">
      <h2>Settings ⚙️</h2>

      {message && <div className="alert alert-success">{message}</div>}

      {/* Profile Settings */}
      <form onSubmit={saveSettings}>
        <h4 className="mt-3">Profile</h4>

        <input
          type="text"
          placeholder="Admin Name"
          className="form-control mb-2"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <h4 className="mt-3">Change Password</h4>
        <input
          type="password"
          placeholder="New Password"
          className="form-control mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* System Settings */}
        <h4 className="mt-3">System Settings</h4>

        <select
          className="form-control mb-2"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="₹">₹ INR</option>
          <option value="$">$ USD</option>
          <option value="€">€ EUR</option>
        </select>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <label className="form-check-label">
            Enable Notifications
          </label>
        </div>

        <button className="btn btn-primary w-100">
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;
