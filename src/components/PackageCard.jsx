import React from 'react';
import { Link } from 'react-router-dom';

const PackageCard = ({ pkg }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col sm:flex-row md:flex-col lg:flex-row">
      {/* Image Section */}
      <div className="w-full sm:w-1/2 md:w-full lg:w-1/2">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-48 sm:h-64 md:h-48 lg:h-64 object-cover rounded-t-lg sm:rounded-l-lg md:rounded-t-lg lg:rounded-l-lg"
        />
      </div>

      {/* Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
            {pkg.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-2">
            {pkg.description.length > 100
              ? `${pkg.description.substring(0, 100)}...`
              : pkg.description}
          </p>

          {/* Price */}
          <p className="text-xl text-blue-700 font-semibold mt-4">${pkg.price}</p>

          {/* Date and Time */}
          <p className="text-gray-500 mt-2">
            <span className="font-medium text-gray-700">Date:</span> {pkg.date || 'Not specified'}
          </p>
          <p className="text-gray-500 mt-1">
            <span className="font-medium text-gray-700">Time:</span> {pkg.time || 'Not specified'}
          </p>
        </div>

        {/* Book Now Button */}
        <Link
          to={`/packages/${pkg._id}`}
          className="mt-6 inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2 px-4 rounded-lg shadow-md hover:bg-gradient-to-l from-indigo-600 to-blue-500 hover:shadow-lg transition-all duration-200 self-start"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
