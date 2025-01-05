import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useAuth } from "../../Context/auth";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth(); // Destructure `auth` directly as `setAuth` isn't used here.

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

        if (res.data?.ok) {
          setOk(true); // Set `ok` to true if the user is authenticated
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error during authentication check:", error.message);
        setOk(false); // Set `ok` to false in case of an error
      }
    };

    if (auth?.token) {
      authCheck(); // Call `authCheck` only if the token is available
    } else {
      setOk(false); // If no token, set `ok` to false
    }
  }, [auth?.token]); // Re-run the effect only if `auth?.token` changes

  return ok ? <Outlet /> : <Spinner />; // Render `Outlet` if authenticated, otherwise show `Spinner`
}
