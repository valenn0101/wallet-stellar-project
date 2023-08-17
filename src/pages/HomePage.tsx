import React from 'react';
import Login from '../components/Home/Login';
import Register from '../components/Home/Register';

function HomePage() {
  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <div className="auth-form-content">
          <Login />
          <Register />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
