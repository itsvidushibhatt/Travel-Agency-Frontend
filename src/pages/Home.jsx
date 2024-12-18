import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import PackageCard from '../components/PackageCard';

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);  // New state for loading
  const [error, setError] = useState(null);  // New state for error handling

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Log the API URL to ensure it's correct
        console.log('API URL:', process.env.REACT_APP_API_URL);

        // Perform the API request
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/packages`);

        // Log the response to verify the data format
        console.log('API Response:', response.data);

        // Check if the response is an array, then set the state
        if (Array.isArray(response.data)) {
          setPackages(response.data);
        } else {
          console.error('Invalid data format: expected an array');
          setError('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        setError('Error fetching packages');
      } finally {
        setLoading(false); // Set loading to false after the fetch attempt
      }
    };

    fetchPackages();
  }, []);

  // Render loading indicator or error message
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16 md:py-20 lg:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          Explore Our Amazing Travel Packages
        </h1>
        <p className="text-md md:text-lg lg:text-xl italic max-w-2xl mx-auto">
          Your dream vacation is just a click away!
        </p>
      </section>

      {/* Packages Section */}
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Available Packages</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(packages) && packages.length === 0 ? (
            <p className="col-span-full text-center text-lg md:text-xl font-semibold text-gray-600">
              No packages available at the moment. Please check back later!
            </p>
          ) : (
            Array.isArray(packages) ? (
              packages.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)
            ) : (
              <p>Error: Invalid data format.</p> // Handle unexpected response format
            )
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 mt-12 text-center">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} Travel Agency. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
