import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function Projects() {
  const { auth } = useContext(AuthContext);
  const isAdmin = auth.role === 'admin';
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await axios.get('/projects');
        setProjects(res.data);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Remove this project?')) return;
    await axios.delete(`/projects/${id}`);
    setProjects(prev => prev.filter(p => p._id !== id));
  }

  if (loading) {
    return <p style={{ padding: '1rem', textAlign: 'center' }}>Loading…</p>;
  }

  if (error) {
    return <p style={{ padding: '1rem', color: '#dc2626', textAlign: 'center' }}>{error}</p>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: '600' }}>Projects</h2>
        {isAdmin && (
          <Link
            to="/admin/projects"
            style={{
              backgroundColor: '#16a34a',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              textDecoration: 'none'
            }}
          >
            Manage Projects
          </Link>
        )}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {projects.map(proj => (
          <div
            key={proj._id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}
          >
            <img
              src={proj.image}
              alt={proj.title}
              style={{
                width: '100%',
                height: '192px',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{proj.title}</h3>
              <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>{proj.desc}</p>
              {proj.link && (
                <a
                  href={proj.link}
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
              {isAdmin && (
                <button
                  onClick={() => handleDelete(proj._id)}
                  style={{
                    marginTop: '1rem',
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
          </div>
        ))}
      </div>
    </div>
  );
}
