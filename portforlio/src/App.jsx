// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider }   from './context/AuthContext';
import ProtectedRoute     from './components/ProtectedRoute';

import Navbar             from './components/Navbar';
import Home               from './pages/Home';
import About              from './pages/About';
import Projects           from './pages/Projects';
import Education          from './pages/Education';
import Contact            from './pages/Contact';
import SignUp             from './pages/SignUp';
import SignIn             from './pages/SignIn';
import ProjectsAdmin      from './pages/ProjectsAdmin';
import EducationAdmin     from './pages/EducationAdmin';
import Services from './pages/Services'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="about"      element={<About />} />
          <Route path="projects"   element={<Projects />} />
          <Route path="education"  element={<Education />} />
          <Route path="contact"    element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="signup"     element={<SignUp />} />
          <Route path="signin"     element={<SignIn />} />

          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="admin/projects"  element={<ProjectsAdmin />} />
            <Route path="admin/education" element={<EducationAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
