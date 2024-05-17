import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { memo } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {LazyLoadImage} from 'react-lazy-load-image-component';

function Recommendations() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      focusOnSelect: true,
      autoplay: true,
      autoplaySpeed: 4000
    };
  const {movieId, dataType} = useParams();

  const fetchRecommendations = async () => {
    const apiUrl = `https://api.themoviedb.org/3/${dataType}/${movieId}/recommendations?api_key=92cd1c00191d7a87cc773c5ee643696c`

    const response = await axios.get(apiUrl);
    return response.data;
  };

  const {data, isLoading, isError} = useQuery({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return <div className="text-white">Loading Episode Movies</div>;
  }

  if (isError) {
    return <div className="text-white">Error Episode Movies</div>;
  }

  return (
    <div className="w-1/2 h-auto tablet:w-full mobile:w-full">
      <h1 className="text-white text-2xl mb-6 pl-3">Recommend for you</h1>
      <Slider {...settings}>
        {data?.results.slice(0,6).map((recommend, index) => 
          (<Link to={`/details/${dataType}/${recommend.id}`} key={index} className="w-1/2">
            <LazyLoadImage src={`https://image.tmdb.org/t/p/w342${recommend.poster_path}`}
              className="w-full bg-cover bg-center mb-3 rounded-md"
            />
            <h1 className="text-white">{recommend.title || recommend.name}</h1>
          </Link>)
        )}
      </Slider>
    </div>
  );
}

export default memo(Recommendations);