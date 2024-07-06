import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createContext, useState } from "react";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";

export const AppContext = createContext();

function App() {
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Load user data from local storage or session storage on initial render
    const storedUser = localStorage?.getItem("user");
    if (storedUser) {
      setUser(JSON?.parse(storedUser));
    }
  }, []);

  let value = { reload, setReload, user, setUser };

  return (
    <Router>
      <div className="row">
        <AppContext.Provider value={value}>
          <AppRoutes />
        </AppContext.Provider>
      </div>
    </Router>
  );
}

export default App;
