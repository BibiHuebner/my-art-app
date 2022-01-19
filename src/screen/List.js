//2nd page: list of search entry
//fetch data here
//?Maybe: fetch woanders oder separieren und darauf zugreifen

import React, { useEffect, useState } from "react";
import ArtObject from "../components/ArtObject";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
//import Pin from "../components/Pin";

const List = () => {
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // const fetchRandomArtworks = () => {};
  const getMyData = () => {
    fetch(
      //"https://api.harvardartmuseums.org/object?apikey=58de05bf-ee95-4975-9602-dd1902a5464e&hasimage=1&size=20"
      "https://api.harvardartmuseums.org/object?apikey=58de05bf-ee95-4975-9602-dd1902a5464e&hasimage=1&size=200&page=50"
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
      .catch((error) => console.log(`error`, error));
    setError(error);
  };
  useEffect(() => {
    getMyData();
  }, []);
  console.log(`list`, list);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        tabIndex="1"
        placeholder="search"
        value={searchTerm}
        onChange={handleChange}
        //onChange={(e) => onFilter(e.target.value)}
      ></input>
      <p>Your search: {searchTerm}</p>
      <button /*onClick={displayRandomArt}*/>random</button>
      {!loading ? (
        list &&
        list

          .filter((artobject) => {
            return artobject.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          })

          .map((artobject, index) => {
            <ArtObject key={artobject.id} artobject={artobject} />;
            //artobject hier naming wie ich will, index same
            return (
              <p key={artobject.id}>
                {" "}
                <ArtObject key={artobject.id} artobject={artobject} />;
              </p>
            );
          })
      ) : (
        <p>loading</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

/* randomize(data, limit) {
        let result = [];
        let numbers = [];
        for (let i = 0; i < limit; i++) {
            const random = Math.floor(Math.random() * data.length);
            if (numbers.indexOf(random) === -1) {
                numbers.push(random);
                result.push(data[random]);
            }
        }
        return result;
*/
export default List;
