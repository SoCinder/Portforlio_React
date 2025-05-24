import React from 'react';

const services = [
  { name: 'Web Development', icon: '🌐' },
  { name: 'Mobile App Development', icon: '📱' },
  { name: 'Backend API Development', icon: '🧠' },
];

export default function Services() {
  return (
    <div className="container text-center">
      <h2>Services</h2>
      <div className="grid grid-cols-3">
        {services.map((service, index) => (
          <div key={index} className="card">
            <div style={{ fontSize: '40px' }}>{service.icon}</div>
            <h3>{service.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}