import React from "react";
import Carousel from 'react-bootstrap/Carousel'

const VehicleCarousle = (props) => {

  console.log(props.photo[0])

  const imageloop = props.photo.map((item) =>{
    return  (
      <Carousel.Item>
      <img
        className="d-block w-100"
        src={item}
        alt="First slide"
      />
    </Carousel.Item>
    )
    });
  return (
  <Carousel>
    {imageloop}
</Carousel>
  );
};

export default VehicleCarousle;
