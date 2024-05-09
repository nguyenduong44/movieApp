import { memo, useEffect } from "react";

import { useQuery } from '@tanstack/react-query';

import axios from 'axios'

import {LazyLoadImage} from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";

import { CiStar } from "react-icons/ci";

function ItemList({fetchUrl, title, onDateToYear, dataType }) {

  const fetchItems = async () => {
    const apiUrl = dataType === 'movie' ? 
      'https://api.themoviedb.org/3/movie/' :
      'https://api.themoviedb.org/3/tv/';
    const response = await axios.get(apiUrl + fetchUrl);
    return response.data.results;
  }

  const { isError, isLoading, data } = useQuery({
    queryKey: [title],
    queryFn: fetchItems,
    retry: 3,
    retryDelay: 1000,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false
  });

  useEffect(() => {
    if(!isLoading && !isError)
    {
      window.scrollTo({top: 0, behavior: "smooth"})
    }
  }, [isLoading,isError]);


  if(isLoading)
  {
    return <div className="text-white">Loading Items Popular</div>
  }

  if(isError)
  {
    return <div className="text-white">Error {title}</div>
  }

  return (
    <div className="text-white grid grid-cols-5 gap-x-8 gap-y-10">
      {data && data.slice(0,10).map((item, index) => {
        return (
          <Link to={`/details/${dataType}/${item.id}`} key={index}>
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