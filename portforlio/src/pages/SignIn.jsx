// frontend/src/pages/SignIn.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const { login } = useContext(AuthContext);
  const navigate  = useNavigate();
  const [form, setForm] = useState({ email:'', password:'' });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    const { data } = await axios.post('/auth/signin', form);
    login(data);
    navigate('/');
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-4">
      {['email','password'].map(f => (
        <div key={f} className="mb-4">
          <label className="block mb-1">{f.charAt(0).toUpperCase()+f.slice(1)}</label>
          <input
            type={f==='password'?'password':'text'}
            name={f}
            onChange={handle}
            required
            className="border p-2 w-full"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Sign In
      </button>
    </form>
  );
}
