import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Budgets from './pages/Budgets';
import Transactions from './pages/Transactions';
import './App.css';

function App() {
  return (
    <FinanceProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/income" element={<Income />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/transactions" element={<Transactions />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FinanceProvider>
  );
}

export default App;
