import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CompanyPage from './pages/CompanyPage';

const App: React.FC = () => {
  // Set to `true` to view the dashboard page directly during development.
  const isAuthenticated = true;

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col">
        <Header isAuthenticated={isAuthenticated} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth/login" />} 
            />
            <Route 
              path="/profile" 
              element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth/login" />} 
            />
            <Route 
              path="/company" 
              element={isAuthenticated ? <CompanyPage /> : <Navigate to="/auth/login" />} 
            />
            {/* Redirect any unknown paths to the main route */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
          </Routes>
        </main>
        {/* Footer is removed from dashboard view for more space */}
        {!isAuthenticated && <Footer />}
      </div>
    </HashRouter>
  );
};

export default App;