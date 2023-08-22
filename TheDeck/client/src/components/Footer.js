import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-white" style={{ backgroundColor: '#806043', color: 'white' }}>
      <div className="container p-4 pb-0">
        <div className="text-center p-3">
          <section className="mb-4">
            {/* Social media icons */}
            <a className="btn text-white btn-floating m-1" style={{ backgroundColor: '#806043' }} href="#!" role="button">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a className="btn text-white btn-floating m-1" style={{ backgroundColor: '#806043' }} href="#!" role="button">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a className="btn text-white btn-floating m-1" style={{ backgroundColor: '#806043' }} href="#!" role="button">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </section>
        </div>
      </div>

      {/* Footer content with grid layout */}
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0 d-flex justify-content-start">
            {/* Email address on the left */}
            <p className="custom-text-color" style={{ color: "#806043" }}>contact@example.com</p>
          </div>
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0 d-flex justify-content-end">
            {/* Address on the right */}
            <p className="custom-text-color" style={{ color: "#806043" }}>123 Main Street, City, Country</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
