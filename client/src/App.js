import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import ForgotPasssword from "./pages/auth/ForgetPassword";
import PrivateRoute from "./component/Routes/Private";
import AdminRoute from "./component/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import AllUser from "./pages/Admin/AllUser";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import AllProducts from "./pages/Admin/AllProducts";
import UpdateProduct from "./pages/Admin/updateProduct";
import SearhProduct from "./pages/SearhProduct";
import SingleProduct from "./pages/SingleProduct";
import CategoryProducts from "./pages/CategoryProducts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<SearhProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singleProduct/:slug" element={<SingleProduct />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/Orders" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/Product/:slug" element={<UpdateProduct />} />

          <Route path="admin/allproducts" element={<AllProducts />} />
          <Route path="admin/users" element={<AllUser />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
