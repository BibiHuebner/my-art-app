import React, { useContext, useEffect, useState } from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { AuthContext } from "../context/authContext";
import ArtObject from "../components/ArtObject";
import "../App.css";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
//how do I reference my collection here? or my document?
const Gallery = () => {
  const { user, setUser, logIn } = useContext(AuthContext);
  console.log("user", user);
  const [favorites, setFavorites] = useState(null);
  //const [favorites, setFavorites] = useState(doc.data());
  const db = getFirestore();
  console.log("db", db);

  const savedFaves = async () => {
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", user.uid)
    );
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

      // const querySnapshot = await getDocs(q); //promise, so add try and catch block
      // //use loading state : to fix problem with asynchronicity

      // console.log("querySnapshot", querySnapshot);
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   setFavorites(doc.data());
      //   console.log(doc.data());
      //   console.log(doc.id, " => ", doc.data());
      //   //clg not working
      // });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    savedFaves();
  }, []);

  return (
    <div className="gallery">
      <ColorLensIcon className="logo" color="primary" sx={{ fontSize: 40 }} />
      <h2>your collection</h2>
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
          console.log("favorites", favorites);
          console.log("here ${uid} favorites");
          return (
            <div className="detailscard">
              <h1>{oneFav.title}</h1>
              {/* <h1> {onepainting.people ? onepainting.people[0].name : ""}</h1>
              <h2>{onepainting.culture}</h2> */}
              <h3> {oneFav.century}</h3>
              {/* <h4>{onepainting.period}</h4>
              <h4>{onepainting.technique}</h4>
              <h4>{onepainting.medium}</h4>
              <h4>{onepainting.classification}</h4> */}
              <FavoriteBorderOutlinedIcon />
              <img
                className="imageitem"
                src={oneFav.primaryimageurl}
                alt={oneFav.description}
              />
            </div>

            // <img
            //   className="imageitem"
            //   src={onepainting.primaryimageurl}
            //   alt={onepainting.title}
            // />
            //<p>{favorites.century}</p>

            // <p>{onepainting.century}</p>
            // <p>{onepainting.title}</p>
          );
        })}
      <button type="submit" className="btn btn-primary">
        delete from favorites
      </button>
      {/* // onClick: {deleteFromFavorites} */}
    </div>
  );
};

export default Gallery;
