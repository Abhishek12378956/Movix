import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchDataFromApi } from "../../utils/api";
// import Spinner from "../../components/spinner/Spinner";
// import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
// import InfiniteScroll from "react-infinite-scroll-component";
// import MovieCard from "../../components/movieCard/MovieCard";

// const SearchResult = () => {
//   const [data, setData] = useState(null);
//   const [pageNum, setPageNum] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const { query } = useParams();

//   const fetchInitialData = () => {
//     setLoading(true);
//     console.log(query, "query");
//     fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
//       (res) => {
//         setData(res);
//         setPageNum((prev) => prev + 1);
//         setLoading(false);
//       }
//     );
//   };

//   const fetchNextPageData = () => {
//     fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
//       (res) => {
//         if (data?.results) {
//           // Fix typo: 'data?.result' should be 'data?.results'
//           setData({
//             ...data,
//             results: [...data?.results, ...res.results],
//           });
//         } else {
//           setData(res); // Fix typo: 'setData(rse)' should be 'setData(res)'
//         }
//         setPageNum((prev) => prev + 1);
//       }
//     );
//   };

//   useEffect(() => {
//     setPageNum(1);
//     fetchInitialData();
//   }, [query]);

//   return (
//     <div className="searchResultPage">
//       {loading && <Spinner initial={true} />}
//       {!loading && (
//         <ContentWrapper>
//           {data?.results?.length > 0 ? (
//             <>
//               <div className="pageTitle">
//                 {`Search ${
//                   data.total_results > 1 ? "results" : "result"
//                 } of '${query}'`}
//               </div>
//               <InfiniteScroll
//                 className="content"
//                 dataLength={data?.results?.length || 0} // Fix typo: 'data?.result?.length' should be 'data?.results?.length'
//                 next={fetchNextPageData}
//                 hasMore={pageNum <= data?.total_pages}
//               >
//                 {data?.results.map(
//                   (
//                     item,
//                     index // Add 'index' parameter
//                   ) =>
//                     item.media_type !== "person" && (
//                       <MovieCard key={index} data={item} fromSearch={true} />
//                     )
//                 )}
//               </InfiniteScroll>
//             </>
//           ) : (
//             <span className="resultNotFound">Sorry, Results not found!</span>
//           )}
//         </ContentWrapper>
//       )}
//     </div>
//   );
// };

// export default SearchResult;
