import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Gravatar from 'react-gravatar';

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <div>
      <header>
        {user && (
          <div>
            <Gravatar email={user.email} size={50} />
            <span>{user.name}</span>
          </div>
        )}
        <button onClick={() => navigate('/')}>Anasayfa</button>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
     