import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useAuth } from "../../Context/auth";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5020/api/auth/admin-auth",
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        if (res.data?.ok && res.data.role === "Admin") {
          setOk(true);
          navigate("/dashboard/admin"); // Redirect non-admins to the homepage
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Admin Auth Check Error:", error.message);
        setOk(false);
        navigate("/"); // Redirect in case of an error
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false);
      navigate("/login"); // Redirect to login if no token is present
    }
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : <Spinner />;
}
