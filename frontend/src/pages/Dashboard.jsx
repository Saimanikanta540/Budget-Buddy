import React, { useContext } from 'react'
import { FinanceContext } from '../context/FinanceContext'
import { Link } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const { expenses, income, budgets, formatCurrency } = useContext(FinanceContext)
  
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0)
  const totalIncome = income.reduce((total, inc) => total + inc.amount, 0)
  const balance = totalIncome - totalExpenses

  const calculateSpending = (category) => {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0)
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <section className="section">
          <div className="section-header">
            <h1 className="section-title">Dashboard</h1>
          </div>
          
          <div className="dashboard-grid">
            <div className="dashboard-third">
              <div className="card">
                <h3>Total Balance</h3>
                <div className={`amount ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatCurrency(balance)}
                </div>
              </div>
            </div>
            
            <div className="dashboard-third">
              <div className="card">
                <h3>Total Income</h3>
                <div className="amount text-success">{formatCurrency(totalIncome)}</div>
              </div>
            </div>
            
            <div className="dashboard-third">
              <div className="card">
                <h3>Total Expenses</h3>
                <div className="amount text-danger">{formatCurrency(totalExpenses)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Recent Transactions</h2>
            <Link to="/transactions" className="button button-primary">View All</Link>
          </div>
          <div className="card">
            {[...expenses, ...income]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <span className="transaction-description">{transaction.description}</span>
                    <span className={`transaction-amount ${transaction.type === 'expense' ? 'text-danger' : 'text-success'}`}>
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                  <div className="transaction-details">
                    <span className="transaction-category">{transaction.category}</span>
                    <span className="transaction-date">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Budget Overview</h2>
            <Link to="/budgets" className="button button-primary">Manage Budgets</Link>
          </div>
          <div className="dashboard-grid">
            {budgets && budgets.length > 0 ? (
              budgets.map(budget => (
                <div key={budget.id} className="dashboard-half">
                  <div className="card">
                    <h3 className="budget-category">{budget.category}</h3>
                    <div className="budget-progress">
                      <div 
                        className={`progress-bar ${
                          (calculateSpending(budget.category) / budget.amount) * 100 >= 90 ? 'bg-danger' :
                          (calculateSpending(budget.category) / budget.amount) * 100 >= 75 ? 'bg-warning' : 'bg-success'
                        }`}
                        style={{ width: `${Math.min((calculateSpending(budget.category) / budget.amount) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="budget-details">
                      <span>Spent: {formatCurrency(calculateSpending(budget.category))}</span>
                      <span>Budget: {formatCurrency(budget.amount)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="dashboard-full">
                <div className="card text-center">
                  <p>No budgets set yet.</p>
                  <Link to="/budgets" className="button button-primary">Create Budget</Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard 