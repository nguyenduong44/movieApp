import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useCallback } from 'react';
import { db, auth } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";

import {LazyLoadImage} from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";

import { CiStar } from "react-icons/ci";

function FavoriteMovie() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en-US');
  
  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if(auth.currentUser){
        const userId = auth.currentUser.uid;
        try{
          const querySnapshot = await getDocs(collection(db, "users", userId, 'favoriteMovies'));
          const movies = [];
          querySnapshot.forEach((doc) => {
            movies.push(doc.data().movieId);
          });
          setFavoriteMovies(movies);
        } catch(error) {
          console.log('Error retrieving favorite movies:', error);
        }
      }
    };
    fetchFavoriteMovies();
  },[]);

  const handleDateToYear = useCallback((date) => 
  {
    return date.slice(0,4);
  }, []);

  const fetchMovieDetails = async (movieId, language) => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}
    ?api_key=92cd1c00191d7a87cc773c5ee643696c&language=${language}`; 
    
    const response = await axios.get(apiUrl);
    return response.data;
  };

  const {isLoading, isError, data: moviesDetails} = useQuery({
    queryKey:['favoriteMoviesDetails', favoriteMovies, language],
    queryFn: async () => {
      const moviesPromises = favoriteMovies.map(movieId => fetchMovieDetails(movieId, language));
      return Promise.all(moviesPromises);
    },
    enabled: favoriteMovies.length > 0,
    retry: 6,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return <div className="text-white">Loading Favorite Movies</div>;
  }

  if (isError) {
    return <div className="text-white">Error Loading Favorite Movies</div>;
  }

  return (
    <div className="px-28 mt-24 text-white mobile:px-9">
      <h1 className="text-4xl font-extrabold mb-10">YOUR FAVORITE MOVIES</h1>
      <div className='text-white grid grid-cols-5 gap-x-8 gap-y-10
      tablet:grid-cols-4 mobile:grid-cols-2'>
        {moviesDetails?.map(movie => {
          return (
            <Link to={`/details/movie/${movie.id}`} key={movie.id}>
            <div className="col-span-1 relative hover:grayscale-[30%] cursor-pointer
            duration-500 ease-in-out hover:scale-110
            ">
              <LazyLoadImage 
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                alt={movie.title}
                className="rounded-lg mb-1"
              />
              <h2 className="line-clamp-1 text-lg
                tablet:text-sm mobile:text-sm         
                ">{movie.title || movie.name}
              </h2>
              <p className="text-sm text-slate-400 font-light
                tablet:text-xs mobile:text-xs
              ">{handleDateToYear(movie.release_date || movie.first_air_date)}
              </p>
              <p className="absolute flex bg-[#4a521e] items-center top-2 left-[-8px] 
              font-bold text-sm border-2 border-l-8 border-primary py-[2px] px-2">
                <CiStar size={19} color="yellow" className="mr-1"/> {movie.vote_average}
                <span className="before:content='' before:absolute before:border-t-8 
                before:border-l-8 before:border-t-primary before:border-l-transparent 
                before:top-[25px] before:left-[-8px]"></span>
              </p>
            </div>
          </Link>
          )
        })}
      </div>  
    </div>
  );
}

export default FavoriteMovie;