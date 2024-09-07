import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import authService from "./appwrite/auth";
import { login, logOut } from "./store/authSlice";
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("App mounted"); // Check if useEffect runs
    const fetchUser = async () => {
      try {
        console.log("Fetching user..."); // Check if fetchUser is called
        const userData = await authService.getCurrentUser();
        console.log("User Data:", userData); // Check if userData is fetched
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logOut());
        }
      } catch (error) {
        console.error("Error fetching user:", error); // Log any errors
      } finally {
        setLoading(false);
        console.log("Loading state set to false"); // Confirm that loading is set
      }
    };

    fetchUser();
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col ">
      {/* Header at the top */}
      <header className="bg-gray-500">
        <Header />
      </header>

      {/* Main content in the middle */}
      <main className="flex-grow bg-gray-100">
        <Outlet />
      </main>

      {/* Footer at the bottom */}
      <footer className="bg-gray-500">
        <Footer />
      </footer>
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center bg-gray-600">
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
