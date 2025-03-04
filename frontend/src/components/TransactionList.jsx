import PropTypes from 'prop-types'
import { useContext } from 'react'
import { FinanceContext } from '../context/FinanceContext'
import './TransactionList.css'

function TransactionList({ transactions, onDelete }) {
  const { formatCurrency } = useContext(FinanceContext)

  return (
    <div className="transactions-list">
      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions found.</p>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
            <div className="transaction-info">
              <span className="transaction-description">{transaction.description}</span>
              <span className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount)}
              </span>
            </div>
            <div className="transaction-details">
              {transaction.type === 'expense' && (
                <span className="transaction-category">{transaction.category}</span>
              )}
              <span className="transaction-date">{transaction.date}</span>
              <button
                onClick={() => onDelete(transaction.id, transaction.type)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['expense', 'income']).isRequired,
      category: PropTypes.string
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired
}

export default TransactionList 