//to track if user is authenticated or not
 
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}
const auth=createSlice({
    name:"auth",
    initialState,
    reducers:{
      login:(state,action)=>{
        state.status=true,
        state.userData=action.payload.userData
      },
      logOut:(state)=>{
        state.status=false,
        state.userData=null
      }
    }
})
export const {login,logOut}=auth.actions
export default auth.reducer

// login: An asynchronous function that handles the login process.
// authService.login: Attempts to log in with the provided data. If successful, it returns a session object.
// getCurrentUser: Retrieves the currently logged-in user's data after a successful login.
// dispatch(authlogin(userData)): Dispatches an action to store the user data in the Redux store.
// navigate("/"): Redirects the user to the home page after a successful login.
// setError(error): If the login fails, the error is caught and set in the error state.