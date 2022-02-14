import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
//import ScrollLoader
const Scroll = () => {
    const [artobject, setArtobject] = useState([]);
    useEffect(() => {
        const useFetch
    })
  return (
    <div>
      <InfiniteScroll
        dataLength={list.length} 
        next={useFetch}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You have seen it all</b>
          </p>
        }
        
      >
        {list}
      </InfiniteScroll>
    </div>
  );
};

export default Scroll;
