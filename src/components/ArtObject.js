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
    // <Container>
    <div>
      <Link to={`/details/${artobject.id}`}>
        <img className="imageitem" src={artobject.primaryimageurl} alt="" />
      </Link>
    </div>
    // </Container>
  );
};

export default ArtObject;
