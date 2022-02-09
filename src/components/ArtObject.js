//an die neue url noch anpassen: link/keys id stimmt dann nicht mehr

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  getFirestore,
  addDoc,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import List from "../screen/List";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "../App.css";
import { AuthContext } from "../context/authContext";
import { Details } from "@mui/icons-material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const ArtObject = (props) => {
  const { artobject } = props;
  const { user, setUser } = useContext(AuthContext);
  const db = getFirestore();
  // const [Favartobject, setFavArtobject] = useState(null);

  // const storeFavorite = async () => {
  //   //to check: have I already liked the painting? then update the existing document
  //   //if imageid in collection...what then?
  //   // if not, with storeFavorite, we add a new document
  //   try {
  //     const docRef = await addDoc(collection(db, "favorites"), {
  //       userId: user.uid,
  //       //favPaintings has to be an array
  //       favPaintings: [
  //         {
  //           objectId: artobject.id,
  //           title: artobject.title,
  //           artist: artobject.people ? artobject.people[0].name : "",
  //           culture: artobject.culture,
  //           dated: artobject.century,
  //           period: artobject.period,
  //           medium: artobject.medium,
  //           technique: artobject.technique,
  //           image: artobject.primaryimageurl,
  //           description: artobject.description,
  //         },
  //       ],
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  return (
    <div>
      {/* //when like outside of link: storeFavorite not working */}
      {/* <FavoriteBorderOutlinedIcon
        className="favorite"
        type="submit"
        onClick={storeFavorite}
      /> */}
      <Link to={`/details/${artobject.id}`}>
        {/* {artobject.primaryimageurl} && (
        <img
          className="imageitem"
          src={artobject.primaryimageurl}
          alt={artobject.title}
        /> */}
        {/* ) */}
        <img
          className="imageitem"
          src={artobject.primaryimageurl}
          alt={artobject.title}
        />

        {/* <p className="hoverdescription">{artobject.title}</p> */}
        {/* <FavoriteBorderOutlinedIcon
          className="favorite"
          type="submit"
          onClick={storeFavorite}
        /> */}
        {/* //for now: try using the icon instead of like button, then delete, first: storeFavorite */}
        {/* <button
          type="submit"
          onClick={storeFavorite}
          className="btn btn-primary"
        >
          like
        </button> */}
      </Link>
    </div>
  );
};

export default ArtObject;
