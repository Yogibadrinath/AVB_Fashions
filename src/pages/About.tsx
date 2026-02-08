import React from 'react';

function About() {
  const phoneNumber = "7708172401";

  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold text-primary mb-3">AVB Fashions</h1>
          <p className="lead text-muted">
            Quality Threads. Timeless Traditions.
          </p>
          <div 
            style={{ width: '60px', height: '4px', backgroundColor: '#0d6efd', marginBottom: '20px' }}
          ></div>
        </div>
        <div className="col-md-6 text-center">
          <div className="p-5 bg-light rounded-3 shadow-sm border">
            <h3 className="text-secondary fst-italic">"Your destination for premium textiles and ready-made elegance."</h3>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* Details Section */}
      <div className="row g-4">
        {/* Quality Card */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">Our Quality</h5>
              <p className="card-text text-muted">
                We specialize in hand-picked Chudidhar sets, Tops, and Kids' wear, ensuring every fabric meets our high standards for comfort and durability.
              </p>
            </div>
          </div>
        </div>

        {/* Store & Contact Card */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm text-white bg-primary">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title fw-bold">Visit Our Store</h5>
              <p className="card-text mb-4">
                📍 23 Bazaar Street<br />
                Pallipat, Thiruvallur District
              </p>
              
              <div className="mt-auto">
                <h6 className="fw-bold mb-1">Contact Us:</h6>
                <a 
                  href={`tel:${phoneNumber}`} 
                  className="text-white text-decoration-none fs-5 d-block mb-3"
                >
                  📞 {phoneNumber}
                </a>
                <a 
                  href={`tel:${phoneNumber}`} 
                  className="btn btn-light btn-sm w-100 fw-bold shadow-sm"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Our Promise Card */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">Our Promise</h5>
              <p className="card-text text-muted">
                Affordable pricing without compromising on style. We bring the latest trends from the loom directly to your wardrobe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-5 text-center">
        <p className="text-muted mb-4">Have questions about our latest arrivals? Get in touch with us today.</p>
        <a 
          href="https://maps.app.goo.gl/FUDW7yUtCPyxe2ER6" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-outline-primary px-4 py-2"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

export default About;