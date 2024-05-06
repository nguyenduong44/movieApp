import { useEffect, useState } from "react";

import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs';
import { GoDotFill } from "react-icons/go";

function SlideShow() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayGenre, setDisplayGenre] = useState([]);
  const [selectedDotIndex, setSelectedDotIndex] = useState(0);

  const [posters, setPoster] = useState([0]);
  const [errorPoster, setErrorPoster] = useState(null);
  const [loadingPoster, setLoadingPoster] = useState(true);

  const [genre, setGenre] = useState('No Genre');
  const [errorGenres, setErrorGenres] = useState(null);
  const [loadingGenres, setLoadingGenres] = useState(true);

  const posterUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=92cd1c00191d7a87cc773c5ee643696c';
  const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=92cd1c00191d7a87cc773c5ee643696c';

  const fetchData = () =>
  {
    fetch(posterUrl)
      .then(res => {
        if(!res.ok)
        {
          throw new Error('Fail to fetch data');
        }
        return res.json();
      })
      .then(data => {
        setPoster(data.results);
        setLoadingPoster(false);
      })
      .catch(e => {
        setErrorPoster(e.message);
        setLoadingPoster(true);
      });
  };

  const fetchGenres = () => {
    fetch(genresUrl)
      .then(res => {
        if(!res.ok)
        {
          throw new Error('Fail to fetch genres id!');
        }
        return res.json();
      })
      .then(data => {
        setGenre(data.genres);
        setLoadingGenres(false);
      })
      .catch(e => {
        setErrorGenres(e.message);
        setLoadingGenres(true);
      })
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchGenres();
  },[]);

  useEffect(() => {
    if (posters && posters[currentIndex] && posters[currentIndex].genre_ids && genre) {
        const genresArray = [];
        for(let i = 0; i < posters[currentIndex].genre_ids.length; i++)
        {
            for(let j = 0; j < genre.length; j++)
            {
                if(posters[currentIndex].genre_ids[i] === genre[j].id)
                {
                    genresArray.push(genre[j].name);
                }
            }
        }
        setDisplayGenre(genresArray);
    }
  }, [currentIndex, posters, genre]);

  if(loadingPoster)
  {
    return <div>Loading Poster...</div>
  }

  if(errorPoster)
  {
    return <div>Error: {errorPoster}</div>
  }

  if(loadingGenres)
  {
    return <div>Loading Genres...</div>
  }

  if(errorGenres)
  {
    return <div>Error: {errorGenres}</div>
  }

  // Prev slide
  const prevSlide = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? 3 : currentIndex - 1;

      setCurrentIndex(newIndex);
  }

  // Next Slide
  const nextSlide = () => {
    const isLastSlide = currentIndex === 3;
    const newSlide = isLastSlide ? 0 : currentIndex + 1;

    setCurrentIndex(newSlide);
  }

  //Go to Slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setSelectedDotIndex(index);
  }


  return (
    <div className="h-[65vh] flex w-full py-6 px-28 relative duration-500">
      <div className="my-auto basis-2/5">
        <h1 className="text-3xl font-extrabold text-white leading-none mb-3">
          {posters[currentIndex].title}
          <div className="inline-block ml-4 text-sm font-medium border border-l-4 border-s-primary pl-2 p-[4px] align-middle">
            {posters[currentIndex].vote_average} &#9734;
          </div>
        </h1>
        <div className="text-primary font-bold mb-4 flex ">
          {displayGenre && displayGenre.map((genre,index) => {
            return <div key={index} className={`ml-${index === 0 ? 0 : 3}`}>{genre}</div>
          })}
        </div>
        
        <div className="text-gray-500 text-sm font-semibold leading-6 mb-8 line-clamp-4">
          {posters[currentIndex].overview} 
        </div>
        <button className="btn">
          Play
        </button>
      </div>
      {posters.length > 0 && 
      (
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${posters[currentIndex].backdrop_path}')`,
            boxShadow: 'inset 0px 0px 500px rgba(0,0,0,1)'
          }}
          className="w-6/12 h-full bg-cover rounded-2xl duration-500 absolute right-[112px] top-0 opacity-90">
            <div className="h-full flex justify-center pt-[57%] drop-shadow-sm">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className={`hover:opacity-70 cursor-pointer mx-1 ${selectedDotIndex === index ? 'opacity-65' : ''}`}>
                  <GoDotFill onClick={() => goToSlide(index)} size={20} color="#CCFF00"/>
                </div>
              ))}
            </div>
        </div>)}

        <div className="hover:bg-opacity-40 absolute top-[50%] -translate-x-0 translate-y-[-50%] left-10 text-2xl rounded-full p-2 bg-primary bg-opacity-75 text-white cursor-pointer"> 
          <BsChevronCompactLeft onClick={prevSlide} size={20}/>
        </div>
        <div className="hover:bg-opacity-40 absolute top-[50%] -translate-x-0 translate-y-[-50%] right-10 text-2xl rounded-full p-2 bg-primary bg-opacity-75 text-white cursor-pointer"> 
          <BsChevronCompactRight onClick={nextSlide} size={20}/>
        </div>
    </div>
  );
}

export default SlideShow;