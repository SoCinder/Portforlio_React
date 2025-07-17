import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

export default function ProjectsAdmin() {
  const { auth } = useContext(AuthContext);
  if (auth.role !== 'admin') return <p>Access denied.</p>;

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', desc: '', image: '', link: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data } = await axios.get('/projects');
    setProjects(data);
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editingId) {
      await axios.put(`/projects/${editingId}`, form);
    } else {
      await axios.post('/projects', form);
    }
    setForm({ title: '', desc: '', image: '', link: '' });
    setEditingId(null);
    fetchProjects();
  }

  function startEdit(p) {
    setForm({ title: p.title, desc: p.desc, image: p.image, link: p.link });
    setEditingId(p._id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Remove this project?')) return;
    await axios.delete(`/projects/${id}`);
    fetchProjects();
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem' }}>
        Manage Projects
      </h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'grid', gap: '1rem', maxWidth: '600px' }}>
        {[
          { name: 'title', placeholder: 'Title' },
          { name: 'desc', placeholder: 'Description' },
          { name: 'image', placeholder: 'Image URL' },
          { name: 'link', placeholder: 'Live Link' }
        ].map(({ name, placeholder }) => (
          <input
            key={name}
            name={name}
            placeholder={placeholder}
            value={form[name]}
            onChange={handleChange}
            required
            style={{
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        ))}
        <button
          type="submit"
          style={{
            backgroundColor: '#16a34a',
            color: '#fff',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {editingId ? 'Update Project' : 'Add Project'}
        </button>
      </form>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {projects.map(p => (
          <div
            key={p._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              padding: '1rem'
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover',
                marginBottom: '0.5rem',
                borderRadius: '4px'
              }}
            />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{p.title}</h3>
            <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>{p.desc}</p>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#2563eb',
                  textDecoration: 'none',
                  display: 'inline-block',
                  marginTop: '0.5rem'
                }}
                onMouseEnter={e => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={e => (e.target.style.textDecoration = 'none')}
              >
                View Live
              </a>
            )}
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={() => startEdit(p)}
                style={{
                  color: '#ca8a04',
                  background: 'none',
                  border: 'none',
                  textDecoration: 'underline',
                  marginRight: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                style={{
                  color: '#dc2626',
                  background: 'none',
                  border: 'none',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
