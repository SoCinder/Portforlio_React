import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

export default function EducationAdmin() {
  const { auth } = useContext(AuthContext);
  if (auth.role !== 'admin') return <p style={{ padding: '1rem' }}>Access denied.</p>;

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    school: '', degree: '', field: '', startDate: '', endDate: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  async function fetchEducation() {
    const { data } = await axios.get('/education');
    setItems(data);
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      startDate: new Date(form.startDate),
      endDate: new Date(form.endDate)
    };
    if (editingId) {
      await axios.put(`/education/${editingId}`, payload);
    } else {
      await axios.post(`/education`, payload);
    }
    setForm({ school: '', degree: '', field: '', startDate: '', endDate: '' });
    setEditingId(null);
    fetchEducation();
  }

  function startEdit(e) {
    setForm({
      school: e.school,
      degree: e.degree,
      field: e.field,
      startDate: e.startDate.slice(0, 10),
      endDate: e.endDate.slice(0, 10)
    });
    setEditingId(e._id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this entry?')) return;
    await axios.delete(`/education/${id}`);
    fetchEducation();
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem' }}>
        Manage Education
      </h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'grid', gap: '1rem', maxWidth: '600px' }}>
        {[
          { name: 'school', placeholder: 'School Name', type: 'text' },
          { name: 'degree', placeholder: 'Degree', type: 'text' },
          { name: 'field', placeholder: 'Field of Study', type: 'text' },
          { name: 'startDate', placeholder: 'Start Date', type: 'date' },
          { name: 'endDate', placeholder: 'End Date', type: 'date' }
        ].map(({ name, placeholder, type }) => (
          <input
            key={name}
            name={name}
            type={type}
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
          {editingId ? 'Update Entry' : 'Add Entry'}
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map(e => (
          <div
            key={e._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              {e.school} – {e.degree}
            </h3>
            <p>{e.field}</p>
            <p style={{ color: '#6b7280' }}>
              {new Date(e.startDate).toLocaleDateString()} – {new Date(e.endDate).toLocaleDateString()}
            </p>
            <div style={{ marginTop: '0.5rem' }}>
              <button
                onClick={() => startEdit(e)}
                style={{
                  color: '#ca8a04',
                  background: 'none',
                  border: 'none',
                  textDecoration: 'underline',
                  marginRight: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(e._id)}
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
