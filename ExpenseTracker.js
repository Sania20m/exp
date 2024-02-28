// // ExpenseTracker.js
// import React, { useState, useEffect } from 'react';

// const ExpenseTracker = ({ isAuthenticated }) => {
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentEditingId, setCurrentEditingId] = useState(null);

//   const handleAddExpense = async () => {
//     // Validate input fields
//     if (!amount || !description || !category) {
//       alert('All fields are mandatory');
//       return;
//     }

//     // Create a new expense object
//     const newExpense = {
//       amount: parseFloat(amount),
//       description,
//       category,
//     };

//     try {
//       setLoading(true);
//       // Save the new expense to the Firebase Realtime Database
//       const response = await fetch('https://exp1-aff40-default-rtdb.firebaseio.com/expenses.json', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newExpense),
//       });

//       if (response.ok) {
//         console.log('Expense added successfully');
//         // Refresh the expenses list after adding a new expense
//         fetchExpenses();
//       } else {
//         console.error('Failed to add expense');
//       }
//     } catch (error) {
//       console.error('Error adding expense', error);
//     } finally {
//       setLoading(false);
//     }

//     // Clear input fields
//     setAmount('');
//     setDescription('');
//     setCategory('');
//   };

//   const fetchExpenses = async () => {
//     try {
//       setLoading(true);
//       // Fetch expenses from the Firebase Realtime Database
//       const response = await fetch('https://exp1-aff40-default-rtdb.firebaseio.com/expenses.json');
//       const data = await response.json();

//       if (data) {
//         const fetchedExpenses = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         setExpenses(fetchedExpenses);
//       } else {
//         setExpenses([]);
//       }
//     } catch (error) {
//       console.error('Error fetching expenses', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteExpense = async (expenseId) => {
//     try {
//       setLoading(true);
//       // Make DELETE request to remove the expense from the Firebase Realtime Database
//       const response = await fetch(`https://exp1-aff40-default-rtdb.firebaseio.com/expenses/${expenseId}.json`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         console.log('Expense successfully deleted');
//         // Remove the deleted expense from the UI
//         setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
//       } else {
//         console.error('Failed to delete expense');
//       }
//     } catch (error) {
//       console.error('Error deleting expense', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditExpense = (expense) => {
//     // Set the current expense details to the input fields for editing
//     setAmount(expense.amount.toString());
//     setDescription(expense.description);
//     setCategory(expense.category);
//     // You might want to store the expense ID for updating later
//     // For simplicity, let's use a state variable for this
//     setCurrentEditingId(expense.id);
//   };

//   const handleUpdateExpense = async () => {
//     if (!amount || !description || !category || !currentEditingId) {
//       alert('All fields are mandatory');
//       return;
//     }

//     const updatedExpense = {
//       id: currentEditingId,
//       amount: parseFloat(amount),
//       description,
//       category,
//     };

//     try {
//       setLoading(true);
//       // Make PUT request to update the expense in the Firebase Realtime Database
//       const response = await fetch(`https://exp1-aff40-default-rtdb.firebaseio.com/expenses/${currentEditingId}.json`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedExpense),
//       });

//       if (response.ok) {
//         console.log('Expense updated successfully');
//         // Refresh the expenses list after updating an expense
//         fetchExpenses();
//         // Clear input fields and editing state
//         setAmount('');
//         setDescription('');
//         setCategory('');
//         setCurrentEditingId(null);
//       } else {
//         console.error('Failed to update expense');
//       }
//     } catch (error) {
//       console.error('Error updating expense', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchExpenses();
//     }
//   }, [isAuthenticated]);

//   return (
//     isAuthenticated && (
//       <div className="mt-5">
//         <h2>Daily Expenses Tracker</h2>
//         <div className="mb-3">
//           <label htmlFor="amount" className="form-label">
//             Amount:
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             id="amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">
//             Description:
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="category" className="form-label">
//             Category:
//           </label>
//           <select
//             className="form-control"
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Select Category</option>
//             <option value="Food">Food</option>
//             <option value="Petrol">Petrol</option>
//             <option value="Salary">Salary</option>
//             {/* Add more categories as needed */}
//           </select>
//         </div>
//         {currentEditingId ? (
//           <button className="btn btn-primary" onClick={handleUpdateExpense} disabled={loading}>
//             {loading ? 'Updating Expense...' : 'Submit'}
//           </button>
//         ) : (
//           <button className="btn btn-primary" onClick={handleAddExpense} disabled={loading}>
//             {loading ? 'Adding Expense...' : 'Add Expense'}
//           </button>
//         )}

//         <div className="mt-3">
//           <h3>Expenses List</h3>
//           {expenses.length > 0 ? (
//             <ul>
//               {expenses.map((expense, index) => (
//                 <li key={`${expense.id}-${index}`}>
//                   <strong>Amount:</strong> ${expense.amount} | <strong>Description:</strong>{' '}
//                   {expense.description} | <strong>Category:</strong> {expense.category}
//                   <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
//                   <button onClick={() => handleEditExpense(expense)}>Edit</button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No expenses found.</p>
//           )}
//         </div>
//       </div>
//     )
//   );
// };

// export default ExpenseTracker;


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


const ExpenseTracker = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const isPremiumActivated = useSelector((state) => state.premium.isPremiumActivated);

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);

  const handleAddExpense = async () => {
    if (!amount || !description || !category) {
      alert('All fields are mandatory');
      return;
    }

    const newExpense = {
      amount: parseFloat(amount),
      description,
      category,
    };

    try {
      setLoading(true);
      const response = await fetch('https://exp1-aff40-default-rtdb.firebaseio.com/expenses.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (response.ok) {
        console.log('Expense added successfully');
        // Dispatch action to add expense
        dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
      } else {
        console.error('Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense', error);
    } finally {
      setLoading(false);
      setAmount('');
      setDescription('');
      setCategory('');
    }
    // checkPremiumActivation();
  };

  const checkPremiumActivation = () => {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    if (totalExpenses > 10000 && !isPremiumActivated) {
      dispatch({ type: 'ACTIVATE_PREMIUMS' });
    }
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://exp1-aff40-default-rtdb.firebaseio.com/expenses.json');
      const data = await response.json();

      if (data) {
        const fetchedExpenses = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log(fetchedExpenses);
        // Dispatch action to update expenses
        dispatch({ type: 'SET_EXPENSES', payload: fetchedExpenses });
      } else {
        // Dispatch action to set expenses to an empty array
        dispatch({ type: 'SET_EXPENSES', payload: [] });
      }
    } catch (error) {
      console.error('Error fetching expenses', error);
    } finally {
      setLoading(false);
    }
  };


  // ... rest of the component
  const handleDeleteExpense = async (expenseId) => {
    try {
      setLoading(true);
          // Make DELETE request to remove the expense from the Firebase Realtime Database
          const response = await fetch(`https://exp1-aff40-default-rtdb.firebaseio.com/expenses/${expenseId}.json`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
              console.log('Expense successfully deleted');
              // Remove the deleted expense from the UI
              // setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
              dispatch({type:'DELETE_EXPENSE',payload: expenseId})
            } else {
                console.error('Failed to delete expense');
              }
            } catch (error) {
          console.error('Error deleting expense', error);
        } finally {
          setLoading(false);
        }
      };
      
      const handleEditExpense = (expense) => {
        // Set the current expense details to the input fields for editing
        setAmount(expense.amount.toString());
        setDescription(expense.description);
        setCategory(expense.category);
        // You might want to store the expense ID for updating later
        // For simplicity, let's use a state variable for this
        setCurrentEditingId(expense.id);
      };
      
      const handleUpdateExpense = async () => {
        if (!amount || !description || !category || !currentEditingId) {
          alert('All fields are mandatory');
          return;
        }
        
        const updatedExpense = {
          id: currentEditingId,
          amount: parseFloat(amount),
          description,
          category,
        };
    
        try {
          setLoading(true);
          // Make PUT request to update the expense in the Firebase Realtime Database
          const response = await fetch(`https://exp1-aff40-default-rtdb.firebaseio.com/expenses/${currentEditingId}.json`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedExpense),
          });
          
          if (response.ok) {
            console.log('Expense updated successfully');
            dispatch({ type: 'EDIT_EXPENSE', payload: { id: currentEditingId, editedExpense: updatedExpense } });
            // Refresh the expenses list after updating an expense
            fetchExpenses();
            // Clear input fields and edit?ing state
            setAmount('');
            setDescription('');
            setCategory('');
            setCurrentEditingId(null);
          } else {
            console.error('Failed to update expense');
          }
        } catch (error) {
          console.error('Error updating expense', error);
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {
        if (isAuthenticated) {
          fetchExpenses();
        }
      }, [isAuthenticated,dispatch]);
      useEffect(() => {
        checkPremiumActivation();
      }, [expenses, dispatch, isPremiumActivated]);
    
      
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
            {currentEditingId ? (
              <button className="btn btn-primary" onClick={handleUpdateExpense} disabled={loading}>
                {loading ? 'Updating Expense...' : 'Submit'}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleAddExpense} disabled={loading}>
                {loading ? 'Adding Expense...' : 'Add Expense'}
              </button>
            )}
    
    <div className="mt-3">
          {expenses.length > 0 && (
            <div>
              <h3>Expenses List</h3>
              <ul>
                {expenses.map((expense, index) => (
                  <li key={`${expense.id}-${index}`}>
                    <strong>Amount:</strong> ${expense.amount} | <strong>Description:</strong> {expense.description} |{' '}
                    <strong>Category:</strong> {expense.category}
                    <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                    <button onClick={() => handleEditExpense(expense)}>Edit</button>
                  </li>
                ))}
              </ul>
              <p>Total Expenses: ${expenses.reduce((total, expense) => total + expense.amount, 0)}</p>
              {expenses.reduce((total, expense) => total + expense.amount, 0) > 10000 && isPremiumActivated && (
                <button className="btn btn-primary">Activate Premium</button>
              )}
            </div>
          )}

          {expenses.length === 0 && <p>No expenses found.</p>}
        </div>
      </div>
    )

  );
};

export default ExpenseTracker;
