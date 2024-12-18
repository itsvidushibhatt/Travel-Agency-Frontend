import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PackageDetails from './pages/PackageDetails';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      {/* Navbar appears on all pages */}
      <Navbar />
      
      {/* Routes for page navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/booking" element={<Bookings />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
