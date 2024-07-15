import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from './screens/CartScreen';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import store from "./store";
import {Provider} from "react-redux"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      {/* Public Routes */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      
      {/* Private Routes */}
      <Route path='' element={<PrivateRoute/>}>
      <Route path='/shipping' element={<ShippingScreen />} />
      </Route>
      
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);

