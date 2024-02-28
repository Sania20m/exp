// src/reducers/authReducer.js
const initialState = {
    isAuthenticated: false,
    token: null,
    userId: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.token,
          userId: action.payload.userId,
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;
  