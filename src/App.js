import React, { createContext, useMemo, useState } from "react";
import Header from "./components/Header";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload/";
import Home from "./pages/Home";
import { authentication } from "./firebase/config";

export const AuthenticationContext = createContext({ user: {}, setUser: () => {} });

function App() {
  const [user, setUser] = useState({});

  const value = useMemo(() => ({ user, setUser }), [user]);

  onAuthStateChanged(authentication, (firebaseUser) => {
    if (firebaseUser) {
      setUser(firebaseUser);
    } else {
      setUser(null);
    }
  });

  return (
    <AuthenticationContext.Provider value={value}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthenticationContext.Provider>
  );
}

export default App;
