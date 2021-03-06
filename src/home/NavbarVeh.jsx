import React, { useState, useEffect } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import Auth from "../auth/Auth";
import LogoutButton from "./LogoutButton";

const NavbarVeh = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  console.log(sessionToken);

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const protectedButton = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <LogoutButton clickLogout={clearToken} />
    ) : (
      <Auth updateToken={props.updateToken} />
    );
  };

  return (
    <Navbar className="navco" light expand="md">
      <NavbarBrand className="logoname" href="/" style={{color: "white"}}>
        TapatioCars
      </NavbarBrand>
      <NavbarToggler onClick={toggle} className="mr-2" />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar></Nav>
        {protectedButton()}
      </Collapse>
    </Navbar>
  );
};

export default NavbarVeh;
