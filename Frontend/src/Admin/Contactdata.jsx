import React, { useState, useMemo, useCallback } from "react";
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

  // ❌ DELETE CONTACT
  const deleteContact = useCallback((id) => {
    setContacts((prev) =>
      prev.filter((c) => c.id !== id)
    );
  }, []);

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
    [deleteContact]
  );

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h2> Contact Messages 📩 </h2>
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
