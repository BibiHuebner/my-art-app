//display details for 1 clicked element
//fetch with more details than 1st fetch
import React from "react";
import { useEffect, useState } from "react";
import List from "./List";
import "../App.css";
import { useParams } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

//context ? storeFavorite?
const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({ id });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const detailUrl = () => {
    fetch(
      `https://api.harvardartmuseums.org/object/${id}?apikey=58de05bf-ee95-4975-9602-dd1902a5464e`
    ) //backticks!!!
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

  //naming: präzises naming: im fetch heißt es hier nicht mehr list sondern es geht um ein detailitem
  //fetch , console log :kommt der fetch an?dann erst return schreiben
  useEffect(() => {
    detailUrl();
  }, []);
  console.log(`details`, details);
  return (
    <div className="detailscard">
      <Container className="detailscard">
        <Row classname="detailscard">
          <Card classname="detailscard" className="text-center">
            <Card.Img
              classname="detailscard"
              variant="top"
              src={details.primaryimageurl}
            />
            <Card.Body classname="detailscard">
              <FavoriteBorderOutlinedIcon
                color="primary"
                className="like"
                type="submit"
                // onClick={storeFavorite}
                //className="btn btn-primary"
              />
              <Card.Title>{details.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {details.people ? details.people[0].name : ""}
              </Card.Subtitle>
              <Card.Text>{details.century}</Card.Text>
              <Card.Text>{details.period}</Card.Text>
              <Card.Text> {details.culture}</Card.Text>
              <Card.Text> {details.technique}</Card.Text>
              <Card.Text> {details.medium}</Card.Text>
              <Card.Text>{details.classification}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};
export default Details;
