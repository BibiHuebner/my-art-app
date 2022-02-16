import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import ArtObject from "../components/ArtObject";
import "../App.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Favs from "../utils/Unlike";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

import {
  getFirestore,
  collection,
  query,
  getDoc,
  updateDoc,
  arrayRemove,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Gallery = () => {
  const { user, setUser, logIn } = useContext(AuthContext);
  console.log("user", user);
  const [favorites, setFavorites] = useState(null);
  //const [favorites, setFavorites] = useState(doc.data());
  const db = getFirestore();
  console.log("db", db);

  const removeFav = async (artobject) => {
    //we check whether document exists in favCollection, search for id
    //if it exists, do sth
    //if not: alert
    const favoriteRef = doc(db, "favorites", user.uid);
    const favoriteSnap = await getDoc(favoriteRef);
    //if the docsnap exists I want to update the specific document

    if (favoriteSnap.exists()) {
      //check whether we have that artobject in list of favs
      favoriteSnap.data().myFav.forEach(async (oneFav) => {
        if (oneFav.id === artobject.id) {
          console.log("remove item from array");
          await updateDoc(favoriteRef, {
            myFav: arrayRemove(artobject),
          });
        } else {
          console.log("you haven't liked this before");
        }
      });
      savedFaves();
    } else {
      console.log("Document does not exist");
    }
  };

  const savedFaves = async () => {
    //Execute a query
    //After creating a query object, use the get() function to retrieve the results:
    //if this querysnapshot is empty create new document otherwise update
    //we know user from context, we are comparing the user id of the logged in user
    //with the useridfield in the collection
    //so to only show the users favorites not of the other users

    //create a new state favorites, set the new state with doc.data()
    //if there is a user get his favorites (snapshot for Each = look at id,
    // retrieve data, display it) (if there are favs yet!)

    //make a delete from favs function:
    // await deleteDoc(doc(db, "cities", "DC"));
    try {
      const docRef = doc(db, "favorites", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFavorites(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  //call remove function every time we removed new page
  useEffect(() => {
    savedFaves();
  }, []);

  return (
    <div className="gallery">
      {/* returns the favorites only when they are not null, change when loader: */}
      {/* //use the ArtObject component again or just create html element 
      //then
        save a favorite in the database when user clicks likebutton 
        //make sure
      address right painting //show “favorite” button if item is not in user
      favorites 
      //show “unfavorite” button if item us in the favorites. 
      // edit
      so that loads the Favorites into one array when screen is loaded 
      //then
      for each item check if the item id is available in //Favorites array.
      If
      item is found from favorites collection then //change button state to
      “unfavorite”. */}
      {favorites &&
        favorites.myFav.map((oneFav) => {
          // console.log("favorites", favorites);
          // console.log("here ${uid} favorites");
          return (
            <div classname="row">
              <div classname="column">
                {/* <div className="gallery"> */}
                <Container className="detailscard">
                  {/* <Row classname="detailscard"> */}
                  <Row className="justify-content-md-center" Row xs="auto">
                    <Col lg={true}>
                      <Card classname="detailscard" className="text-center">
                        {/* <div className="overlayContainer"> */}
                        <Card.Img
                          // classname="overlayImage"
                          variant="top"
                          src={oneFav.primaryimageurl}
                          alt={oneFav.description}
                        />
                        {/* <Link to={`/details/${artobject.id}`}></Link> */}
                        <Card.Body className="detailscard">
                          <FavoriteIcon
                            color="primary"
                            className="removeFromGallery"
                            type="submit"
                            onClick={() => removeFav(oneFav)}
                          />
                          <div class="hide">remove</div>
                          <Card.Title>{oneFav.title}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {oneFav.people ? oneFav.people[0].name : ""}
                          </Card.Subtitle>
                          <Card.Text>{oneFav.century}</Card.Text>
                          <Card.Text>{oneFav.period}</Card.Text>
                          <Card.Text> {oneFav.culture}</Card.Text>
                          <Card.Text> {oneFav.technique}</Card.Text>
                          <Card.Text> {oneFav.medium}</Card.Text>
                          <Card.Text>{oneFav.classification}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Gallery;
