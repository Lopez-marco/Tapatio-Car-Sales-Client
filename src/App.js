import React, { useEffect, useState } from "react";
import NavbarVeh from "./home/NavbarVeh";
import Logo from "./home/Logo";
import Navigation from "./home/Navigation";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./home/Footer";
import Gototop from "./home/Gototop";

function App(props) {
  const [setUpdateActive] = useState(false);
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const updateOn = (props) => {
    setUpdateActive(true);
  };

  return (
    <div className="App">
      <NavbarVeh
        updateToken={updateToken}
        clickLogout={clearToken}
        updateOn={updateOn}
      />
      <Logo />
            <Router>
              <Navigation updateToken={updateToken} updateOn={updateOn} />
            </Router>
      <Footer />
      <Gototop />
    </div>
  );
}

export default App;
