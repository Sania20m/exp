// reducers/premiumReducer.js

const initialState = {
    isPremiumActivated: false,
  };
  
  const premiumReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ACTIVATE_PREMIUMS':
        return {
          ...state,
          isPremiumActivated: true,
        };
      default:
        return state;
    }
  };
  
  export default premiumReducer;
  