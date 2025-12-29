export default function JoinCommunitySection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-400 text-black py-20 px-4">
      {/* Wave top border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[calc(200%+1.3px)] h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.26,22,104.05,29.46,158,18,70.19-15.39,136.88-57.73,207-58.56,61.94-.73,113.79,32.62,173,45.59,75.77,16.28,164.18,1.26,232-25.19C933.36,3.29,995.86-8.34,1057,1.46c51.19,7.87,100.65,26.76,143,50.2V0Z"
            opacity=".25"
            fill="#0b0e1a"
          ></path>
          <path
            d="M0,0V15.81C47.26,36.19,104.05,43.65,158,32.19c70.19-15.39,136.88-57.73,207-58.56,61.94-.73,113.79,32.62,173,45.59,75.77,16.28,164.18,1.26,232-25.19C933.36,3.29,995.86-8.34,1057,1.46c51.19,7.87,100.65,26.76,143,50.2V0Z"
            opacity=".5"
            fill="#0b0e1a"
          ></path>
          <path
            d="M0,0V5.63C47.26,30.19,104.05,43.65,158,32.19c70.19-15.39,136.88-57.73,207-58.56,61.94-.73,113.79,32.62,173,45.59,75.77,16.28,164.18,1.26,232-25.19C933.36,3.29,995.86-8.34,1057,1.46c51.19,7.87,100.65,26.76,143,50.2V0Z"
            fill="#0b0e1a"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Join the Engineering Community?
        </h2>
        <p className="text-lg text-gray-800 mb-8">
          Connect with fellow engineers, learn from industry experts, and accelerate your career.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-[#0b0e1a] text-blue-400 hover:text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
            Join Campus Connect →
          </button>
          <button className="border border-black hover:border-gray-700 px-6 py-3 rounded-lg transition duration-300">
            Browse Students
          </button>
        </div>
      </div>
    </section>
  );
}
