import React, { useContext, useState } from 'react'
import { FinanceContext } from '../context/FinanceContext'
import BudgetCard from '../components/BudgetCard'
import './Budgets.css'

function Budgets() {
  const { budgets, expenses, addBudget, updateBudget, deleteBudget } = useContext(FinanceContext)
  const [newBudget, setNewBudget] = useState({ category: '', amount: '' })

  console.log('Current budgets:', budgets) // Debug log

  const calculateSpending = (category) => {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newBudget.category || !newBudget.amount) return
    
    addBudget({
      category: newBudget.category.trim(),
      amount: parseFloat(newBudget.amount)
    })
    
    setNewBudget({ category: '', amount: '' })
  }

  const handleUpdate = (id, newAmount) => {
    if (isNaN(newAmount) || newAmount < 0) return
    updateBudget(id, parseFloat(newAmount))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      deleteBudget(id)
    }
  }

  // Ensure budgets is an array
  const budgetsList = Array.isArray(budgets) ? budgets : []

  return (
    <div className="page-container">
      <div className="page-content">
        <section className="section">
          <div className="section-header">
            <h1 className="section-title">Budget Management</h1>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit} className="budget-form">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  className="form-input"
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                  placeholder="Enter budget category"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  className="form-input"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
                  placeholder="Enter budget amount"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <button type="submit" className="submit-button">Add Budget</button>
            </form>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Current Budgets</h2>
          </div>
          
          <div className="budgets-grid">
            {budgetsList.length > 0 ? (
              budgetsList.map(budget => (
                <BudgetCard
                  key={budget.id}
                  id={budget.id}
                  category={budget.category}
                  budgetAmount={budget.amount}
                  spentAmount={calculateSpending(budget.category)}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="dashboard-full">
                <div className="card text-center">
                  <p>No budgets set yet. Add your first budget above!</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Budgets 