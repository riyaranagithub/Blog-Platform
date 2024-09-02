import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logOut } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";


export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

 
  useEffect(() => {
    console.log("hello")
    const fetchUser = async () => {
     
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logOut());
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []);
  

  

  return !loading ? (
    <main className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </main>
  ) : (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-600">
      Loading...
    </div>
  );
}


// Summary:
// State Management:

// The App component uses the useState hook to manage a loading state, which starts as true.
// The useDispatch hook is used to get the Redux dispatch function for dispatching actions.
// Effect Hook:

// The useEffect hook is used to run a side effect when the component mounts.
// Inside the effect, the dataService.getCurrentUser() function is called to check if a user is currently logged in.
// If user data is returned, the login action is dispatched with the user data.
// If no user data is found, the logOut action is dispatched.
// Errors are caught and logged to the console.
// Finally, the loading state is set to false using finally, ensuring it runs regardless of the success or failure of the authentication check.
// Conditional Rendering:

// The component conditionally renders based on the loading state.
// If loading is false, the Header and Footer components are rendered inside a div.
// If loading is true, nothing is rendered (null).
// Redux Actions:

// The login and logOut actions are imported from authSlice and are used to update the Redux store based on the authentication status.