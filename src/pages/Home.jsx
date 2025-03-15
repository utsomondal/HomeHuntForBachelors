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
import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.div
          className="relative z-10 max-w-3xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
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
      <motion.section
        className="container mx-auto px-6 py-12 text-center"
        style={{ opacity, y: translateY }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          How HomeHunt Works
        </h2>

        <div className="relative flex flex-col md:flex-row items-center md:justify-center">
          <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center justify-between relative">
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
                className="flex flex-col items-center relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
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
        </div>
      </motion.section>

      {/* Property Categories */}
      <motion.section
        className="py-20 bg-gray-100"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Explore Property Categories
          </h2>
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
                className="bg-white rounded-2xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="p-8">
                  <div className="text-5xl mb-4 text-blue-500">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                    {category.title}
                  </h3>
                  <p className="text-gray-700">{category.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-20 bg-gray-100"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800">
              What Bachelors Say
            </h2>
            <div className="inline-flex items-center">
              <FaRegComments className="text-3xl text-blue-500 mr-2" />
              <span className="text-lg text-gray-600">
                Real Stories, Real Satisfaction
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden p-6 flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full w-24 h-24 mb-4"
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
