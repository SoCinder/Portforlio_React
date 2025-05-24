import React from 'react';

const projects = [
  { title: 'IoT App', image: '/assets/project1.png', desc: 'Monitors sensor data using MQTT and Python.' },
  { title: 'Portfolio Site', image: '/assets/project2.png', desc: 'Personal site built with React and CSS.' },
  { title: 'Mobile Tracker', image: '/assets/project3.png', desc: 'Android app for GPS tracking and alerts.' },
];

export default function Projects() {
  return (
    <div className="container">
      <h2 className="text-center">Projects</h2>
      <div className="grid grid-cols-3">
        {projects.map((proj, index) => (
          <div key={index} className="card">
            <img src={proj.image} alt={proj.title} />
            <h3>{proj.title}</h3>
            <p>{proj.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}