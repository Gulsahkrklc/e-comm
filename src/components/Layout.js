import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Gravatar from 'react-gravatar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;