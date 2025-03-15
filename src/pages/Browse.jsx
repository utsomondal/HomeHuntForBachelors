import { useState, useEffect } from "react";
import supabase from "../supabase";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { TbCurrencyTaka } from "react-icons/tb";
import { LiaTransgenderSolid } from "react-icons/lia";

const BrowseProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [modalProperty, setModalProperty] = useState(null);

  // Fetch Properties on Mount
  useEffect(() => {
    fetchProperties();
  }, []);

  // Apply Filters when any filter value changes
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchLocation, filterType, filterGender, properties]);

  // Fetch all properties from Supabase
  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select(
        "id, title, type, price, location, image_urls, owner_name, owner_email, owner_phone, gender, created_at,description"
      )
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to load properties", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      setProperties(data || []);
    }
    setLoading(false);
  };

  // Apply Filters
  const applyFilters = () => {
    let filtered = properties;

    if (searchLocation) {
      filtered = filtered.filter((prop) =>
        prop.location?.toLowerCase().includes(searchLocation.toLowerCase())
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
    <div className="relative">
      {/* Main Content Wrapper - Apply Blur When Modal is Open */}
      <div
        className={`min-h-screen flex bg-gray-50 transition-all duration-300 ${
          modalProperty ? "blur-[1.5px]" : ""
        }`}
      >
        {/* Left Side - Filters */}
        <div className="w-[20%] bg-white shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Filters</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <div className="relative">
              <select
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none text-sm appearance-none pr-10"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Seat in a Flat">Seat in a Flat</option>
                <option value="Full Flat Rent">Full Flat Rent</option>
                <option value="Sublet">Sublet</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender Preference
            </label>
            <div className="relative">
              <select
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none text-sm appearance-none pr-10"
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <button
            className="w-full bg-red-500 text-white py-3 rounded-xl shadow-md hover:bg-red-600 transition duration-300 text-sm font-semibold"
            onClick={() => {
              setFilterType("");
              setFilterGender("");
              setSearchLocation("");
              setFilteredProperties(properties);
            }}
          >
            Clear Filters
          </button>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-lg mx-auto mt-13">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-semibold text-blue-500">
                HomeHunt Guidelines
              </span>
            </div>
            <ul className="mt-4 space-y-3 text-gray-800">
              <li className="flex items-start">
                ✅{" "}
                <span className="ml-2">
                  <strong>Verify in Person</strong> – Do not rely solely on
                  online information; visit and check the property yourself.
                </span>
              </li>
              <li className="flex items-start">
                📞{" "}
                <span className="ml-2">
                  <strong>Contact Directly</strong> – Reach out to the owner via
                  phone or email for direct communication.
                </span>
              </li>
              <li className="flex items-start">
                ⚠{" "}
                <span className="ml-2">
                  <strong>Ensure Safe Transactions</strong> –{" "}
                  <span className="text-red-600">
                    Never send advance payments
                  </span>
                  ; verify everything before making a deal.
                </span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600 border-t pt-3 text-center">
              <strong>HomeHunt</strong> is just a platform,<br></br> stay
              cautious of fraudsters!
            </p>
          </div>
        </div>

        {/* Right Side - Properties Grid */}
        <div className="w-[80%] p-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by location..."
                className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:outline-none text-gray-700 placeholder:text-gray-400 transition-shadow duration-300 bg-white shadow-md"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* all properties here */}
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-102 duration-300 cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={property.image_urls || "/placeholder.jpg"}
                        alt={property.title}
                        className="w-full h-56 object-cover rounded-t-xl"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {property.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {property.title}
                      </h3>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <GrLocation className="h-5 w-5 text-gray-500 mr-1" />
                            <span className="text-gray-600 text-sm">
                              {property.location}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <TbCurrencyTaka className="h-5 w-5 text-gray-500 mr-1" />
                            <span className="text-gray-500 text-sm font-semibold">
                              {property.price} BDT/month
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <LiaTransgenderSolid className="h-5 w-5 text-gray-500 mr-1" />
                          <span className="text-gray-600 text-sm">
                            {property.gender}
                          </span>
                        </div>
                      </div>
                      <button
                        className="w-full bg-blue-500 text-white py-2 text-sm font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={() => setModalProperty(property)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
                  <p className="text-gray-500 text-lg">No properties found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Property Modal */}
      {modalProperty && (
        <div
          className="fixed inset-0 bg-[#343a4066] flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={() => setModalProperty(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-[800px] overflow-y-auto relative animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalProperty(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <IoClose className="text-4xl bg-red-500 hover:bg-red-600 rounded-full text-white shadow-2xl" />
            </button>

            {/* Property Image with Rounded Corners and Shadow */}
            <div className="overflow-hidden shadow-md">
              <img
                src={modalProperty.image_urls || "/placeholder.jpg"}
                alt={modalProperty.title}
                className="w-full h-[350px] object-cover"
              />
            </div>

            {/* Property Details */}
            <div className="px-4 pb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  {modalProperty.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  📅 <span className="font-medium">Published on: </span>
                  {new Date(modalProperty.created_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              <div className="font-medium flex justify-start items-center gap-3 border-b border-b-gray-200 py-3">
                <div className="flex items-center">
                  <span className="text-gray-700">
                    Location: {modalProperty.location}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700">
                    Rent: {modalProperty.price} BDT/month
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700">
                    Gender: {modalProperty.gender}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700">
                    Type: {modalProperty.type}
                  </span>
                </div>
              </div>

              <div className="py-3 border-b border-b-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">
                  Description:
                </h2>
                <p className="text-gray-700">{modalProperty.description}</p>
              </div>

              <div className="py-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  Owner Details:
                </h3>
                <p>Name: {modalProperty.owner_name}</p>
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${modalProperty.owner_email}`}
                    className="text-blue-600 underline"
                  >
                    {modalProperty.owner_email}
                  </a>
                </p>
                <p>
                  Mobile:{" "}
                  <a
                    href={`tel:${modalProperty.owner_phone}`}
                    className="text-blue-600 underline"
                  >
                    +88{modalProperty.owner_phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
