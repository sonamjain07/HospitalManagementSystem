import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-semibold mb-4">
          Welcome to Our Medical Service
        </h1>
        <p className="text-xl mb-8">
          Your health is our priority. Find the best doctors and book
          appointments online.
        </p>
        <Link to="/book-appointment">
          <button className="bg-white text-teal-800 px-6 py-2 rounded-lg font-semibold hover:bg-teal-100 transition duration-300">
            Book Appointment
          </button>
        </Link>
      </section>

      {/* Navigation Links Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-8">Explore Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link
              to="/doctors"
              className="text-teal-600 text-xl font-semibold hover:text-teal-800"
            >
              View Doctors
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link
              to="/book-appointment"
              className="text-teal-600 text-xl font-semibold hover:text-teal-800"
            >
              Book an Appointment
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link
              to="/patient-list"
              className="text-teal-600 text-xl font-semibold hover:text-teal-800"
            >
              Patients List
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          We offer a range of healthcare services to ensure you receive the best
          care possible.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-8">
          Book your appointment now and take control of your health.
        </p>
        <Link to="/book-appointment">
          <button className="bg-white text-teal-800 px-8 py-3 rounded-lg font-semibold hover:bg-teal-100 transition duration-300">
            Book Appointment
          </button>
        </Link>
      </section>
    </div>
  );
}
