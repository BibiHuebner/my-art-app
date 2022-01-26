//display details for 1 clicked element
//fetch with more details than 1st fetch
import React from "react";
import { useEffect, useState } from "react";
import List from "./List";
import "../App.css";
import { useParams } from "react-router-dom";
import ArtObject from "../components/ArtObject";

//gewünscht ist eine card:
/*<div className="cardgrid">
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
</div>;*/

//zweiten fetch starten //templatestrings wiederholen

//customhookfetch pedro: überlegen, wie hier verwenden, fetch auslagern
const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({ id });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const detailUrl = () => {
    fetch(
      `https://api.harvardartmuseums.org/object/${id}?apikey=58de05bf-ee95-4975-9602-dd1902a5464e`
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(`data`, data);
        setDetails(data);

        setLoading(false);
      })
      .catch((error) => console.log(`error`, error));
    setError(error);
  };
  //muss ich hier mappen?
  //naming: präzises naming: im fetch heißt es hier nicht mehr list sondern es geht um ein detailitem
  //fetch , console log :kommt der fetch an?dann erst return schreiben
  useEffect(() => {
    detailUrl();
  }, []);
  console.log(`details`, details);
  return (
    <div className="detailscard">
      <h1>Detailansicht {details.id}</h1>
      <img
        className="imageitem"
        src={details.baseimageurl}
        alt={details.alttext}
      />
    </div>
  );
};
export default Details;
