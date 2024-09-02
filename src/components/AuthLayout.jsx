import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
    
  }, [authStatus, authentication, navigate]);

  return loader ? <h1>loading...</h1> : {children};
}

export default AuthLayout;

// This code defines a React component named Protected, which is designed to protect routes in your application based on the user's authentication status.

// Logic:

// The useEffect checks if the authantication prop is true (meaning authentication is required):
// If authStatus does not match authantication, it navigates the user to the login page (/login).
// If authantication is false (meaning authentication is not required):
// If authStatus does not match authantication, it navigates the user to the home page (/).

// This component ensures that protected routes are only accessible to authenticated users and redirects unauthorized users to the appropriate pages.