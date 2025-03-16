import { NavLink } from "react-router-dom";
import heroImage from "../assets/home-hero.png";
import { MdSearch, MdCall, MdCheckCircle } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import man1 from "../assets/man1.png";
import man2 from "../assets/man2.png";
import man3 from "../assets/man3.png";
import man4 from "../assets/man4.png";
import woman1 from "../assets/woman1.png";
import woman2 from "../assets/woman2.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Home = () => {
  const testimonials = [
    {
      image: man1,
      name: "Rafiq Ahmed",
      quote: "Awesome experience! Found a great place fast!",
    },
    {
      image: man2,
      name: "Hasan Chowdhury",
      quote: "This platform made my house hunt super easy!",
    },
    {
      image: woman1,
      name: "Farzana Rahman",
      quote: "Finally, a site that understands bachelor needs!",
    },
    {
      image: man3,
      name: "Jubayer Hossain",
      quote: "Affordable and reliable listings. Highly recommend!",
    },
    {
      image: man4,
      name: "Tanvir Alam",
      quote: "Got my ideal shared flat in just a few days!",
    },
    {
      image: woman2,
      name: "Nusrat Jahan",
      quote: "Smooth process & great listings! 5 stars!",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative h-[85vh] flex items-center justify-center text-white text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.div
          className="relative z-10 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-bold leading-tight">
            Affordable Homes & Shared Spaces for Bachelors
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Find budget-friendly flats, shared seats, and sublets—hassle-free.
          </p>
          <NavLink
            to="/browse"
            className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Explore Listings →
          </NavLink>
        </motion.div>
      </motion.section>

      {/* How HomeHunt Works */}
      <motion.section className="container mx-auto px-6 py-12 text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          How HomeHunt Works
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          {[
            {
              icon: <MdSearch className="text-white text-2xl" />,
              title: "Search & Explore",
              desc: "Find a budget-friendly shared flat or sublet in your area.",
            },
            {
              icon: <MdCall className="text-white text-2xl" />,
              title: "Contact Owners",
              desc: "Connect with landlords or roommates instantly via call or chat.",
            },
            {
              icon: <MdCheckCircle className="text-white text-2xl" />,
              title: "Move In!",
              desc: "Book your seat and move into your new shared space easily.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg">
                {step.icon}
              </div>
              <div className="mt-4 text-center max-w-xs">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Property Categories */}
      <motion.section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Explore Property Categories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Shared Flats",
                icon: "🛏️",
                desc: "Affordable shared living in bachelor-friendly flats.",
              },
              {
                title: "Full Flat Rentals",
                icon: "🏢",
                desc: "Rent entire flats for shared living with friends.",
              },
              {
                title: "Flexible Sublets",
                icon: "🏠",
                desc: "Short-term sublets with flexible agreements.",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4 text-blue-500">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  {category.title}
                </h3>
                <p className="text-gray-700">{category.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            What Bachelors Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden p-6 flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full w-16 h-16 mb-4"
                />
                <p className="text-gray-700 text-center font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-gray-700 text-center mt-2">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
