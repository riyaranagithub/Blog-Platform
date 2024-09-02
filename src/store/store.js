import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";

const store=configureStore({
    reducer:{
       auth: auth
    }
})
export default store;