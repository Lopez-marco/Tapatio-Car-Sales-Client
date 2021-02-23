import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "reactstrap";
import Vehiclesmain from "./Vehiclesmain";

const MyVehicle = (props) => {
  const [vehicle, setVehicle] = useState([]);

  const mineVehicle = () => {
    fetch(`https://tapatio-server.herokuapp.com/vehicle/mine`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        new setVehicle(results);
        console.log(results);
      });
  };

  function displayMne() {
    return vehicle.map((result, index) => (
      <Vehiclesmain token={sessionToken} key={index} vehicle={result} />
    ));
  }

  const [sessionToken, setSessionToken] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    mineVehicle();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader style={{ backgroundColor: "#4A4748" }}>
          <h5 style={{ textAlign: "center" }}>My Added Vehicle's</h5>
        </CardHeader>
        <br />
        {displayMne()}
      </Card>
    </div>
  );
};

export default MyVehicle;
