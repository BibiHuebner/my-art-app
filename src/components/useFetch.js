import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
//"https://api.harvardartmuseums.org/image?apikey=58de05bf-ee95-4975-9602-dd1902a5464e&hasimage=1&size=10&sort=random&fields=century,title,id,description,medium,technique,baseimageurl,alttext,culture"
const useFetch = (url) => {
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        //console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(`data`, data);
        setList(data.records);
        setTotalPages(data.info.pages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        // console.log(`error`, error);
      });
  }, [url]); //when this changes useeffect is run again, fetching again in case the url changes

  return {
    list,
    error,
    loading,
    totalPages,
  };
};
export default useFetch;
