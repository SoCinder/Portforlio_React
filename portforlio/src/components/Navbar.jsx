import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import logo from '../assets/logo.png';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/education', label: 'Education' },
  { to: '/contact', label: 'Contact' },
  { to: '/services', label: 'Services' }
];

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  return (
    <nav
      style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <NavLink to="/">
          <img src={logo} alt="Logo" style={{ height: '60px', width: 'auto' }} />
        </NavLink>

        <ul style={{ display: 'flex', gap: '16px', listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                style={({ isActive }) => ({
                  textDecoration: isActive ? 'underline' : 'none',
                  color: 'white',
                })}
                onMouseEnter={e => (e.target.style.color = '#D1D5DB')} 
                onMouseLeave={e => (e.target.style.color = 'white')}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {auth.token ? (
          <>
            <span style={{ marginRight: '16px' }}>Hello, {auth.name}</span>
            <button
              onClick={logout}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/signin"
              style={{ marginRight: '16px', color: 'white', textDecoration: 'none' }}
              onMouseEnter={e => (e.target.style.color = '#D1D5DB')}
              onMouseLeave={e => (e.target.style.color = 'white')}
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              style={{ color: 'white', textDecoration: 'none' }}
              onMouseEnter={e => (e.target.style.color = '#D1D5DB')}
              onMouseLeave={e => (e.target.style.color = 'white')}
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
