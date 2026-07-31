import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

import LandingPage from './pages/LandingPage';
import WorkspacePage from './pages/WorkspacePage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';

import { AuthProvider, useAuth } from './context/AuthContext';
import { RecognitionProvider } from './context/RecognitionContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('landing');
  const { isAuthenticated, openAuthModal } = useAuth();

  // Protected navigation handler
  const handleTabChange = (tabId) => {
    const protectedTabs = ['workspace', 'dashboard', 'history', 'profile'];
    if (protectedTabs.includes(tabId) && !isAuthenticated) {
      openAuthModal('login');
    } else {
      setActiveTab(tabId);
    }
  };

  const handleAuthSuccess = () => {
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F9F7FC] text-gray-800 flex flex-col justify-between font-sans selection:bg-[#E8DFF5] selection:text-gray-900">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
        
        <main className="py-8">
          {activeTab === 'landing' && <LandingPage setActiveTab={handleTabChange} />}
          {activeTab === 'workspace' && <WorkspacePage />}
          {activeTab === 'dashboard' && <DashboardPage setActiveTab={handleTabChange} />}
          {activeTab === 'history' && <HistoryPage setActiveTab={handleTabChange} />}
          {activeTab === 'about' && <AboutPage setActiveTab={handleTabChange} />}
          {activeTab === 'features' && <FeaturesPage setActiveTab={handleTabChange} />}
          {activeTab === 'contact' && <ContactPage />}
          {activeTab === 'profile' && <ProfilePage />}
        </main>
      </div>

      <Footer setActiveTab={handleTabChange} />
      
      <AuthModal onAuthSuccess={handleAuthSuccess} />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RecognitionProvider>
        <AppContent />
      </RecognitionProvider>
    </AuthProvider>
  );
}
