import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ first: '', last: '', phone: '', email: '', message: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    console.log(form);
    navigate('/');
  };

  return (
    <div className="container">
      <h2 className="text-center">Contact Me</h2>
      <div>
        <p>Email: dangtienminh834@gmail.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input name="first" placeholder="First Name" onChange={handleChange} required />
        <input name="last" placeholder="Last Name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <textarea name="message" placeholder="Message" rows="4" onChange={handleChange} required />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}