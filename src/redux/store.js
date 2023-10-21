import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';

const store = configureStore({
  reducer: {
    account: accountReducer,
    
    // Add other slices if you have more
  },
});

export default store;