import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

export default function Contact() {
  const { auth } = useContext(AuthContext);
  const isAdmin = auth.role === 'admin';
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '' });

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const { data } = await axios.get('/contacts');
    setContacts(data);
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post('/contacts', form);
    setForm({ firstname: '', lastname: '', email: '' });
    fetchContacts();
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this contact?')) return;
    await axios.delete(`/contacts/${id}`);
    fetchContacts();
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Contacts</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', maxWidth: '400px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.5rem' }}>
          {['firstname','lastname','email'].map(f => (
            <input
              key={f}
              name={f}
              type={f === 'email' ? 'email' : 'text'}
              placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
              value={form[f]}
              onChange={handleChange}
              required
              style={{ border: '1px solid #ccc', padding: '0.5rem', borderRadius: '4px' }}
            />
          ))}
        </div>
        {isAdmin ? (
          <button
            type="submit"
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Add Contact
          </button>
        ) : (
          <p style={{ color: '#4b5563' }}>Admin only to add contacts.</p>
        )}
      </form>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {contacts.map(c => (
          <div
            key={c._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)'
            }}
          >
            <h3 style={{ fontWeight: 'bold' }}>{c.firstname} {c.lastname}</h3>
            <p>{c.email}</p>
            {isAdmin && (
              <button
                onClick={() => handleDelete(c._id)}
                style={{
                  marginTop: '0.5rem',
                  color: '#dc2626',
                  background: 'none',
                  border: 'none',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
