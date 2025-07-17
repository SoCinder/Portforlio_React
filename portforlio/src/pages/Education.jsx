import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function Education() {
  const { auth } = useContext(AuthContext);
  const isAdmin = auth.role === 'admin';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('/education');
        setItems(data);
      } catch {
        setError('Unable to load data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Delete this entry?')) return;
    await axios.delete(`/education/${id}`);
    setItems(prev => prev.filter(e => e._id !== id));
  }

  if (loading) {
    return <p style={{ padding: '1rem', textAlign: 'center' }}>Loading…</p>;
  }

  if (error) {
    return <p style={{ padding: '1rem', color: '#dc2626', textAlign: 'center' }}>{error}</p>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '600' }}>Education</h2>
        {isAdmin && (
          <Link
            to="/admin/education"
            style={{
              backgroundColor: '#16a34a',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              textDecoration: 'none'
            }}
          >
            Manage Education
          </Link>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {items.map(entry => (
          <div key={entry._id} style={{
            backgroundColor: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{entry.school}</h3>
              <p style={{ marginTop: '0.25rem', color: '#374151' }}>
                {entry.degree} in {entry.field}
              </p>
              <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
                {new Date(entry.startDate).toLocaleDateString()} –{' '}
                {new Date(entry.endDate).toLocaleDateString()}
              </p>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(entry._id)}
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
