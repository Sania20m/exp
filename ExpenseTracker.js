// ExpenseTracker.js
import React, { useState } from 'react';

const ExpenseTracker = ({ isAuthenticated }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = () => {
    // Validate input fields
    if (!amount || !description || !category) {
      alert('All fields are mandatory');
      return;
    }

    // Create a new expense object
    const newExpense = {
      id: expenses.length + 1,
      amount: parseFloat(amount),
      description,
      category,
    };

    // Update the expenses array
    setExpenses([...expenses, newExpense]);

    // Clear input fields
    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    isAuthenticated && (
      <div className="mt-5">
        <h2>Daily Expenses Tracker</h2>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount:
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <select
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleAddExpense}>
          Add Expense
        </button>

        <div className="mt-3">
          <h3>Expenses List</h3>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                <strong>Amount:</strong> ${expense.amount} | <strong>Description:</strong>{' '}
                {expense.description} | <strong>Category:</strong> {expense.category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default ExpenseTracker;
