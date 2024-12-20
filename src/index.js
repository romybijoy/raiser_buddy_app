import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
const App = React.lazy(() => import('./App'));

root.render(
  // <React.StrictMode>
  <BrowserRouter future={{ v7_startTransition: true }}>
    <Provider store={store}>
    <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </Provider>
  </BrowserRouter>

  // </React.StrictMode>
);
