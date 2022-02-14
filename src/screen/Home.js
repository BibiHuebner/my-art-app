//pagination? how to display 100 more? infinite scroll/more button
//import InfiniteScroll from "react-infinite-scroll-component";
//refresh button if infinite scrolling takes too long
//fix loader image
//only show like buttons when logged in, buttons in the image
import Button from "react-bootstrap/Button";
import React, { useState, useContext } from "react";
//import List from "./List";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../App.css";
import Container from "react-bootstrap/Container";
import useFetch from "../components/useFetch";
import ArtObject from "../components/ArtObject";
import { ListContext } from "../context/listContext";
import { AuthContext } from "../context/authContext";
import Loader from "../components/Loader";
import { getStorage, ref } from "firebase/storage";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  // const [pages] = useState(Math.round)(data.length / dataLimit));

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const { list, loading, error, totalPages } = useFetch(
    `https://api.harvardartmuseums.org/object?apikey=58de05bf-ee95-4975-9602-dd1902a5464e&hasimage=1&size=10&page=${currentPage}&sort=random&fields=century%2Ctitle%2Cid%2Cdescription%2Cmedium%2Ctechnique%2Cprimaryimageurl%2Calttext%2Cculture%2Cpeople`
  );
  // pagination: error 401 if i include &size=10&page=10, test again in postman
  // try this: altered API call with pagination:
  //"https://api.harvardartmuseums.org/object?apikey=58de05bf-ee95-4975-9602-dd1902a5464e&hasimage=1&size=10&page=5&sort=random&fields=century%2Ctitle%2Cid%2Cdescription%2Cmedium%2Ctechnique%2Cprimaryimageurl%2Calttext%2Cculture%2Cpeople"
  //console.log(list, loading, error);
  // console.log("user", user);
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
                <div className="itemsHomepage">
                  <Container>
                    {/* <Row>
                      <Col md="auto"> */}
                    {artobject.primaryimageurl !== null && (
                      <>
                        <ArtObject key={artobject.id} artobject={artobject} />

                        {/* //buttons disabled, use the heart-icon to like   */}
                        {/* <button
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
                      </button> */}
                        <FavoriteBorderOutlinedIcon
                          className="saveToGallery"
                          onClick={() => saveFav(artobject)}
                          type="submit"
                          color="primary"
                        />
                        <div class="hide">save</div>
                        {/* <FavoriteIcon
                        className="unliked"
                        onClick={() =>
                          Favs.removeFav(
                            getDoc,
                            updateDoc,
                            arrayRemove,
                            db,
                            user,
                            doc,
                            artobject
                          )
                        }
                        type="submit"
                        color="primary"
                      /> */}
                      </>
                    )}
                    {/* </Col>
                    </Row> */}
                  </Container>
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
      <div className="turnPage">
        <Button
          variant="outline-secondary" //anonymous function disabled attribute
          onClick={() => setCurrentPage(currentPage - 1)}
          // className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          disabled={currentPage === 1 ? true : false}
        >
          prev
        </Button>{" "}
        <Button
          variant="outline-secondary"
          onClick={() => setCurrentPage(currentPage + 1)}
          // className={`next ${currentPage === totalPages ? "disabled" : ""}`}
          disabled={currentPage === totalPages ? true : false}
        >
          next
        </Button>{" "}
      </div>
    </div>
  );
};
export default Home;
