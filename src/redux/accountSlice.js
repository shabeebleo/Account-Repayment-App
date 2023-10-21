import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
    totalAmount:0
  },
  reducers: {
    addAccount: (state, action) => {

     state.accounts.push(action.payload );
      
    //   count: this.state.count++,
    },
    addTotalAmount:(state, action)=>{
        state.totalAmount=(action.payload );
    }
  },
});

export const { addAccount ,addTotalAmount} = accountSlice.actions;

export default accountSlice.reducer;
