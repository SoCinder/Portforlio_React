// frontend/src/pages/SignUp.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'' });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
  e.preventDefault();
  try {
    await axios.post('/auth/signup', form);  
    const { data } = await axios.post('/auth/signin', {  
      email: form.email,
      password: form.password
    });
    login(data);       
    navigate('/');     
  } catch (err) {
    const msg = err.response?.data?.message || 'Signup failed';
    console.error('Signup error:', msg);
    alert(msg);
  }
};


  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-4">
      {['name','email','password'].map(f => (
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
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}
