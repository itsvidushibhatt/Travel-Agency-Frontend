import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    date: '',
    time: '',
  });
  const [editingPackage, setEditingPackage] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/bookings`);
        setBookings(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/packages`);
        setPackages(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching packages:', error.message);
      }
    };

    fetchBookings();
    fetchPackages();
  }, []);

  const handleAddPackage = async () => {
    const packageData = { ...form, price: Number(form.price) };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/packages`, packageData);
      setPackages([...packages, response.data]);
      setForm({ title: '', description: '', price: '', image: '', date: '', time: '' });
    } catch (error) {
      console.error('Error adding package:', error.message);
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/packages/${id}`);
      setPackages(packages.filter((pkg) => pkg._id !== id));
    } catch (error) {
      console.error('Error deleting package:', error.message);
    }
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setForm({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      image: pkg.image,
      date: pkg.date,
      time: pkg.time,
    });
  };

  const handleUpdatePackage = async () => {
    if (!editingPackage) return;

    const updatedData = { ...form, price: Number(form.price) };
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/admin/packages/${editingPackage._id}`, updatedData);

      setPackages(packages.map((pkg) => (pkg._id === editingPackage._id ? response.data : pkg)));
      setEditingPackage(null);
      setForm({ title: '', description: '', price: '', image: '', date: '', time: '' });
    } catch (error) {
      console.error('Error updating package:', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-center">Admin Panel</h1>

      {/* View Bookings */}
      <div className="mt-8 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Bookings</h2>
        <table className="min-w-full border text-sm md:text-base">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Package</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(bookings) && bookings.length > 0) ? (
              bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-100">
                  <td className="border p-2">{booking.name}</td>
                  <td className="border p-2">{booking.packageId?.title || 'N/A'}</td>
                  <td className="border p-2">{booking.email}</td>
                  <td className="border p-2">{booking.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No bookings available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Manage Packages */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">{editingPackage ? 'Update Package' : 'Add New Package'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border rounded p-2 w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="border rounded p-2 w-full"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="border rounded p-2 w-full"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="border rounded p-2 w-full"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <input
            type="date"
            placeholder="Tour Date"
            className="border rounded p-2 w-full"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="time"
            placeholder="Tour Time"
            className="border rounded p-2 w-full"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>
        <div className="mt-4">
          {editingPackage ? (
            <button onClick={handleUpdatePackage} className="bg-yellow-500 text-white px-4 py-2 rounded">
              Update Package
            </button>
          ) : (
            <button onClick={handleAddPackage} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Package
            </button>
          )}
        </div>
      </div>

      {/* Display Existing Packages */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Existing Packages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(Array.isArray(packages) && packages.length > 0) ? (
            packages.map((pkg) => (
              <div key={pkg._id} className="border p-4 rounded shadow-md hover:shadow-lg transition-all">
                <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover rounded" />
                <h3 className="text-lg font-bold mt-2">{pkg.title}</h3>
                <p className="text-gray-600 mt-1">{pkg.description}</p>
                <p className="text-green-600 mt-1">Price: ${pkg.price}</p>
                <p className="text-blue-500 mt-1">Date: {pkg.date || 'N/A'}</p>
                <p className="text-blue-500 mt-1">Time: {pkg.time || 'N/A'}</p>
                <div className="mt-4 flex justify-between">
                  <button onClick={() => handleEditPackage(pkg)} className="bg-yellow-500 text-white py-1 px-3 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDeletePackage(pkg._id)} className="bg-red-500 text-white py-1 px-3 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No packages available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

