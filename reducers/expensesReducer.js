// src/reducers/expensesReducer.js
const initialState = {
    expenses: [],
  };
  
  const expensesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_EXPENSE':
        return {
          ...state,
          expenses: [...state.expenses, action.payload],
        };
      case 'SET_EXPENSES':
        return {
          ...state,
          expenses: action.payload,
        };
        case 'DELETE_EXPENSES':
            return {
              ...state,
              expenses: state.expenses.filter((expense) => expense.id !== action.payload),
            };
            case 'EDIT_EXPENSE':
                return {
                  ...state,
                  expenses: state.expenses.map(expense =>
                    expense.id === action.payload.id ? action.payload.editedExpense : expense
                  ),
                };
      default:
        return state;
    }
  };
  
  export default expensesReducer;
  