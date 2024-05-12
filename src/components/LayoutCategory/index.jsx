import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { RiArrowGoBackLine , RiArrowGoForwardLine } from "react-icons/ri";

import Item from "./Item";

function LayoutCategory() {

  const [title, setTitle] = useState('popular');
  const [page, setPage] = useState(1);
  const [prevCategory, setPrevCategory] = useState(null);
  
  const totalPage = 10;
  const {category} = useParams();

  const fetchItems = async (page = 1) => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${category}?api_key=92cd1c00191d7a87cc773c5ee643696c&page=${page}`
    const response = await axios.get(apiUrl);
    return response.data;
  } 

  const {isLoading, isError, data, isPlaceholderData} = useQuery({
    queryKey: [category, page],
    queryFn: () => fetchItems(page),
    retry: 3,
    retryDelay: 1000,
    placeholderData: keepPreviousData
  });


  useEffect(() => {
    if(['popular', 'now_playing', 'upcoming'].includes(prevCategory))
    {
      setPage(1);
      window.scrollTo(0, 0);
    }
    setPrevCategory(category);
  },[category])


  useEffect(() => {
    const currentPageJSON = localStorage.getItem('Data');
    const currentPage = JSON.parse(currentPageJSON)
    if (currentPage) {
      setPage(parseInt(currentPage.page));
      localStorage.removeItem('Data');
    }
  },[category]);

  useEffect(() => {
    if(category === 'popular')
    {
      setTitle('MOVIE');
    }
    else if(category === 'now_playing')
    {
      setTitle('NOW PLAYING')
    }
    else{
      setTitle('UP COMING')
    }
  }, [category]);

  const handleDateToYear = useCallback((date) => 
  {
    return date.slice(0,4);
  }, []);


  if(isLoading)
  {
    return <div className="text-white">Loading Layout Category</div>
  }

  if(isError)
  {
    return <div className="text-white">Error Layout Category</div>
  }

  return (

    <div className="px-28 text-white mobile:px-9">
      <h1 className="text-4xl font-extrabold mb-10">{title}</h1>
      <Item 
        data={data}
        onDateToYear={handleDateToYear}
        onLoading={isLoading}
        onError={isError}
        page={page}
        category={category}
      />
      <div className="mt-12 flex justify-between">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 1}
          // onMouseEnter={handleDisabledBackWard}
          className="flex items-center gap-2 px-4 py-2 bg-primary-rgba rounded-md text-sm duration-300 
          hover:opacity-80 disabled:bg-slate-500 disabled:text-black
          "
        >
          <RiArrowGoBackLine />
          Previous Page
        </button>{' '}
        <button
          onClick={() => {
            if (!isPlaceholderData && page < totalPage) {
              setPage((old) => old + 1)
            }
          }}
          disabled={isPlaceholderData || page >= totalPage}
          // onMouseEnter={handleDisabledForward}
          className="flex items-center gap-2 px-4 py-2 bg-primary-rgba rounded-md text-sm duration-300 
          hover:opacity-80 disabled:bg-slate-500 disabled:text-black" 
        >
          Next Page
          <RiArrowGoForwardLine />
        </button>
      </div>
    </div>
  );
}

export default memo(LayoutCategory);