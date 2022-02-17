import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import {
  getFirestore,
  addDoc,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

//create Context

export const LikeContext = createContext();

// create provider

export const LikeContextProvider = (props) => {
  const { artobject } = props;
  const { user, setUser } = useContext(AuthContext);
  // move state and function

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();

  const saveFav = async (artobject) => {
    try {
      const favoriteRef = doc(db, "favorites", user.uid);
      const favoriteSnap = await getDoc(favoriteRef);
      //if the docsnap exists I want to update the specific document

      if (favoriteSnap.exists()) {
        console.log("Update document");
        console.log(favoriteSnap.data());
        favoriteSnap.data().myFav.forEach(async (oneFav) => {
          if (oneFav.id === artobject.id) {
            console.log("already liked");
          } else {
            await updateDoc(favoriteRef, {
              myFav: arrayUnion(artobject),
            });
          }
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("Create new document!");

        //add a document incl. id
        let newDocument = {
          myFav: [artobject],
        };
        await setDoc(doc(db, "favorites", user.uid), newDocument);
        console.log(newDocument);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  //return the Provider with its value and inject children

  return (
    <LikeContext.Provider value={{ loading, error, saveFav, artobject }}>
      {props.children}
    </LikeContext.Provider>
  );
};

const like = () => {
  return <div>like</div>;
};

export default like;
