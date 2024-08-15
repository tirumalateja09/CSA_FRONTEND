import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// const API = "https://dummyjson.com/products";
export const fetchedData=createAsyncThunk('productFetch', async()=>{
   try{
    const res= await axios.get("https://dummyjson.com/products");
    return res.data;
   }
   catch(error){
       throw error,
      console.log(error)
   }
})
const apiCallsSlice= createSlice({
    name: 'apiCalls',
    initialState: {
        products:[],
        status:"",
        error:false
    },
    reducers:{
       fetchedUserData:(state,action)=>{

       }
    },
    // 3 cases pending,success,failure
    extraReducers:(builder)=>{
           builder.addCase(fetchedData.pending,  (state,action)=>{
                state.status="loading"
           })
           .addCase(fetchedData.fulfilled,(state,action)=>{
              state.status="complete",
              state.products=action.payload.products

           })
           .addCase(fetchedData.rejected,(state,action)=>{
                  state.status="failed",
                  state.error=action.error.message,
                  state.products=[]
           })
    }

})

export default apiCallsSlice.reducer;