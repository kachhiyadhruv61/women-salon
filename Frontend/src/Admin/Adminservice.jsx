import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../Components/CommonTable";

function Adminservice() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("services");

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([]);
  const [packages, setPackages] = useState([]);

  // ==============================
  // FETCH ALL DATA
  // ==============================
  const fetchData = async () => {

    try {

      const serviceRes = await fetch("http://localhost:5000/services");
      const serviceData = await serviceRes.json();
      setServices(serviceData.data || []);

      const catRes = await fetch("http://localhost:5000/api/serviceCategories");
      const catData = await catRes.json();
      setCategories(catData || []);

      const variantRes = await fetch("http://localhost:5000/api/serviceVariants");
      const variantData = await variantRes.json();
      setVariants(variantData || []);

      const packageRes = await fetch("http://localhost:5000/api/servicePackages");
      const packageData = await packageRes.json();
      setPackages(packageData || []);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  // ==============================
  // DELETE
  // ==============================
  const deleteItem = async (url, id, setState) => {

    const confirmDelete = window.confirm("Delete this item?");

    if (!confirmDelete) return;

    await fetch(`${url}/${id}`, {
      method: "DELETE"
    });

    setState(prev => prev.filter(i => i._id !== id));
  };

  // ==============================
  // SERVICES TABLE
  // ==============================
  const serviceColumns = useMemo(() => [

    {
      header: "#",
      Cell: ({ row }) => row.index + 1
    },

    {
      accessorKey: "name",
      header: "Service Name"
    },

    {
      accessorKey: "description",
      header: "Description"
    },

    {
      accessorKey: "isActive",
      header: "Status",
      Cell: ({ cell }) => (
        <span className={`badge ${cell.getValue() ? "bg-success" : "bg-danger"}`}>
          {cell.getValue() ? "Active" : "Inactive"}
        </span>
      )
    },

    {
      accessorKey: "_id",
      header: "Action",
      Cell: ({ row }) => (
        <>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => navigate(`/addservice?id=${row.original._id}`)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() =>
              deleteItem(
                "http://localhost:5000/services",
                row.original._id,
                setServices
              )
            }
          >
            Delete
          </button>
        </>
      )
    }

  ], []);

  // ==============================
  // CATEGORY TABLE
  // ==============================
  const categoryColumns = useMemo(() => [

    {
      header: "#",
      Cell: ({ row }) => row.index + 1
    },

    {
      accessorKey: "name",
      header: "Category Name"
    },

    {
      accessorKey: "_id",
      header: "Action",
      Cell: ({ row }) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() =>
            deleteItem(
              "http://localhost:5000/api/serviceCategories",
              row.original._id,
              setCategories
            )
          }
        >
          Delete
        </button>
      )
    }

  ], []);

  // ==============================
  // VARIANT TABLE
  // ==============================
  const variantColumns = useMemo(() => [

    {
      header: "#",
      Cell: ({ row }) => row.index + 1
    },

    {
      accessorKey: "price",
      header: "Price"
    },

    {
      accessorKey: "durationMinutes",
      header: "Duration"
    },

    {
      accessorKey: "locationType",
      header: "Location"
    },

    {
      accessorKey: "_id",
      header: "Action",
      Cell: ({ row }) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() =>
            deleteItem(
              "http://localhost:5000/api/serviceVariants",
              row.original._id,
              setVariants
            )
          }
        >
          Delete
        </button>
      )
    }

  ], []);

  // ==============================
  // PACKAGE TABLE
  // ==============================
  const packageColumns = useMemo(() => [

    {
      header: "#",
      Cell: ({ row }) => row.index + 1
    },

    {
      accessorKey: "name",
      header: "Package Name"
    },

    {
      accessorKey: "priceMin",
      header: "Min Price"
    },

    {
      accessorKey: "priceMax",
      header: "Max Price"
    },

    {
      accessorKey: "staffType",
      header: "Staff"
    },

    {
      accessorKey: "_id",
      header: "Action",
      Cell: ({ row }) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() =>
            deleteItem(
              "http://localhost:5000/api/servicePackages",
              row.original._id,
              setPackages
            )
          }
        >
          Delete
        </button>
      )
    }

  ], []);

  return (

    <div className="container py-5">

      <h2 className="mb-4">Admin Service Management 🛠️</h2>

      {/* Tabs */}

      <div className="mb-4">

        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>

        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>

        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setActiveTab("variants")}
        >
          Variants
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => setActiveTab("packages")}
        >
          Packages
        </button>

      </div>

      {/* SERVICES */}

      {activeTab === "services" && (
        <>
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate("/addservice")}
          >
            + Add Service
          </button>

          <CommonTable
            columns={serviceColumns}
            data={services}
          />
        </>
      )}

      {/* CATEGORIES */}

      {activeTab === "categories" && (
        <>
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate("/addservicecategory")}
          >
            + Add Category
          </button>

          <CommonTable
            columns={categoryColumns}
            data={categories}
          />
        </>
      )}

      {/* VARIANTS */}

      {activeTab === "variants" && (
        <>
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate("/addvariant")}
          >
            + Add Variant
          </button>

          <CommonTable
            columns={variantColumns}
            data={variants}
          />
        </>
      )}

      {/* PACKAGES */}

      {activeTab === "packages" && (
        <>
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate("/servicepackageform")}
          >
            + Add Package
          </button>

          <CommonTable
            columns={packageColumns}
            data={packages}
          />
        </>
      )}

    </div>
  );
}

export default Adminservice;