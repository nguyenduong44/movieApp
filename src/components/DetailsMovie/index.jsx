import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'

function DetailsMovie() {

  const [movieDetails, getMovieDetails] = useState({});
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [errorMovie, setErrorMovie] = useState(null);

  const {movieId, dataType} = useParams();

 
  const fetchMovieDetails = () => {
    fetch(`https://api.themoviedb.org/3/${dataType}/${movieId}?api_key=92cd1c00191d7a87cc773c5ee643696c&append_to_response=credits`)
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
    <div>
      <div style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}')`
      }}
      className="w-full h-[79vh] bg-cover bg-center bg-no-repeat">
        <div>
          this is play button
        </div>
        <div>
          this is functional button
        </div>
      </div>
      <div className="bg-white">
        Day lai information cua details page
      </div>
    </div>
  );
}

export default DetailsMovie;