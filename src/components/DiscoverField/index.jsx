import axios from "axios";
import { useQuery, useQueries } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ItemsDiscover from "./ItemsDiscover";

  function DiscoverField() {
    const [startDate, setStartDate] = useState('2001-11-16');
    const [type, setType] = useState('movie');
    const [endDate, setEndDate] = useState('');
    const [adult, setAdult] = useState(false);
    const [sortBy, setSortBy] = useState('popularity.desc');
    const [genres, setGenres] = useState('');

  const fetchItems = async ({startDate, endDate, adult, sortBy, genres, type}) => {
    const apiUrl = `
    https://api.themoviedb.org/3/discover/${type}?api_key=92cd1c00191d7a87cc773c5ee643696c&include_adult=${adult}&
    primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}
    &sort_by=${sortBy}&with_genres=${genres}
    `;
    const response = await axios.get(apiUrl);
    return response.data;
  };

  const fetchGenres = async () => {
    const genresApi = 'https://api.themoviedb.org/3/genre/movie/list?api_key=92cd1c00191d7a87cc773c5ee643696c';
    const response = await axios.get(genresApi);
    return response.data;
  };

  const {isLoading, isError, data: movieData} = useQuery({
    queryKey: ['discover', startDate, endDate, adult, sortBy, genres, type],
    queryFn: () => fetchItems({startDate, endDate, adult, sortBy, genres, type}),
    retry: 3,
    retryDelay: 1000,
  });

  const {data: genresData} = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    retry: 3,
    retryDelay: 1000,
    refetchInterval: false
  });

  

  const handleDateToYear = useCallback((date) => 
  {
    return date.slice(0,4);
  }, []);

  useEffect(() => {
    const currentPageJSON = localStorage.getItem('Data');
    const currentPage = JSON.parse(currentPageJSON)
    if (currentPage) {
      setStartDate(currentPage.startDate);
      setEndDate(currentPage.endDate);
      setType(currentPage.type);
      setAdult(currentPage.adult);
      setSortBy(currentPage.sortBy);
      setGenres(currentPage.genres);
      localStorage.removeItem('Data');
    }
  },[]);

  return (
    <div className="mt-24 mx-28">
      <div className="flex gap-8 mb-14">
        <div>
          <span className="text-white">From: </span>
          <DatePicker
            selected={startDate}
            dateFormat="yyyy-MM-dd"
            maxDate={endDate}
            placeholderText="Start Date"
            onChange={(date) => setStartDate(date.toISOString().slice(0,10))}
          />
        </div>
        <div>
          <span className="text-white">To: </span>
          <DatePicker
            selected={endDate}
            dateFormat="yyyy-MM-dd"
            minDate={endDate}
            placeholderText="End Date"
            onChange={(date) => setEndDate(date.toISOString().slice(0,10))}
          />
        </div>
        <div>
          <label className="text-white">Type: </label>
          <select
            name="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value='movie'>
              Movie
            </option>
            <option value='tv'>
              TV Shows
            </option>
          </select>
        </div>
        <div>
          <label className="text-white">Include Adult: </label>
          <select
            name="Adult"
            value={adult}
            onChange={(e) => setAdult(e.target.value)}
          >
            <option value={false}>
              False
            </option>
            <option value={true}>
              True
            </option>
          </select>
        </div>
        <div>
          <label className="text-white">Genres: </label>
          <select
            name="Genres"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
          >
            <option value=''>
              ---None---
            </option>
            {genresData?.genres.map((genre) => {
              return (
                <option value={genre.id} key={genre.id}>
                  {genre.name}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <label className="text-white">Sort by: </label>
          <select
            name="SortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value='popularity.desc'>
              Popular
            </option>
            <option value='vote_average.desc'>
              Vote Average
            </option>
            <option value='primary_release_date.desc'>
              Release Date
            </option>
          </select>
        </div>
      </div>
      <ItemsDiscover 
        data={movieData}
        onDateToYear={handleDateToYear}
        onLoading={isLoading}
        onError={isError}
        startDate={startDate}
        endDate={endDate}
        type={type}
        adult={adult}
        sortBy={sortBy}
        genres={genres}
      />
    </div>
  );
}

export default DiscoverField;