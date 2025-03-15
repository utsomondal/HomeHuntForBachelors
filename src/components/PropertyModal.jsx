import { useState, useEffect } from "react";
import  supabase  from "../supabase";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertyModal from "./PropertyModal"; // Import PropertyModal component

const BrowseProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [modalProperty, setModalProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchLocation, filterType, filterGender, properties]);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      toast.error("Failed to load properties", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      setProperties(data);
      setFilteredProperties(data);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = properties;

    if (searchLocation) {
      filtered = filtered.filter((prop) =>
        prop.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter((prop) => prop.type === filterType);
    }

    if (filterGender) {
      filtered = filtered.filter((prop) => prop.gender === filterGender);
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Filters */}
      <div className="w-[20%] bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>

        <label className="block mb-2 font-medium text-gray-700">
          Property Type
        </label>
        <select
          className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Seat in a Flat">Seat in a Flat</option>
          <option value="Full Flat Rent">Full Flat Rent</option>
          <option value="Sublet">Sublet</option>
        </select>

        <label className="block mt-4 mb-2 font-medium text-gray-700">
          Gender Preference
        </label>
        <select
          className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <button
          className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          onClick={() => {
            setFilterType("");
            setFilterGender("");
            setSearchLocation("");
            setFilteredProperties(properties);
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Right Side - Properties Grid */}
      <div className="w-[80%] p-6">
        <div className="mb-6 flex items-center">
          <input
            type="text"
            placeholder="Search by location..."
            className="w-full p-4 rounded-lg shadow-md border border-gray-200 placeholder:text-gray-700 "
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white shadow-lg p-4 rounded-lg transition-transform transform hover:scale-102 duration-300 cursor-pointer flex flex-col"
                >
                  <img
                    src={property.image_urls}
                    alt={property.title}
                    className="w-full h-[70%] object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mt-3 text-gray-800">
                      {property.title}
                    </h3>
                    <p className="text-gray-500">Location: {property.location}</p>
                    <p className="text-blue-600 font-semibold">
                      Rent: {property.price} BDT
                    </p>
                  </div>
                  <button
                    className="w-full bg-blue-600 text-white py-2 cursor-pointer rounded-sm"
                    onClick={() => setModalProperty(property)}
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">
                No properties found
              </p>
            )}
          </div>
        )}
      </div>

      {/* PropertyModal Component */}
      <PropertyModal
        isOpen={modalProperty !== null}
        onClose={() => setModalProperty(null)}
        property={modalProperty}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default BrowseProperties;
