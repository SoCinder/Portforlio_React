import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function ProtectedRoute({ adminOnly = false }) {
  const { auth } = useContext(AuthContext);
  if (!auth.token) return <Navigate to="/signin" />;
  if (adminOnly && auth.role !== 'admin') return <Navigate to="/" />;
  return <Outlet />;
}
