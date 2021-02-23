import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ReactHtmlParser from "react-html-parser";
import VehicleModalEdit from "./VehicleModalEdit";
import VehicleCarousle from "./VehicleCarousle"

const Vehiclemodel = (props) => {
  const {
    year,
    make,
    model,
    description,
    price,
    photo,
    color,
    millage,
    vin,
  } = props.vehicle;

  function refreshPage() {
    window.location.reload(true);
  }

  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const Delete = () => {
    fetch(`https://tapatio-server.herokuapp.com/vehicle/delveh/${props.vehicle.id}`, {
      method: "Delete",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    }).then(() => {
      refreshPage();
    });
  };

  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  function addDefaultSrc(ev) {
    ev.target.src =
      "https://media3.giphy.com/media/3oFzm3j6QQ4ZVGsdAQ/giphy.gif";
  }

  const protectedButton = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <VehicleModalEdit vehicle={props.vehicle} />
    ) : (
      ""
    );
  };
  const protectedButton2 = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <Button
            color="danger"
            onClick={() => {
              Delete();
            }}
          >
            Delete
          </Button>
    ) : (
      ""
    );
  };

  return (
    <>
      <Button color="danger" onClick={toggle} color="primary">
        {buttonLabel}See Full Description
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          {year} {make} {model}
        </ModalHeader>
        <VehicleCarousle photo={props.vehicle.photo} />
        <ModalBody>
          <b>Year: </b>
          {year} <br /> <b>Make: </b> {make} <br />
          <b>Model: </b> {model} <br />
          <b>Color:</b> {color} <br />
          <b>Price: </b>
          {price}
          <br />
          <b>Millage: </b>
          {millage} <br />
          <b>Vin: </b> {vin} <br />
          <b>Description: </b>
          {ReactHtmlParser(description)}
          <br />
        </ModalBody>

        <ModalFooter>
          {protectedButton()}
          {protectedButton2()}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Vehiclemodel;
