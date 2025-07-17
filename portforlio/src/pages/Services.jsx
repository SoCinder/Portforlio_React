import React from 'react';

const services = [
  { name: 'Web Development', icon: '🌐' },
  { name: 'Mobile App Development', icon: '📱' },
  { name: 'Backend API Development', icon: '🧠' },
];

export default function Services() {
  return (
  <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', padding: '1rem' }}>
    <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.5rem' }}>Services</h2>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    }}>
      {services.map((service, index) => (
        <div key={index} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '40px' }}>{service.icon}</div>
          <h3 style={{ marginTop: '0.5rem' }}>{service.name}</h3>
        </div>
      ))}
    </div>
  </div>
);

}