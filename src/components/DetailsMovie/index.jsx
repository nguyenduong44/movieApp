import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import axios from "axios";

import DetailInformation from "./DetailInformation";

import { PiPlayCircleDuotone } from "react-icons/pi";
import { TbPlaylistAdd, TbHeart } from "react-icons/tb";



function DetailsMovie() {
  const [playBtn, setPlayBtn] = useState(false);
  const [pLayList, setPLayList] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const {movieId, dataType} = useParams();

  const fetchItems = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${dataType}/${movieId}
      ?api_key=92cd1c00191d7a87cc773c5ee643696c&append_to_response=credits`
    );
    return response.data;
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: [movieId],  
    queryFn: fetchItems,
    retry: 3,
    retryDelay: 1000,
    staleTime: Infinity,
    cacheTime: Infinity
  });

  useEffect(() => {
    if(!isLoading && !isError)
    {
      window.scrollTo({top: 0, behavior: "instant"})
    }
  }, [isLoading,isError]);

  if(isLoading)
  {
    return <div className="text-white">Loading Items Popular</div>
  }

  if(isError)
  {
    return <div className="text-white">Error Details</div>
  }

  return (
    <div>
      <div style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')`}}
      className="w-full h-[90vh] bg-cover bg-center bg-no-repeat relative from-[#050b0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050b0a]"
              style={{boxShadow: 'inset 0 72px 40px -7px rgba(0,0,0,0.3)'}}
        ></div>
        <PiPlayCircleDuotone color={playBtn ? '#CCFF00' : '#fff'} size={100} 
          className="absolute opacity-65 cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300"
          onMouseEnter={() => setPlayBtn(true)}
          onMouseLeave={() => setPlayBtn(false)}
        />
        <div className="absolute left-28 bottom-14">
          <div>
            <h1 className="text-white font-extrabold text-4xl mb-5">{data.title || data.name}</h1>
            <div className="flex items-center">
              <h1 className="text-white text-base border-none rounded-lg 
                      bg-primary bg-opacity-65 px-4 py-2 cursor-pointer 
                      hover:bg-opacity-80 duration-300
              ">
                  Watch Now
              </h1>
              <TbPlaylistAdd color={pLayList ? '8eb200' : '#fff'} size={30} className="mx-6 cursor-pointer duration-300"
                  onMouseEnter={() => setPLayList(true)}
                  onMouseLeave={() => setPLayList(false)}
              />
              <TbHeart color={favorite ? 'red' : '#fff'} size={30} className="cursor-pointer duration-300"
                  onMouseEnter={() => setFavorite(true)}
                  onMouseLeave={() => setFavorite(false)}
              />
            </div>
          </div>
        </div>
      </div>
      { !isLoading && !isError &&
        data && <DetailInformation data = {data}  onLoading={isLoading} onError={isError}
        />}
    </div>
  );
}

export default DetailsMovie;