import React from "react";

const GlobalLoader = () => {
  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
      style={{ 
        zIndex: 9999, 
        background: "transparent", // Fully transparent
        backdropFilter: "blur(4px)" // Blurs the dashboard behind it for focus
      }}
    >
      <div className="text-center">
        <div className="spinner-grow text-danger mb-2" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="text-dark fw-bold tracking-widest m-0" style={{ letterSpacing: '5px', textShadow: '0 0 10px rgba(255,255,255,0.8)' }}>
          AVB <span className="text-danger">FASHIONS</span>
        </h3>
      </div>
    </div>
  );
};

export default GlobalLoader;