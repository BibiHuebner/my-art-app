//landing page with search field
//mappen
//hier den ganzen fetch rüberholen
//maybe context: dann nur noch 1 fetch
//pagination? how to display 100 more? infinite scroll/more button
//like buttons
//click for more info
// see Bootstrap masonry grid/ card columns
//context/usecontext fetch
//customhook für fetch
//neuer fetch mit weniger daten
//import InfiniteScroll from "react-infinite-scroll-component";
//refresh button
import React, { useState } from "react";
import List from "./List";
import "../App.css";
import useFetch from "../components/useFetch";
import ArtObject from "../components/ArtObject";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const { list, loading, error } = useFetch(
    "https://api.harvardartmuseums.org/object?apikey=58de05bf-ee95-4975-9602-dd1902a5464e&hasimage=1&size=10&sort=random&fields=century,title,id,description,medium,technique,primaryimageurl,alttext,culture,people"
  );
  // console.log(list, loading, error); console logs okay
  if (loading) return <h1>LOADING</h1>;
  if (error) console.log(error);

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

        {/* <button className="refreshbutton" onClick={getMyData}>
          refresh
        </button> */}
      </div>
      <div className="cardgrid">
        {!loading ? (
          list &&
          list
            /*missing: filter for medium and culture plus error: properties of null*/
            .filter((artobject) => {
              return (
                artobject.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                artobject.century
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              );
            })

            .map((artobject, index) => {
              <ArtObject key={artobject.id} artobject={artobject} />;
              //artobject hier naming wie ich will, index same
              return (
                <p key={artobject.id}>
                  <ArtObject key={artobject.id} artobject={artobject} />
                </p>
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
