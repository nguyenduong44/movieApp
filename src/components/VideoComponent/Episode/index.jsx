import { memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {LazyLoadImage} from 'react-lazy-load-image-component';

function Episode({ onEpisodeClick, seasonsData, selectedEpisode, isSeasonsError, isSeasonsLoading }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      }
    ]
  };

  if (isSeasonsLoading) {
    return <div className="text-white">Loading Episode Movies</div>;
  }

  if (isSeasonsError) {
    return <div className="text-white">Error Episode Movies</div>;
  }

  return (
    <Slider {...settings}>
      {seasonsData.episodes.map((episode, index) => {
        return (
            <div key={index} className={`w-full cursor-pointer
            hover:text-primary-rgba hover:scale-95 duration-300
            ${selectedEpisode === episode.episode_number ? 'text-lime-700 scale-95' : ''}
            `}
            onClick={() => onEpisodeClick(episode.episode_number)}
            >
              <LazyLoadImage src={`https://image.tmdb.org/t/p/w342${episode.still_path}`}
                className="w-full h-40 bg-cover bg-center mb-3 rounded-md mobile:h-28"
              />
              <h1 className="w-full whitespace-nowrap text-lg leading-7 line-clamp-1"
              >Episode {episode.episode_number}: {episode.name}</h1>
              <p className="text-sm mt-1 text-slate-400">{episode.runtime} mins</p>
            </div>
        )
      })}
    </Slider>
  );
}

export default memo(Episode);