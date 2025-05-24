import React from 'react';
import profile from '../assets/profile.jpg';

export default function About() {
  return (
    <div className="container text-center">
      <h2>About Me</h2>
      <img src={profile} alt="Profile" style={{ width: '150px', borderRadius: '50%' }} />
      <p>Hi, I'm John Doe. I'm a web developer with a passion for creating modern, responsive web applications.</p>
      <a href="/assets/resume.pdf" download>Download My Resume</a>
    </div>
  );
}