import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useAuth } from "../../Context/auth";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // `setAuth` is not needed in this component

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/auth/admin-auth", {
          headers: {
            Authorization: `Bearer ${auth?.token}`, // Pass token securely in the Authorization header
          },
        });

        if (res.data?.ok) {
          setOk(true); // Set `ok` to true if admin-auth returns successful response
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error(
          "Error during admin authentication check:",
          error.message
        );
        setOk(false); // Handle API or network errors
      }
    };

    if (auth?.token) {
      authCheck(); // Call `authCheck` only if token exists
    } else {
      setOk(false); // No token, set `ok` to false
    }
  }, [auth?.token]); // Dependency array ensures rechecking when token changes

  return ok ? <Outlet /> : <Spinner />; // Render child routes or a loading spinner
}
