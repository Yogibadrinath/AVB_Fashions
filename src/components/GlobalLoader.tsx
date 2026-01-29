import React from "react";

const GlobalLoader = () => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(0,0,0,0.4)",
        zIndex: 9999,
      }}
    >
      <div className="text-center text-danger">
        <div className="spinner-border mb-3 text-danger" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
