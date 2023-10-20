import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import {UserProvider} from "./Context/User Context/UserContext.jsx";
import client from "./Config/ApolloClientConfig.js";
import {ApolloProvider} from "@apollo/client";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
          <ApolloProvider client={client}>
              <UserProvider>
                  <App />
              </UserProvider>
          </ApolloProvider>

      </Router>
  </React.StrictMode>,
)
