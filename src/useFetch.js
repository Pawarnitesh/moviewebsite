import { useState, useEffect } from "react";

// setting the api link
// https://www.omdbapi.com/?apikey=727bbdc1&s=titanic
// https://www.omdbapi.com/?apikey=bab9d298&s=titanic
// https://www.omdbapi.com/?apikey=9594740a&s=titanic

export const API_URL = "https://www.omdbapi.com/?&apikey=727bbdc1";
/* plz subsribe to thapa technical channel 
          https://www.youtube.com/thapatechnical
         */

const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search || data);
        setIsError({ show: "false", msg: "" });
      } else {
        setIsError({ show: "true", msg: data.Error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // debouncing in react js
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovie(`${API_URL}&s=${apiParams}`);
    }, 1000);
    console.log("set");
    return () => {
      clearTimeout(timeOut);
      console.log("clear");
    };
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default useFetch;
