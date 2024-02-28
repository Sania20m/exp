// Assuming you have a Redux store in store/index.js
// store/index.js

import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expensesReducer';

const rootReducer = combineReducers({
  expenses: expensesReducer,
  // Add other reducers if any
});

const store = createStore(rootReducer);

export default store;
