import React, { useState, useMemo } from "react";
import CommonTable from "./../Components/CommonTable";

function Contactdata() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Axita Patel",
      phone: "9876543210",
      email: "axita@gmail.com",
      subject: "Service Inquiry",
      message: "I want more details about organic facial.",
    },
  ]);

  // 🔹 Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // ➕ ADD CONTACT DATA
  const addContact = () => {
    if (!name || !phone || !email || !subject || !message) {
      alert("Please fill all fields");
      return;
    }

    setContacts([
      ...contacts,
      {
        id: Date.now(), // 🔥 automatic unique ID
        name,
        phone,
        email,
        subject,
        message,
      },
    ]);

    // Reset form
    setName("");
    setPhone("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  // ❌ DELETE CONTACT
  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  // 📊 TABLE COLUMNS
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "phone",
        header: "Phone No",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "subject",
        header: "Subject",
      },
      {
        accessorKey: "message",
        header: "Message",
      },
      {
        accessorKey: "id",
        header: "Action",
        Cell: ({ cell }) => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteContact(cell.getValue())}
          >
            Delete
          </button>
        ),
      },
    ],
    [contacts]
  );

  return (
    <div className="container py-5">
      <h1>📩 Contact Messages</h1>

      {/* ➕ ADD CONTACT FORM */}
      <div className="border p-3 my-4 rounded">
        <h5>Add Contact Data</h5>

        <input
          type="text"
          placeholder="Full Name"
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="form-control mb-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          className="form-control mb-2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          placeholder="Message"
          className="form-control mb-3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addContact}>
          Add Contact
        </button>
      </div>

      {/* 📊 TABLE */}
      <CommonTable
        columns={columns}
        data={contacts}
        fileName="contactData"
        showSelection={true}
      />
    </div>
  );
}

export default Contactdata;
