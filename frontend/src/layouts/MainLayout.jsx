import { Link, Outlet } from 'react-router-dom'
import './MainLayout.css'

function MainLayout() {
  return (
    <div className="layout">
      <nav className="main-nav">
        <div className="nav-brand">Finance Manager</div>
        <ul className="nav-links">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/expenses">Expenses</Link></li>
          <li><Link to="/income">Income</Link></li>
          <li><Link to="/budgets">Budgets</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
        </ul>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout 