import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>📚 BukuSontang</h1>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          Beranda
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => isActive ? 'active' : ''}>
          Statistik
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;