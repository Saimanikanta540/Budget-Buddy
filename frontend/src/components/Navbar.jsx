import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src="./budgetBuddyLogo.png" alt="logo" />
        <h1>Budget Buddy</h1>
      </div>
      <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isMenuOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>
      <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end onClick={closeMenu}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/expenses" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
            Expenses
          </NavLink>
        </li>
        <li>
          <NavLink to="/income" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
            Income
          </NavLink>
        </li>
        <li>
          <NavLink to="/budgets" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
            Budgets
          </NavLink>
        </li>
        <li>
          <NavLink to="/transactions" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
            Transactions
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;