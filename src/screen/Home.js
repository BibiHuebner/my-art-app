//pagination? how to display 100 more? infinite scroll/more button
//like buttons
//import InfiniteScroll from "react-infinite-scroll-component";
//refresh button if infinite scrolling takes too long
//fix filter
//fix loader image
//only show like buttons when logged in, buttons in the image
import React, { useState, useContext } from "react";
//import List from "./List";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../App.css";
import useFetch from "../components/useFetch";
import ArtObject from "../components/ArtObject";
import { ListContext } from "../context/listContext";
import { AuthContext } from "../context/authContext";
import Loader from "../components/Loader";
import { getStorage, ref } from "firebase/storage";
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
const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  //const { getMyData } = useContext(ListContext);
  //console.log("context", context);
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const { list, loading, error } = useFetch(
    "https://api.harvardartmuseums.org/object?apikey=58de05bf-ee95-4975-9602-dd1902a5464e&hasimage=1&size=10&sort=random&fields=century,title,id,description,medium,technique,primaryimageurl,alttext,culture,people"
  );
  // pagination: error 401 if i include &size=10&page=10, test again in postman
  // try this: altered API call with pagination:
  //"https://api.harvardartmuseums.org/object?apikey=58de05bf-ee95-4975-9602-dd1902a5464e&hasimage=1&size=10&page=5&sort=random&fields=century%2Ctitle%2Cid%2Cdescription%2Cmedium%2Ctechnique%2Cprimaryimageurl%2Calttext%2Cculture%2Cpeople"
  //console.log(list, loading, error);
  console.log("user", user);
  if (loading) return <Loader />; //<h1>LOADING</h1>
  if (error) console.log(error);
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
    } else {
      console.log("Document does not exist");
    }
  };

  return (
    <div /*className="cardgrid"*/ className="container">
      <div className="search">
        <input
          className="searchfield"
          type="text"
          placeholder="  search"
          value={searchTerm}
          onChange={handleChange}
        ></input>
        {/* <SearchIcon /> */}
        {/* <button className="refreshbutton" onClick={useFetch}>
          refresh
        </button> */}
        {/* <p>Login to save your favorites and to have access to your gallery</p> */}
      </div>
      <div className="cardgrid">
        {!loading ? (
          list &&
          list

            .filter((artobject) => {
              return (
                (artobject.title !== null &&
                  artobject.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
                (artobject.century !== null &&
                  artobject.century
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
                (artobject.medium !== null &&
                  artobject.medium
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
                (artobject.culture !== null &&
                  artobject.culture
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
                (artobject.technique !== null &&
                  artobject.technique
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
              );
            })
            //Schrittweise, components
            //problems with div in return, now the grid looks weird, can't insert anything before artobject.primary...
            //if grid stays weird: maybe put them onto the image, because in the details page
            // it's possible to view the image without it
            .map((artobject, index) => {
              return (
                <div>
                  {artobject.primaryimageurl !== null && (
                    <>
                      <ArtObject key={artobject.id} artobject={artobject} />
                      <button
                        onClick={() => saveFav(artobject)}
                        type="submit"
                        className="btn btn-primary"
                      >
                        like
                      </button>
                      <button
                        onClick={() => removeFav(artobject)}
                        type="submit"
                        className="btn btn-primary"
                      >
                        unlike
                      </button>
                      <FavoriteBorderOutlinedIcon
                        onClick={() => saveFav(artobject)}
                        type="submit"
                        color="primary"
                      />
                      <FavoriteIcon
                        onClick={() => removeFav(artobject)}
                        type="submit"
                        color="primary"
                      />
                    </>
                  )}
                </div>
              );
            })
        ) : (
          <p>
            {
              <img
                //src="https://www.digitalengineering247.com/images/article/CNH-Front-End-Loader-e1507819681469.png"
                src="https://i.gifer.com/7TwJ.gif"
                alt="loading"
              />
            }
          </p> //loader image not working
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
export default Home;
