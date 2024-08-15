import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartslice'
import apicallsReducer from './ApicallsSlice'
import apiDataByIdReducer from './ApicallsEachProducts'

const store=configureStore({
    reducer:{
      cart:cartReducer,
      apiData:apicallsReducer,
      apiDataById:apiDataByIdReducer
    }
})

export default store