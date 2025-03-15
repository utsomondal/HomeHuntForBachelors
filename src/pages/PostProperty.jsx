import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import postBg from "../assets/login-bg.jpg";

const PostProperty = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        toast.error("User not authenticated! Please log in.");
      }
    };
    fetchUser();
  }, []);

  const [owner, setOwner] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [property, setProperty] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    price: "",
    gender: "",
    image: null,
  });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleOwnerChange = (e) => {
    setOwner({ ...owner, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProperty({ ...property, image: file });
    }
  };

  const handleNextStep = () => {
    if (!owner.name || !owner.email || !owner.phone) {
      toast.error("Please complete Step 1 before proceeding!");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Authentication error! Please log in again.");
      return;
    }

    if (
      !property.title ||
      !property.description ||
      !property.type ||
      !property.location ||
      !property.price ||
      !property.gender
    ) {
      toast.error("All fields in Step 2 are required!");
      return;
    }

    setLoading(true);

    let imageUrl = null;
    if (property.image) {
      const { data, error } = await supabase.storage
        .from("property-images")
        .upload(`property-${Date.now()}`, property.image);

      if (error) {
        toast.error("Image upload failed!");
        setLoading(false);
        return;
      }

      imageUrl = `https://xhgolsicvfqlpgfrruyd.supabase.co/storage/v1/object/public/property-images/${data.path}`;
    }

    const { error } = await supabase.from("properties").insert([
      {
        user_id: userId,
        title: property.title,
        description: property.description,
        type: property.type,
        location: property.location,
        price: parseInt(property.price, 10),
        gender: property.gender,
        image_urls: imageUrl,
        owner_name: owner.name,
        owner_email: owner.email,
        owner_phone: owner.phone,
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error("Failed to post property! Please check your details.");
    } else {
      toast.success("Property posted successfully!");
      setTimeout(() => navigate("/browse"), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* Full Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${postBg})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      {/* Post Property Container */}
      <div className="relative z-10 flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl w-full">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            {step === 1 ? "Step 1: Owner Details" : "Step 2: Property Details"}
          </h2>

          {step === 1 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNextStep();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                value={owner.name}
                onChange={handleOwnerChange}
                placeholder="Owner Name"
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={owner.email}
                onChange={handleOwnerChange}
                placeholder="Owner Email"
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="text"
                name="phone"
                value={owner.phone}
                onChange={handleOwnerChange}
                placeholder="Owner Phone"
                className="w-full p-3 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
              >
                Next Step
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={property.title}
                onChange={handleChange}
                placeholder="Property Title"
                className="w-full p-3 border rounded"
                required
              />
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 border rounded"
                required
              ></textarea>
              <select
                name="type"
                value={property.type}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              >
                <option value="">Select Property Type</option>
                <option value="Seat in a Flat">Seat in a Flat</option>
                <option value="Full Flat Rent">Full Flat Rent</option>
                <option value="Sublet">Sublet</option>
              </select>
              <input
                type="text"
                name="location"
                value={property.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="number"
                name="price"
                value={property.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-3 border rounded"
                required
              />
              <select
                name="gender"
                value={property.gender}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              >
                <option value="">Select Gender Preference</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-3 border rounded"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white p-3 rounded ${
                  loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {loading ? "Posting..." : "Post Property"}
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Why Post? */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex-col justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-semibold mb-6 leading-tight">
              Maximize Your Property's Potential
            </h2>
            <p className="text-lg opacity-95 mb-8">
              Connect with a vast network of prospective tenants and streamline
              your listing process.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                  />
                </svg>
                <span>Effortless and Rapid Property Listing</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3m4-2V6m-1 16H3a2 2 0 01-2-2V6a2 2 0 012-2h18a2 2 0 012 2v14a2 2 0 01-2 2h-4m-4-2H5m6 0h6"
                  />
                </svg>
                <span>Amplify Your Property's Visibility</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span>Direct and Efficient Tenant Communication</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Secure and Reliable Platform</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable={false}
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default PostProperty;
