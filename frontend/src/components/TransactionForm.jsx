import { useState } from 'react'
import PropTypes from 'prop-types'
import './TransactionForm.css'

const expenseCategories = [
  'food',
  'transportation',
  'utilities',
  'entertainment',
  'shopping',
  'healthcare',
  'other'
]

function TransactionForm({ onSubmit, type = 'expense', categories }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('other')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!description.trim() || !amount) return

    const transaction = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0],
      type
    }

    onSubmit(transaction)
    setDescription('')
    setAmount('')
    setCategory('other')
  }

  // Use provided categories for income, or default expense categories for expenses
  const categoryOptions = type === 'income' ? categories : expenseCategories

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} description`}
        className="form-input"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="form-input"
        step="0.01"
        min="0"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="form-select"
      >
        {categoryOptions.map(cat => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
      <button type="submit" className={`submit-button ${type}-button`}>
        Add {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    </form>
  )
}

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['expense', 'income']),
  categories: PropTypes.arrayOf(PropTypes.string)
}

TransactionForm.defaultProps = {
  type: 'expense',
  categories: []
}

export default TransactionForm 