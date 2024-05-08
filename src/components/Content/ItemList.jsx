import { memo, useState, useEffect, useRef } from "react";
import {LazyLoadImage} from 'react-lazy-load-image-component'
import { Link } from "react-router-dom";

import { CiStar } from "react-icons/ci";

function ItemList({fetchUrl, title, onDateToYear, dataType}) {
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [errorItems, setErrorItems] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = dataType === 'movie' ? 
          'https://api.themoviedb.org/3/movie/' :
          'https://api.themoviedb.org/3/tv/';
        const response = await fetch(apiUrl + fetchUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data!');
        }
        const data = await response.json();
        setItems(data.results); 
        setLoadingItems(false);
      } catch (error) {
        setErrorItems(error.message);
        setLoadingItems(false);
      }
    };

    fetchData();
  }, [fetchUrl, dataType]);

  useEffect(() => {
    if (!loadingItems && !errorItems) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loadingItems, errorItems]);


  if(loadingItems)
  {
    return <div className="text-white">Loading Items Popular</div>
  }

  if(errorItems)
  {
    return <div className="text-white">Error {title}: {errorItems}</div>
  }

  return (
    <div className="text-white grid grid-cols-5 gap-x-8 gap-y-10">
      {items && items.slice(0,10).map((item, index) => {
        return (
          <Link to={`/details/${dataType}/${item.id}`} key={index} preventScrollReset={false}>
            <div className="col-span-1 relative hover:grayscale-[30%] cursor-pointer
            duration-500 ease-in-out hover:scale-110
            ">
              <LazyLoadImage 
                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`} 
                alt={item.title}
                className="rounded-lg mb-1"
              />

              <h2 className="line-clamp-1 text-lg">{item.title || item.name}</h2>
              <p className="text-sm text-slate-400 font-light">{onDateToYear(item.release_date || item.first_air_date)}</p>
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

export default memo(ItemList);