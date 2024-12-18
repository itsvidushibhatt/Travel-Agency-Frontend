import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const PackageDetails = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    specialRequests: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch package details
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/packages/${id}`);
        setPkg(response.data);
        setTotalPrice(response.data.price); // initial total price
      } catch (error) {
        console.error('Error fetching package:', error.message);
        setError('Failed to load package details. Please try again later.');
      }
    };
    fetchPackage();
  }, [id]);

  // Update total price
  useEffect(() => {
    if (pkg) setTotalPrice(form.travelers * pkg.price);
  }, [form.travelers, pkg]);

  // Handle booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const bookingData = { ...form, packageId: id };
      await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, bookingData);
      alert('Booking successful! 🎉');
      setForm({ name: '', email: '', phone: '', travelers: 1, specialRequests: '' });
    } catch (error) {
      console.error('Error booking package:', error.message);
      alert('Failed to book the package. Please try again.');
    }
  };

  // Generate Invoice
  const handleGenerateInvoice = async () => {
    if (!form.name || !form.email || !form.phone || !pkg) {
      alert('Please complete all fields before generating the invoice.');
      return;
    }

    const invoiceData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      travelers: form.travelers,
      packageDetails: {
        title: pkg.title,
        price: pkg.price,
        date: pkg.date,
        time: pkg.time,
      },
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/packages/invoice`,
        invoiceData,
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${form.name}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating invoice:', error.message);
      alert('Failed to generate the invoice.');
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  if (!pkg) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto mt-8 p-4">
        {/* Package Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{pkg.title}</h1>
            <p className="text-gray-600 mt-4">{pkg.description}</p>
            <p className="text-blue-600 text-lg font-semibold mt-2">
              Price per person: ${pkg.price}
            </p>
            <p className="text-green-600 text-lg font-bold mt-2">
              Total Price: ${totalPrice}
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Book This Package</h2>
          <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border rounded p-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border rounded p-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded p-2"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Number of Travelers"
              min="1"
              className="border rounded p-2"
              value={form.travelers}
              onChange={(e) => setForm({ ...form, travelers: Number(e.target.value) })}
              required
            />
            <textarea
              placeholder="Special Requests (optional)"
              className="border rounded p-2 col-span-1 md:col-span-2"
              rows="3"
              value={form.specialRequests}
              onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
            ></textarea>

            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Book Now
            </button>
          </form>

          {/* Generate Invoice Button */}
          <button
            onClick={handleGenerateInvoice}
            disabled={loading}
            className={`w-full mt-4 ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white font-bold py-2 px-4 rounded`}
          >
            {loading ? 'Generating Invoice...' : 'Generate Invoice'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
