import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const FinanceContext = createContext()

export function FinanceProvider({ children }) {
  // Initialize budgets first to ensure it's an array
  const [budgets, setBudgets] = useState(() => {
    try {
      const saved = localStorage.getItem('budgets')
      console.log('Saved budgets:', saved)
      const parsed = saved ? JSON.parse(saved) : []
      console.log('Parsed budgets:', parsed)
      // Ensure it's an array
      return Array.isArray(parsed) ? parsed : []
    } catch (error) {
      console.error('Error loading budgets:', error)
      return []
    }
  })

  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('expenses')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error loading expenses:', error)
      return []
    }
  })

  const [income, setIncome] = useState(() => {
    try {
      const saved = localStorage.getItem('income')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error loading income:', error)
      return []
    }
  })

  // Persist state to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem('expenses', JSON.stringify(expenses))
    } catch (error) {
      console.error('Error saving expenses:', error)
    }
  }, [expenses])

  useEffect(() => {
    try {
      localStorage.setItem('income', JSON.stringify(income))
    } catch (error) {
      console.error('Error saving income:', error)
    }
  }, [income])

  useEffect(() => {
    try {
      console.log('Saving budgets:', budgets)
      localStorage.setItem('budgets', JSON.stringify(budgets))
    } catch (error) {
      console.error('Error saving budgets:', error)
    }
  }, [budgets])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const addTransaction = (transaction) => {
    if (transaction.type === 'expense') {
      setExpenses(prev => [...prev, { ...transaction, id: Date.now() }])
    } else {
      setIncome(prev => [...prev, { ...transaction, id: Date.now() }])
    }
  }

  const deleteTransaction = (id, type) => {
    if (type === 'expense') {
      setExpenses(prev => prev.filter(expense => expense.id !== id))
    } else {
      setIncome(prev => prev.filter(inc => inc.id !== id))
    }
  }

  const addBudget = (budget) => {
    console.log('Adding budget:', budget)
    setBudgets(prev => {
      const newBudgets = [...prev, { ...budget, id: Date.now() }]
      console.log('New budgets state:', newBudgets)
      return newBudgets
    })
  }

  const updateBudget = (id, newAmount) => {
    setBudgets(prev => prev.map(budget => 
      budget.id === id ? { ...budget, amount: newAmount } : budget
    ))
  }

  const deleteBudget = (id) => {
    setBudgets(prev => prev.filter(budget => budget.id !== id))
  }

  const getCategoryExpenses = (category) => {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  }

  const value = {
    expenses,
    income,
    budgets,
    addTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    deleteBudget,
    getCategoryExpenses,
    formatCurrency
  }

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  )
}

FinanceProvider.propTypes = {
  children: PropTypes.node.isRequired
} 