import React, { useEffect, useState } from "react";
//"https://api.harvardartmuseums.org/image?apikey=58de05bf-ee95-4975-9602-dd1902a5464e&hasimage=1&size=10&sort=random&fields=century,title,id,description,medium,technique,baseimageurl,alttext,culture"
const useFetch = (url) => {
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        //console.log(res);
        return res.json();
      })
      .then((data) => {
        //console.log(`data`, data);
        setList(data.records);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        // console.log(`error`, error);
      });
  }, [url]);

  return {
    list,
    error,
    loading,
  };
};
export default useFetch;
