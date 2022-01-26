//an die neue url noch anpassen: link/keys id stimmt dann nicht mehr
import React from "react";
import { Link } from "react-router-dom";
import List from "../screen/List";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "../App.css";
import { Details } from "@mui/icons-material";

const ArtObject = (props) => {
  //console.log(`props`, props);
  const { artobject } = props;

  return (
    //1st idea: display cards with titles etc. no grid
    /* <div className="cardgrid">
      <Container>
        <Row>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={artobject.primaryimageurl} />
            <Card.Body>
              <Card.Title>{artobject.title}</Card.Title>
              <Card.Text>
                {artobject.technique}
                {artobject.century}
                {artobject.culture}
              </Card.Text>
              <Button variant="primary">More information</Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div> */
    // grid not working:

    <Container>
      <div>
        <Link to={`/details/${artobject.id}`}>
          <img className="imageitem" src={artobject.baseimageurl} alt="" />
        </Link>
      </div>
    </Container>
  );
};

export default ArtObject;
