import React, { useState, useEffect } from "react";
import Create from "./Vehiclepost/Create";
import { Route, Link, Switch } from "react-router-dom";
import ParentVehicle from "./Vehiclemain/ParentVehicle";
import MyVehicle from "./Vehiclemain/MyVehicle";
import UserwithToken from "./UserwithToken";
import AboutUs from "./AboutUs";

import {
  Nav,
  NavbarText,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  Row,
  Col,
  Container,
} from "reactstrap";
import ContactUs from "./ContactUs";

const Navigation = (props) => {
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

  const usernavigation = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <UserwithToken token={props.token} />
    ) : (
      ""
    );
  };

  useState(() => {
    usernavigation();
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Navbar  light expand="md" className="navbarColor">
              <NavbarBrand href="/">Home</NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink>
                      <Link to="/inventory" style={{ textDecoration: "none", color: "black" }}>
                        Invetory
                      </Link>
                    </NavLink>
                  </NavItem>
            {usernavigation()}
                </Nav>
                {/* <NavbarText>Simple Text</NavbarText> */}
              </Collapse>
            </Navbar>
          </Col>
        </Row>
        <br />
        <Row xs="4">
          <Col xs="12">
            <Switch>
              <Route exact path="/inventory">
                <ParentVehicle updateToken={props.updateToken} />
              </Route>
              <Route exact path="/myvehicle">
                <MyVehicle token={props.token} />
              </Route>
              <Route exact path="/Create">
                <Create updatetoken={props.updateToken} />
              </Route>
              <Route exact path="/">
                <ParentVehicle token={props.token} />
              </Route>
              <Route exact path="/about-us">
                <AboutUs />
              </Route>
              <Route exact path="/contact-us">
                <ContactUs />
              </Route>
            </Switch>
          </Col>
        </Row>
        <br />
      </Container>
    </div>
  );
};

export default Navigation;
