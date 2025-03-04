import { useContext, useState } from 'react'
import { FinanceContext } from '../context/FinanceContext'
import TransactionList from '../components/TransactionList'
import './Transactions.css'

function Transactions() {
  const { expenses, income, deleteTransaction } = useContext(FinanceContext)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [transactionType, setTransactionType] = useState('all')

  const categories = [
    'food',
    'transportation',
    'utilities',
    'entertainment',
    'shopping',
    'healthcare',
    'other'
  ]

  const filterTransactions = () => {
    let filtered = [...expenses, ...income]

    // Filter by transaction type
    if (transactionType !== 'all') {
      filtered = filtered.filter(t => t.type === transactionType)
    }

    // Filter by category (only for expenses)
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => 
        t.type === 'expense' ? t.category === selectedCategory : false
      )
    }

    // Filter by date range
    const today = new Date()
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))
    const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7))

    switch (dateRange) {
      case 'week':
        filtered = filtered.filter(t => new Date(t.date) >= sevenDaysAgo)
        break
      case 'month':
        filtered = filtered.filter(t => new Date(t.date) >= thirtyDaysAgo)
        break
      default:
        break
    }

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  return (
    <div className="transactions-page">
      <h1>Transaction History</h1>

      <div className="filters">
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="expense">Expenses</option>
          <option value="income">Income</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
          disabled={transactionType === 'income'}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Time</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      <TransactionList 
        transactions={filterTransactions()}
        onDelete={deleteTransaction}
      />
    </div>
  )
}

export default Transactions 