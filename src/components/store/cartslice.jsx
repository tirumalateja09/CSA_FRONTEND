import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] 
  },
  reducers: {
    addItems: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        existingItem.count += 1;
        console.log(state.items)
      } else {
        state.items.push({ product: action.payload, count: 1 });
        console.log(state.items)
      }
    },
    removeItems: (state, action) => {
      const itemIdToRemove = action.payload.id;

      const item = state.items.find(
        (item) => item.product.id === itemIdToRemove
      );

      if (item) {
        if (item.count > 1) {
         
          item.count -= 1;
        } else {
          
          state.items = state.items.filter(
            (item) => item.product.id !== itemIdToRemove
          );
        }
      }
    },
    paidItemClear:(state,action)=>{
        state.items=state.items.filter((item)=>{
         return item.product.id!==action.payload.id;
        })
    },
    clearCart: (state) => {
      state.items.length=0;
    },
    removeProduct:(state,action)=>{
        state.items=state.items.filter((item)=>{
    return item.product.id!==action.payload.id;  
        })
    }
  }
});

export const { addItems, removeItems, clearCart,  paidItemClear ,removeProduct} = cartSlice.actions;
export default cartSlice.reducer;
