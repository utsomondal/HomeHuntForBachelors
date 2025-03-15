import { NavLink } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi"; // Using Feather Icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white">🏡 HomeHunt</h2>
          <p className="mt-3 text-sm">
            Your trusted platform to find or post flats, seats, and sublets. Hassle-free house hunting starts here!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <NavLink to="/" className="hover:text-blue-400 transition">
                🏠 Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/browse" className="hover:text-blue-400 transition">
                🔍 Browse Properties
              </NavLink>
            </li>
            <li>
              <NavLink to="/post-property" className="hover:text-blue-400 transition">
                ➕ Post a Property
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <p className="mt-3 text-sm">📍 Dhaka, Bangladesh</p>
          <p className="text-sm">📞 +880 1234 567 890</p>
          <p className="text-sm">✉ support@homehunt.com</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              <FiFacebook size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              <FiTwitter size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              <FiInstagram size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              <FiLinkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm border-t border-gray-700 mt-8 pt-5">
        &copy; {new Date().getFullYear()} HomeHunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
