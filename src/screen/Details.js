//display details for 1 clicked element
//fetch with more details than 1st fetch
import React from "react";
import { useEffect, useState } from "react";
import List from "./List";
import "../App.css";
import { useParams } from "react-router-dom";
import ArtObject from "../components/ArtObject";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

//customhookfetch tutorial: überlegen, wie hier verwenden, fetch auslagern
//context
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
      <h1>{details.title}</h1>
      <h1> {details.people ? details.people[0].name : ""}</h1>
      <h2>{details.culture}</h2>
      <h3> {details.century}</h3>
      <h4>{details.period}</h4>
      <h4>{details.technique}</h4>
      <h4>{details.medium}</h4>
      <h4>{details.classification}</h4>
      <FavoriteBorderOutlinedIcon />
      <img
        className="imageitem"
        src={details.primaryimageurl}
        alt={details.description}
      />
    </div>
  );
};
export default Details;
