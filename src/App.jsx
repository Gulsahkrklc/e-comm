import { Switch, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/actions/userActions";
import ProductDetailPage from "./pages/ProductDetailPage";
import { verifyToken } from "./utils/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const userData = await verifyToken();
      if (userData) {
        dispatch(setUser(userData));
      }
    };

    initializeAuth();
  }, [dispatch]);

  return (
    <div>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route 
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" 
          component={ProductDetailPage} 
        />
      </Switch>
    </div>
  );
}

export default App;
