import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/home/HomePage";
import { RegisterPage } from "./Pages/Register/RegisterPage";
import { LoginPage } from "./Pages/Login/LoginPage";
import { SearchPage } from "./Pages/Search/SearchPage";
import { UserPage } from "./Pages/User/UserPage";
import ProductDetail from "./Pages/product-detail";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import CategoryPage from "./Pages/category/CategoryPage";
import { ShoppingCart } from "./Pages/shoppingCart/ShoppingCart";
import Checkout from "./Pages/checkout";
import OrderStatusPage from "./Pages/order-status/OrderStatusPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/product-detail/:productId" element={<ProductDetail />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-status" element={<OrderStatusPage />} />
        <Route path="/order-status/:id" element={<OrderStatusPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
