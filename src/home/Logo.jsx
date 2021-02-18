import React from "react";
import { Jumbotron, Container } from "reactstrap";

const Logo = (props) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Tapatio Car Sales</h1>
          <h5 className="lead">
            Our inventory of vehicles. Cash only.
          </h5>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Logo;
