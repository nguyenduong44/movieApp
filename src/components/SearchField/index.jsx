import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";

import ItemsSearch from "./ItemsSearch";

function SearchField() {

  const [movieName, setMovieName] = useState('');

  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en-US');

  const fetchItems = async ({movieName, language}) => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=92cd1c00191d7a87cc773c5ee643696c&language=${language}
    &query=${movieName}`;
    const response = await axios.get(apiUrl);
    return response.data;
  }

  const {isLoading, isError, data} = useQuery({
    queryKey: ['search', movieName, language],
    queryFn: () => fetchItems({movieName, language}),
    retry: 3,
    retryDelay: 1000,
  });
  

  const handleDateToYear = useCallback((date) => 
  {
    return date.slice(0,4);
  }, []);

  useEffect(() => {
    const currentPageJSON = localStorage.getItem('Data');
    const currentPage = JSON.parse(currentPageJSON)
    if (currentPage) {
      setMovieName(currentPage.searchInput);
      localStorage.removeItem('Data');
    }
  },[]);

  useEffect(() => {
    const previousLanguage = localStorage.getItem('language');
    if (previousLanguage !== language) {
      setLanguage(language);
      localStorage.setItem('language', language);
    }
  }, [language]);
  
  return (
    <div className="mt-24 mx-28">
      <div className="mb-20">
        <input type="text"
              className="w-full h-14 pl-5 text-2xl text-black placeholder-slate-400 rounded-md
                focus:outline-primary
              "
              placeholder="Enter movie title ..."
              onChange={(e) => setMovieName(e.target.value)}
              value={movieName}
        />
      </div>
      <ItemsSearch
        data={data}
        onDateToYear={handleDateToYear}
        onLoading={isLoading}
        onError={isError}
        movieName={movieName}
      />
    </div>
  );
}

export default SearchField;