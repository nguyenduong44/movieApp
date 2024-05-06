import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { CiStar } from "react-icons/ci";

export const handleDateToYear = (date) => 
{
  return date.slice(0,4);
};

function PopularMovie() {

  const [posters, setPosters] = useState([]);
  const [loadingPosters, setLoadingPosters] = useState(true);
  const [errorPosters, setErrorPoster] = useState(null);

  
  const fetchPosters = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=92cd1c00191d7a87cc773c5ee643696c')
      .then((res) => {
        if(!res.ok)
        {
          throw new Error('Failed to load response!')
        }
        return res.json();
      }) 
      .then((data) => {
        setPosters(data.results);
        setLoadingPosters(false)
      })
      .catch((error => {
        setErrorPoster(error.message);
        setLoadingPosters(true);
      }))
  }

  useEffect(() => {
    fetchPosters();
  }, [])

  if(loadingPosters)
  {
    return <div className="text-white">Loading Items Popular</div>
  }

  if(errorPosters)
  {
    return <div className="text-white">Error Popular Movie: {errorPosters}</div>
  }

  return (
    <div className="text-white grid grid-cols-5 gap-x-8 gap-y-10">
      {posters && posters.slice(0,10).map((item, index) => {
        return (
          <Link to={`/details/${item.id}`} key={index}>
            <div className="col-span-1 relative hover:grayscale-[30%] cursor-pointer
            duration-500 ease-in-out hover:scale-110
            ">
              <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className="rounded-lg mb-1"/>
              <h2 className="line-clamp-1 text-lg">{item.title}</h2>
              <p className="text-sm text-slate-400 font-light">{handleDateToYear(item.release_date)}</p>
                <p className="absolute flex bg-[#4a521e] items-center top-2 left-[-8px] font-bold text-sm border-2 border-l-8 border-primary py-[2px] px-2">
                  <CiStar size={19} color="yellow" className="mr-1"/> {item.vote_average}
                  <span className="before:content='' before:absolute before:border-t-8 before:border-l-8 before:border-t-primary before:border-l-transparent before:top-[25px] before:left-[-8px]"></span>
                </p>
            </div>
          </Link>
        )
      })}
    </div>
  );
}

export default PopularMovie;