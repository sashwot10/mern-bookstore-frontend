import React from 'react';
import BookList from './BookList';
import Lottie from 'react-lottie'; // Import Lottie component
import animationData from '../assets/Animation.json'; // Import the Lottie JSON file
import Testimonials from './Testimonials'; // Import the Testimonials component

const HomePage = () => {
  // Define options for the Lottie player
  const defaultOptions = {
    loop: true,
    autoplay: true, // Make the animation play automatically
    animationData: animationData, // Use the imported animation JSON
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="container mx-auto px-4">
      <header className="text-center mt-8">
        {/* Hero Section with Lottie animation */}
        <div className="flex items-center justify-center flex-col sm:flex-row sm:space-x-4">
          <div className="w-full sm:w-1/2">
            <Lottie options={defaultOptions} height={400} width={300} />
          </div>
          <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
            <h1 className="responsive-heading">Welcome to the Bookstore</h1>
            <p className="text-base sm:text-lg break-text">Discover a wide variety of books to explore.  </p>
          </div>
        </div>

        {/* BookList Component */}
        <div className="mt-12">
          <BookList />
        </div>
      </header>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default HomePage;