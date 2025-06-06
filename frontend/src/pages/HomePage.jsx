import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white shadow-sm w-full">
        <nav className="max-w-7xl w-full mx-auto flex items-center justify-between py-4 px-4 md:px-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-700 tracking-tight">Smart Grievance</span>
          </div>
          <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
            <li><a href="#" className="hover:text-blue-700">Home</a></li>
            <li><a href="#about" className="hover:text-blue-700">About</a></li>
            <li><a href="#contact" className="hover:text-blue-700">Contact</a></li>
          </ul>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded text-blue-700 border border-blue-700 hover:bg-blue-50 transition">Login</button>
            <button className="px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition">Sign Up</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center py-16 bg-gradient-to-b from-blue-50 to-white w-full">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">Your Voice. Our Priority.</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">Easily submit and track public grievances with our AI-powered smart system for efficient redressal.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 transition">Submit Complaint</button>
            <a href="#about" className="px-6 py-3 border border-blue-700 text-blue-700 rounded font-semibold hover:bg-blue-50 transition">Learn More</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">What is Smart Grievance Management?</h2>
          <p className="text-gray-700 max-w-3xl mb-8">
            This platform enables citizens to file complaints that are automatically classified and routed to the right department using Natural Language Processing (NLP). Designed for transparency, efficiency, and accountability, users can track status in real-time and receive timely resolution updates.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 w-full">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-8 text-center">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 mb-2">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">Step 1</h3>
              <p className="text-gray-600 text-center">Submit your complaint via form or chat</p>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 mb-2">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">Step 2</h3>
              <p className="text-gray-600 text-center">Our AI classifies and routes it instantly</p>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 mb-2">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">Step 3</h3>
              <p className="text-gray-600 text-center">Track progress and get timely updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Login / Signup Section */}
      <section className="py-16">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-blue-50 rounded-lg p-8 flex flex-col items-center">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Citizen Portal</h3>
            <p className="text-gray-700 mb-4">Login to file or track complaints</p>
            <button className="px-6 py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 transition">Citizen Login / Signup</button>
          </div>
          <div className="flex-1 bg-gray-100 rounded-lg p-8 flex flex-col items-center">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Admin / Staff Portal</h3>
            <p className="text-gray-700 mb-4">Access complaint dashboard and analytics</p>
            <button className="px-6 py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 transition">Admin Login</button>
          </div>
        </div>
      </section>

      {/* Impact / Testimonial Section (Optional) */}
      <section className="py-12">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-blue-700 mb-2">Impact</h4>
              <p className="text-2xl font-bold text-gray-800 mb-2">10,000+ complaints resolved</p>
              <p className="text-gray-600">Empowering citizens and building trust in governance.</p>
            </div>
            <div className="flex-1">
              <blockquote className="italic text-gray-700 border-l-4 border-blue-700 pl-4 mb-2">“The platform made it so easy to get my issue resolved!”</blockquote>
              <span className="text-gray-500">— A Satisfied Citizen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-auto w-full">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
          <div className="flex gap-4 mb-2 md:mb-0">
            <a href="#" className="text-gray-600 hover:text-blue-700">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-blue-700">Terms of Use</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-700">Contact Support</a>
          </div>
          <div className="flex gap-3">
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-700"><span className="text-xl">🐦</span></a>
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-700"><span className="text-xl">📘</span></a>
          </div>
        </div>
      </footer>
    </div>
  );
}