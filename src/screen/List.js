//? filter+++

import React, { useEffect, useState } from "react";
import ArtObject from "../components/ArtObject";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "../App.css";
import Container from "react-bootstrap/Container";
import useFetch from "../components/useFetch";

const List = () => {
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const getMyData = () => {
    fetch(
      "https://api.harvardartmuseums.org/object?apikey=58de05bf-ee95-4975-9602-dd1902a5464e&hasimage=1&size=10&sort=random&fields=century,title,id,description,medium,technique,primaryimageurl,alttext,culture,people"
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(`data`, data);
        setList(data.records);

        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        console.log(`error`, error);
      });
  };
  useEffect(() => {
    getMyData();
  }, []);
  console.log(`list`, list);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
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
        <p>Your search: {searchTerm}</p>
        <button className="refreshbutton" onClick={getMyData}>
          refresh
        </button>
      </div>
      <div className="cardgrid">
        {!loading ? (
          list &&
          list

            .filter((artobject) => {
              return (
                artobject.title
                  .toLowerCase() /*||
                artobject.century.toLowerCase() ||
                artobject.medium.toLowerCase() ||
                artobject.culture */
                  // .toLowerCase()
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

export default List;

/*
<InfiniteScroll
  dataLength={images}
  next={() => fetchImages(5)}
  hasMore={true}
  loader={
    <img
      src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
      alt="loading"
    />
  }
>
  <div className="image-grid" style={{ marginTop: "30px" }}>
    {loaded
      ? images.map((image, index) => (
          <UnsplashImage url={image.urls.regular} key={index} />
        ))
      : ""}
  </div>
</InfiniteScroll>;
*/
