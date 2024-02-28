// Assuming you have a Redux store in store/index.js
// store/index.js

import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expensesReducer';
import premiumReducer from '../reducers/premiumReducer';
const rootReducer = combineReducers({
  expenses: expensesReducer,
  premium:premiumReducer,
  // Add other reducers if any
});

const store = createStore(rootReducer);

export default store;
