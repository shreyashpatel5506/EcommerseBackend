import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useAuth } from "../../Context/auth";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5020/api/auth/user-auth",
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`, // Pass the token in the Authorization header
            },
          }
        );

        // If the user is authenticated, check their role
        if (res.data?.ok) {
          // Proceed to the user dashboard if the user is a regular user
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error during authentication check:", error.message);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck(); // Call `authCheck` only if the token is available
    } else {
      setOk(false);
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />; // Render `Outlet` if authenticated, otherwise show `Spinner`
}
