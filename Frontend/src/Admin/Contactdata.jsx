import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../Components/CommonTable";
import { apiFetch } from "../utils/apiFetch";

function Contactdata() {

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  // ✅ GET CONTACTS FROM BACKEND
  const getContacts = async () => {
    try {
      // const res = await fetch("http://localhost:5000/contacts");
      const res = await apiFetch("/contacts", {
              method: "GET",
            });
      const result = await res.json();

      if (result.success) {
        setContacts(result.data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // ✅ PAGE LOAD API CALL
  useEffect(() => {
    getContacts();
  }, []);

  // ❌ DELETE CONTACT (Frontend only)
  const deleteContact = async (id) => {

  try {

    const res = await fetch(`http://localhost:5000/contacts/${id}`, {
      method: "DELETE"
    });

    const result = await res.json();

    if (result.success) {

      setContacts(
        contacts.filter((c) => c._id !== id)
      );

    }

  } catch (error) {
    console.error("Delete error:", error);
  }

};

  const columns = [
    {
      id: "sr",
      header: "#",
      accessorFn: (_, index) => index + 1,
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
    },
    {
      id: "phone",
      header: "Phone No",
      accessorKey: "phone",
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
    },
    {
      id: "subject",
      header: "Subject",
      accessorKey: "subject",
    },
    {
      id: "message",
      header: "Message",
      accessorKey: "message",
    },
    {
      id: "action",
      header: "Action",
      Cell: ({ row }) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteContact(row.original._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Contact Messages 📩</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/contact")}
        >
          + Add Contact
        </button>
      </div>

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