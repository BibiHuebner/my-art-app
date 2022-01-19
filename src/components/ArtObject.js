//one item on the list-screen: Picture + text
import React from "react";
import List from "../screen/List";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const ArtObject = (props) => {
  //console.log(`props`, props);
  const { artobject } = props;

  return (
    <div>
      <img src={artobject.primaryimageurl} alt={artobject.url} />
      <p>
        {artobject.title}
        {artobject.technique}
        {artobject.century}
        {artobject.culture}
      </p>
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
    </div>
  );
};

export default ArtObject;

//p tag in der Liste ersetzen
//props Liste
