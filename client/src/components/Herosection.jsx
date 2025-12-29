import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Wavy Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 320">
          <path
            fill="#3b82f6"
            fillOpacity="0.3"
            d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,106.7C672,96,768,128,864,128C960,128,1056,96,1152,74.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,160L60,176C120,192,240,224,360,218.7C480,213,600,171,720,165.3C840,160,960,192,1080,181.3C1200,171,1320,117,1380,90.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z;

                M0,192L80,186.7C160,181,320,171,480,154.7C640,139,800,117,960,112C1120,107,1280,117,1360,122.7L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z;

                M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,106.7C672,96,768,128,864,128C960,128,1056,96,1152,74.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z;
              "
            />
          </path>
        </svg>
      </div>

      {/* Content */}
      <div className="z-10 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="bg-[#1e293b] text-blue-400 px-4 py-1 rounded-full inline-block text-sm font-medium border border-blue-400">
            ⚡ Built for Engineering Excellence
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Connect. <span className="text-white">Learn.</span>{" "}
          <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Build.
          </span>
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          The ultimate platform where engineering students and industry trainers
          collaborate to shape the future of technology education.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {/* <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-semibold transition-all">
            Join  →
          </button> */}
          {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-all">
            Become a Trainer
          </button> */}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
