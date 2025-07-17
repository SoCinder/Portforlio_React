// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    role:  localStorage.getItem('role'),
    name:  localStorage.getItem('name')
  });

  useEffect(() => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL
  axios.defaults.headers.common['Authorization'] = auth.token
    ? `Bearer ${auth.token}`
    : ''
}, [auth.token])

  const login = ({ token, role, name }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('name', name);
    setAuth({ token, role, name });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null, name: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
