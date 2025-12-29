import React from "react";
import { motion } from "framer-motion";


const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-16 px-6 md:px-24 flex flex-col md:flex-row items-center justify-between">
      {/* Text Section */}
      <motion.div
        className="max-w-xl"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Bridging Generations <br /> of{" "}
          <span className="text-blue-300">Academic Excellence</span>
        </h1>
        <p className="text-lg mb-6">
          Where current students connect with successful alumni to unlock career
          opportunities, gain valuable insights, and build lasting mentorship
          relationships.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all">
            Join Our Community
          </button>
          {/* <input
            type="text"
            placeholder="Your Email"
            className="p-2 rounded text-black"
          /> */}
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="mt-10 md:mt-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <img
        
  src="campusDiarizz-main\client\Public\Image.jpg"
  alt="Community Illustration"
  className="w-[500px] max-w-full"
/>

       
      </motion.div>
    </div>
  );
};

export default HeroSection;
