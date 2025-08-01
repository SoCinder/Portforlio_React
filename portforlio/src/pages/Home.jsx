import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="container text-center">
      <h1>Welcome to My Portfolio</h1>
      <p>Passionate about developing full-stack solutions and building impactful user experiences.</p>
      <button onClick={() => navigate('/about')}>Learn More About Me</button>
      <p>This site was updated via CI/CD pipeline using GitHub and Render!</p>
    </div>
  );
}