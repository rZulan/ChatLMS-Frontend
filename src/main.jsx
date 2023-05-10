import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./containers/home-page";
import LoginPage from "./containers/login-page";
import SignupPage from "./containers/signup-page";
import { Auth0Provider } from "@auth0/auth0-react";

const DOMAIN = import.meta.env.VITE_REACT_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_REACT_CLIENTID;

const router = createBrowserRouter([
  {
    path: "/:id",
    element: <HomePage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
