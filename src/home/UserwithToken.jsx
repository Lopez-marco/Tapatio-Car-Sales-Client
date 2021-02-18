import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroupItem, NavItem, NavLink } from "reactstrap";

const UserwithToken = (props) => {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
                  <NavItem>
                    <NavLink>
                  <Link to="/myvehicle" style={{ textDecoration: "none", color: "black" }}>
                    My Vehicle's
                  </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>
                  <Link to="/create" style={{ textDecoration: "none", color: "black"}}>
                    Add a Vehicle
                  </Link>
                      
                    </NavLink>
                  </NavItem>
    </>
  );
};

export default UserwithToken;
