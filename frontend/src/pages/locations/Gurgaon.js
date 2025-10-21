import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO.js";
import ReviewModal from "../../components/ReviewModal";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";

const Gurgaon = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* SEO Metadata */}
      <SEO
        title="Vastu Shakti Gurgaon – Best Vastu Consultant in Gurgaon"
        description="Book a Vastu consultation in Gurgaon with Sumedha Chandra. Home, office, wealth, health Vastu solutions tailored for Gurgaon residents."
        keywords="Vastu Shakti Gurgaon, Vastu consultant Gurgaon, Vastu expert Gurgaon, Sumedha Chandra Gurgaon, best Vastu in Gurgaon"
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-red-600 to-orange-400 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Transform Your Life with Vastu Shakti in Gurgaon
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Book a Vastu consultation with Sumedha Chandra and create a harmonious and prosperous living space in Gurgaon.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/book-consultation"
            className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            Book Consultation <FiArrowRight className="inline ml-2" />
          </Link>
          <Link
            to="/about"
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Location Content */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Vastu Services in Gurgaon</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Vastu Shakti offers expert Vastu consultation services for homes, offices, and other spaces in <strong>Gurgaon</strong>. Our certified Vastu specialists, led by Sumedha Chandra, provide personalized guidance to improve health, wealth, relationships, and overall harmony.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Whether you are looking for home Vastu, office Vastu, wealth Vastu, or health Vastu, our solutions are tailored for Gurgaon residents to achieve maximum positive results.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Experience the power of ancient Vastu Shastra combined with modern insights to bring prosperity and balance to your life.
        </p>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            to="/book-consultation"
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition shadow-lg"
          >
            Book Free Consultation <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Reviews CTA */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-6">Customer Reviews in Gurgaon</h2>
        <p className="text-gray-600 mb-6">
          Share your review or read what our satisfied Gurgaon clients have to say.
        </p>
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition shadow-lg flex items-center mx-auto"
        >
          <FiMessageCircle className="w-6 h-6 mr-2" />
          Write or Read Reviews
        </button>
      </section>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
};

export default Gurgaon;
