// src/store.js
import { createStore, combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import expensesReducer from '../reducers/expensesReducer';
import premiumReducer from '../reducers/premiumReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
  premium:premiumReducer,
});

const store = createStore(rootReducer);

export default store;
