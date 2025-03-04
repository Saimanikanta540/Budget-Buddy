import React, { useContext, useState } from 'react'
import { FinanceContext } from '../context/FinanceContext'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import './Expenses.css'

function Expenses() {
  const { expenses, formatCurrency, addTransaction, deleteTransaction } = useContext(FinanceContext)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Define default expense categories
  const defaultCategories = ['food', 'transportation', 'utilities', 'entertainment', 'shopping', 'healthcare', 'other']
  const categories = ['all', ...defaultCategories]
  
  const filteredExpenses = selectedCategory === 'all'
    ? expenses
    : expenses.filter(expense => expense.category === selectedCategory)

  const totalExpenses = filteredExpenses.reduce((total, expense) => total + expense.amount, 0)

  const handleAddExpense = (transaction) => {
    // Ensure category is set for expense transactions
    const category = transaction.category || 'other'
    addTransaction({ ...transaction, type: 'expense', category })
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <section className="section">
          <div className="section-header">
            <h1 className="section-title">Expenses</h1>
            <div className="filter-controls">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-full">
              <div className="card">
                <h3>Total Expenses</h3>
                <div className="amount text-danger">{formatCurrency(totalExpenses)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Add New Expense</h2>
          </div>
          <div className="card">
            <TransactionForm 
              type="expense" 
              onSubmit={handleAddExpense}
              categories={defaultCategories}
            />
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Expense History</h2>
          </div>
          <div className="card">
            <TransactionList
              transactions={filteredExpenses}
              onDelete={deleteTransaction}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Expenses 