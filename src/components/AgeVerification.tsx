'use client';
import React, { useState, useEffect } from 'react';

const AgeVerification = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const hasVerified = localStorage.getItem('ageVerified');
    if (!hasVerified) {
      setShowModal(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowModal(false);
  };

  const handleDeny = () => {
    window.location.href = 'https://www.responsibility.org/';
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center">
      <div className="bg-[#1a2e35] text-white p-8 rounded-2xl max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Age Verification Required</h2>
          <div className="w-16 h-1 bg-[#044588] mx-auto mb-6"></div>
          
          <p className="mb-6 text-gray-300">
            You must be 21 years or older to enter this site. 
            Please verify your age to continue.
          </p>

          <p className="mb-8 text-sm text-gray-400">
            By entering this site you are agreeing to our Terms of Service and Privacy Policy.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleVerify}
              className="w-full bg-[#044588] hover:bg-[#044588]/90 text-white py-3 px-6 rounded-full transition-colors"
            >
              I am 21 or older
            </button>
            
            <button
              onClick={handleDeny}
              className="w-full bg-transparent border border-white/20 hover:bg-white/10 text-white py-3 px-6 rounded-full transition-colors"
            >
              I am under 21
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification; 