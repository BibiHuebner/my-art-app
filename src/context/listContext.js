import { createContext, useState } from "react";
import useFetch from "../components/useFetch";

export const ListContext = createContext();

export const ListContextProvider = (props) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
  return (
    <ListContext.Provider value={{ list, loading, error, getMyData }}>
      {props.children}
    </ListContext.Provider>
  );
};
