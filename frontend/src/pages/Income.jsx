import React, { useContext, useState } from 'react'
import { FinanceContext } from '../context/FinanceContext'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import './Income.css'

function Income() {
  const { income, formatCurrency, addTransaction, deleteTransaction } = useContext(FinanceContext)
  const [selectedSource, setSelectedSource] = useState('all')

  // Define default income sources
  const defaultSources = ['salary', 'freelance', 'investments', 'other']
  const sources = ['all', ...defaultSources]
  
  const filteredIncome = selectedSource === 'all'
    ? income
    : income.filter(inc => inc.category === selectedSource)

  const totalIncome = filteredIncome.reduce((total, inc) => total + inc.amount, 0)

  const handleAddIncome = (transaction) => {
    // Ensure category is set for income transactions
    const category = transaction.category || 'other'
    addTransaction({ ...transaction, type: 'income', category })
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <section className="section">
          <div className="section-header">
            <h1 className="section-title">Income</h1>
            <div className="filter-controls">
              <select
                className="form-select"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                {sources.map(source => (
                  <option key={source} value={source}>
                    {source.charAt(0).toUpperCase() + source.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-full">
              <div className="card">
                <h3>Total Income</h3>
                <div className="amount text-success">{formatCurrency(totalIncome)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Add New Income</h2>
          </div>
          <div className="card">
            <TransactionForm 
              type="income" 
              onSubmit={handleAddIncome}
              categories={defaultSources}
            />
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Income History</h2>
          </div>
          <div className="card">
            <TransactionList
              transactions={filteredIncome}
              onDelete={deleteTransaction}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Income 