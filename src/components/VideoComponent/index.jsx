import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import Episode from "./Episode";
import Season from "./Season";
import Comments from "./Comments";
import Recommendations from "./Recommendations";

function VideosComponent() {
  const { dataType, movieId } = useParams();
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en-US');
  const [seasonLink, setSeasonLink] = useState(1);
  const [episodeLink, setEpisodeLink] =useState(1);
  const [selectedSeason, setSelectedSeason] = useState(seasonLink);
  const [selectedEpisode, setSelectedEpisode] = useState(episodeLink);

  const fetchMoviesDetails = async ({language}) => {
    const apiUrl = `https://api.themoviedb.org/3/${dataType}/${movieId}
    ?api_key=92cd1c00191d7a87cc773c5ee643696c&language=${language}`;
    const response = await axios.get(apiUrl);
    return response.data;
  }

  const fetchSeasons = async ({seasonLink}) => {
    const apiUrl = `https://api.themoviedb.org/3/tv/${movieId}/season/${seasonLink}?api_key=92cd1c00191d7a87cc773c5ee643696c`;
    const response = await axios.get(apiUrl);
    return response.data;
  }

  const {data:movieData, isLoading:isMovieLoading, isError:isMovieError} = useQuery({
    queryKey:['videos', language],
    queryFn: () => fetchMoviesDetails({language}),
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });

  const {data:seasonsData, isLoading:isSeasonsLoading, isError:isSeasonsError} = useQuery({
    queryKey:['season', seasonLink, episodeLink],
    queryFn: () => fetchSeasons({seasonLink}),
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false
  });


  useEffect(() => {
    const previousLanguage = localStorage.getItem('language');
    if (previousLanguage !== language) {
      setLanguage(language);
      localStorage.setItem('language', language);
    }
  }, [language]);

  const handleEpisodeClick = useCallback((index) => {
    setEpisodeLink(index);
    setSelectedEpisode(index);
  }, []);

  const handleSeasonClick = useCallback((index) => {
    setSeasonLink(index);
    setSelectedSeason(index);
    setSelectedEpisode(1);
    setEpisodeLink(1);
  }, []);

  const handleDateToYear = (date) => 
  {
    return date.slice(0,4);
  };

  if (isMovieLoading) {
    return <div className="text-white">Loading Favorite Movies</div>;
  }

  if (isMovieError) {
    return <div className="text-white">Error Loading Favorite Movies</div>;
  }

  return (
    <div className="mt-20 mx-1 h-full">
      <div className="flex gap-6">
        <iframe src={`https://www.2embed.cc/embed${dataType === 'movie' ? '' : 'tv'}/${movieId}&s=${seasonLink}&e=${episodeLink}`} 
        frameborder="0" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
        className={`${movieData.seasons ? 'w-[80%]' : 'w-[100%]'} h-[85vh]`}
        ></iframe>
        {movieData.seasons && 
          <Season 
            movieData={movieData}
            isMovieError={isMovieError}
            isMovieLoading={isMovieLoading}
            selectedSeason={selectedSeason}
            onSeasonClick={handleSeasonClick}
            seasonLink={seasonLink}
          />
        }
      </div>
      <div className="text-white font-bold px-9 my-6">
        <h1 className="text-4xl mb-3 ml-[1%]">{movieData?.title || movieData?.name}</h1>
        <h3 className="text-slate-400 mb-10 ml-[1%]">{movieData?.original_title || movieData?.original_name}
          <span> ({handleDateToYear(movieData?.first_air_date || movieData?.release_date)})</span>
        </h3>
        {movieData.seasons && seasonsData && (
          <Episode
            onEpisodeClick={handleEpisodeClick}
            seasonsData={seasonsData}
            selectedEpisode={selectedEpisode}
            isSeasonsError={isSeasonsError}
            isSeasonsLoading={isSeasonsLoading}
          />
        )}
      </div>
      <div className="px-9 w-full flex gap-10 mt-24">
        <Comments />
        <Recommendations />
      </div>
    </div>
  );
}

export default VideosComponent;