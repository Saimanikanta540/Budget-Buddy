import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FinanceContext } from '../context/FinanceContext';
import './BudgetCard.css';

function BudgetCard({ id, category, budgetAmount, spentAmount, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editAmount, setEditAmount] = useState(budgetAmount);
  const { formatCurrency } = useContext(FinanceContext);
  
  const progress = (spentAmount / budgetAmount) * 100;
  const remaining = budgetAmount - spentAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(id, editAmount);
    setIsEditing(false);
  };

  return (
    <div className="budget-card">
      <div className="budget-header">
        <h3 className="budget-category">{category}</h3>
        <div className="budget-actions">
          <button 
            className="action-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button 
            className="action-button delete"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(parseFloat(e.target.value))}
            className="form-input"
            min="0"
            step="0.01"
            required
          />
          <button type="submit" className="submit-button">
            Save
          </button>
        </form>
      ) : (
        <>
          <div className="budget-amounts">
            <span className="spent-amount">
              Spent: {formatCurrency(spentAmount)}
            </span>
            <span className="budget-amount">
              Budget: {formatCurrency(budgetAmount)}
            </span>
          </div>

          <div className="remaining-amount">
            <span className={remaining >= 0 ? 'text-success' : 'text-danger'}>
              {remaining >= 0 ? 'Remaining: ' : 'Overspent: '}
              {formatCurrency(Math.abs(remaining))}
            </span>
          </div>

          <div className="progress-container">
            <div 
              className={`progress-bar ${
                progress >= 90 ? 'danger' :
                progress >= 75 ? 'warning' : 'success'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}

BudgetCard.propTypes = {
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  budgetAmount: PropTypes.number.isRequired,
  spentAmount: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default BudgetCard; 