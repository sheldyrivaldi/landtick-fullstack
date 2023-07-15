import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import { UserProvider } from "./context/Contex";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
