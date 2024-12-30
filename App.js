import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Pricing from './Pages/Pricing';
import About from './Pages/About';
import Contact from './Pages/Contact';
import ProjectDetails from './Pages/ProjectDetails';
import LoadCalculation from './Pages/LoadCalculation';
import ModeOfDrive from './Pages/ModeOfDrive';
import Hydraulic from './Pages/Hydraulic';
import PageNotFound from './Pages/PageNotFound';

function App() {
  const [projectDetails, setProjectDetails] = useState(null);
  const [loadDetails, setLoadDetails] = useState(null);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Project Details Page */}
        <Route 
          path="/project-details" 
          element={
            <ProjectDetails 
              setProjectDetails={setProjectDetails}
              nextPage="/load-calculation" 
            />
          } 
        />

        {/* Load Calculation Page */}
        <Route 
          path="/load-calculation" 
          element={
            projectDetails ? (
              <LoadCalculation 
                projectDetails={projectDetails}
                setLoadDetails={setLoadDetails}
                nextPage="/mode-of-drive"
              />
            ) : (
              <Navigate to="/project-details" />
            )
          } 
        />

        {/* Mode of Drive Page */}
        <Route 
          path="/mode-of-drive" 
          element={
            loadDetails ? (
              <ModeOfDrive nextPage="/hydraulic" />
            ) : (
              <Navigate to="/load-calculation" />
            )
          } 
        />

       
        {/* Design Page */}
        <Route 
          path="/hydraulic" 
          element={
            projectDetails && loadDetails ? (
              <Hydraulic
                projectDetails={projectDetails} 
                loadDetails={loadDetails} 
                // Pass the wall selection to Design
              />
            ) : (
              <Navigate to="/project-details" />
            )
          } 
        />

        {/* Page Not Found */}
        <Route path="/not-found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
