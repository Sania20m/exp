// ExpenseTracker.js
import React, { useState,useEffect } from 'react';

const ExpenseTracker = ({ isAuthenticated }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddExpense =async () => {
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
    // setExpenses([...expenses, newExpense]);
    try {
        setLoading(true);
        // Save the new expense to the Firebase Realtime Database
        const response = await fetch('https://exp1-aff40-default-rtdb.firebaseio.com/expenses.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newExpense),
        });
  
        if (response.ok) {
          console.log('Expense added successfully');
          // Refresh the expenses list after adding a new expense
          fetchExpenses();
        } else {
          console.error('Failed to add expense');
        }
      } catch (error) {
        console.error('Error adding expense', error);
      } finally {
        setLoading(false);
      }

    // Clear input fields
    setAmount('');
    setDescription('');
    setCategory('');
  };
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      // Fetch expenses from the Firebase Realtime Database
      const response = await fetch('https://exp1-aff40-default-rtdb.firebaseio.com/expenses.json');
      const data = await response.json();

      if (data) {
        const fetchedExpenses = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setExpenses(fetchedExpenses);
      } else {
        setExpenses([]);
      }
    } catch (error) {
      console.error('Error fetching expenses', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchExpenses();
    }
  }, [isAuthenticated]);

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
        {/* <button className="btn btn-primary" onClick={handleAddExpense}>
          Add Expense
        </button> */}
<button className="btn btn-primary" onClick={handleAddExpense} disabled={loading}>
          {loading ? 'Adding Expense...' : 'Add Expense'}
        </button>

        <div className="mt-3">
          <h3>Expenses List</h3>
          {expenses.length > 0 ? (
            <ul>
              {expenses.map((expense) => (
                <li key={expense.id}>
                  <strong>Amount:</strong> ${expense.amount} | <strong>Description:</strong>{' '}
                  {expense.description} | <strong>Category:</strong> {expense.category}
                </li>
              ))}
            </ul>
          ) : (
            <p>No expenses found.</p>
          )}
        </div>
      </div>
    )
  );
};

export default ExpenseTracker;