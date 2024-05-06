import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { handleDateToYear } from "../PopularMovie";
import { CiStar } from "react-icons/ci";

function TopRatedMovie() {

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [errorItems, setErrorItems] = useState(null);

  const fetchItem = () => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=92cd1c00191d7a87cc773c5ee643696c')
      .then(res => {
       if(!res.ok)
       {
        throw new Error('Failed to fetch items!');
       } 
       return res.json();
      })
      .then(data => {
        setItems(data.results);
        setLoadingItems(false);
      })
      .catch(error => {
        setErrorItems(error.message);
        setLoadingItems(true);
      })
  }

  useEffect(() => {
    fetchItem();
  }, []);

  if(loadingItems)
  {
    return <div className="text-white">Loading Items</div>
  }

  if(errorItems)
  {
    return <div className="text-white">Error: {errorItems}</div>
  }

  return (
    <div className="text-white grid grid-cols-5 gap-x-8 gap-y-10">
      {items && items.slice(0,10).map((item, index) => {
        return (
          <div key={index} className="col-span-1 relative hover:grayscale-[30%] cursor-pointer
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
        )
      })}
    </div>
  );
}

export default TopRatedMovie;