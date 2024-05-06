import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Details() {
  const {movieId} = useParams();
  
  const [movieDetails, getMovieDetails] = useState({});
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [errorMovie, setErrorMovie] = useState(null);

  const fetchMovieDetails = () => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=92cd1c00191d7a87cc773c5ee643696c&append_to_response=credits`)
      .then(res => {
        if(!res.ok)
        {
          throw new Error('Failed to fetch movie!');
        }
        return res.json();
      })
      .then(data => {
        getMovieDetails(data);
        setLoadingMovie(false);
      })
      .catch(err => {
        setErrorMovie(err.message);
        setLoadingMovie(true);
      })
  };

  useEffect(() => {
    fetchMovieDetails();
  },[]);

  if(loadingMovie)
  {
    return <div className="text-white">Loading movie...</div>
  };

  if(errorMovie)
  {
    return <div className="text-white">Error: {errorMovie}</div>
  }

  return (
    <div className="h-[1000px] pt-24">
      <Header />
      <h1 className="bg-white text-red-500">This is details</h1>
      <Footer />
    </div>
  );
}

export default Details;