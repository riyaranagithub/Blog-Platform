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
    console.log("App mounted");
    const fetchUser = async () => {
      try {
        console.log("Fetching user...");
        const userData = await authService.getCurrentUser();
        console.log("User Data:", userData);
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logOut());
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
        console.log("Loading state set to false");
      }
    };

    fetchUser();
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-col">
      {/* Header at the top */}
      <Header />

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
