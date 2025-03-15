import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import supabase from "../supabase.js";
import logo from "../assets/HomeHunt_res.png";
import { toast, ToastContainer, Bounce } from "react-toastify";
import avater from '../assets/default-avater.png'

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast.warning("Logged out successfully!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    setMenuOpen(false);
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <nav className="bg-white shadow-md w-full z-[999] sticky top-0">
        <div className="container mx-auto flex items-center justify-between py-3 ">
          {/* Logo */}
          <NavLink to="/">
            <img src={logo} alt="HomeHunt Logo" className="w-[150px]" />
          </NavLink>

          {/* Navigation Links */}
          <ul className="flex gap-6 text-gray-700 font-medium text-base">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/browse"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
                }
                end
              >
                Browse Properties
              </NavLink>
            </li>
            <li>
              <NavLink
                to={user ? "/post-property" : "/login"}
                className={({ isActive }) =>
                  isActive && user
                    ? "text-blue-600 font-bold"
                    : "hover:text-blue-600"
                }
                end
                onClick={() => {
                  if (!user) {
                    toast.error("You must log in before posting an ad!", {
                      position: "bottom-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: "colored",
                      transition: Bounce,
                    });
                    navigate("/login");
                  }
                }}
              >
                Post Property Ad
              </NavLink>
            </li>
          </ul>

          {/* Authentication Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative pt-1">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                  <img
                    src={avater}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full cursor-pointer"
                  />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-max bg-gray-100 shadow-lg rounded-lg p-4">
                    <p className="text-sm text-gray-700">{user.email}</p>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 block py-1 hover:text-red-600 font-medium cursor-pointer hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 underline" : "hover:text-blue-600"
                  }
                  end
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  end
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
