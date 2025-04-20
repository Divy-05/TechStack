import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer 
      className="py-8" 
      style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="https://cdn-icons-png.flaticon.com/128/187/187868.png" 
                alt="TeechTrack Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold ml-2">TeechTrack</span>
            </div>
            <p className="text-sm opacity-80" style={{ color: 'var(--text-color)' }}>
              Empowering educational institutions with innovative management solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/features" 
                  className="text-sm transition duration-300 hover:opacity-80" 
                  style={{ color: 'var(--link-color)' }}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="text-sm transition duration-300 hover:opacity-80" 
                  style={{ color: 'var(--link-color)' }}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  to="/demo" 
                  className="text-sm transition duration-300 hover:opacity-80" 
                  style={{ color: 'var(--link-color)' }}
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-sm transition duration-300 hover:opacity-80" 
                  style={{ color: 'var(--link-color)' }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/help" 
                  className="text-sm transition duration-300 hover:opacity-80" 
                  style={{ color: 'var(--link-color)' }}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  to="/docs" 
                  className="text-sm transition duration-300 hover:opacity-80" 
                  style={{ color: 'var(--link-color)' }}
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-sm transition duration-300 hover:opacity-80" 
                  style={{ color: 'var(--link-color)' }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-sm transition duration-300 hover:opacity-80" 
                  style={{ color: 'var(--link-color)' }}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:support@teechtrack.com" 
                  className="text-sm transition duration-300 hover:opacity-80" 
                  style={{ color: 'var(--link-color)' }}
                >
                  support@teechtrack.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+1234567890" 
                  className="text-sm transition duration-300 hover:opacity-80" 
                  style={{ color: 'var(--link-color)' }}
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="text-sm opacity-80" style={{ color: 'var(--text-color)' }}>
                123 Education St., Suite 456, Knowledge City
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80" style={{ color: 'var(--text-color)' }}>
            &copy; {new Date().getFullYear()} TeechTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;