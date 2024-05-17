import { memo } from 'react';
import {LazyLoadImage} from 'react-lazy-load-image-component';

function Season({ movieData, isMovieError, isMovieLoading, selectedSeason, onSeasonClick }) {

  if (isMovieLoading) {
    return <div className="text-white">Loading Season Movies</div>;
  }

  if (isMovieError) {
    return <div className="text-white">Error Season Movies</div>;
  }

  return (
    <div className="w-[20%] h-[85vh] overflow-y-scroll
      tablet:w-[100%] tablet:h-auto tablet:grid tablet:grid-cols-5 tablet:gap-4
      mobile:w-[100%] mobile:h-100% mobile:grid mobile:grid-cols-4 mobile:gap-4
    ">
      {movieData?.seasons.map((season, index) => (
        index > 0 && (
          <div key={index}
            className={`w-[85%] h-1/5 flex gap-4 ${index !== 1 ? 'mt-4' : ''} text-white
              hover:text-primary-rgba hover:scale-95 hover:translate-x-2 duration-300 cursor-pointer
                 tablet:flex-col tablet:w-auto tablet:h-auto tablet:mt-3 tablet:translate-x-0
                 mobile:flex-col mobile:w-auto mobile:h-auto mobile:mt-3 mobile:translate-x-0
              ${selectedSeason === index ? 'text-lime-700 scale-95 translate-x-2' : ''}
            `}
            onClick={() => onSeasonClick(index)}
          >
            <LazyLoadImage src={`https://image.tmdb.org/t/p/w342${season.poster_path}`}
              className="h-full tablet:w-full inline object-contain rounded-md"
            />
            <div>
              <h1 className="text-xl font-bold mb-2 tablet:text-sm">{season.name}</h1>
              <h1 className="text-sm text-slate-300 tablet:hidden">Total Episode: {season.episode_count}</h1>
            </div>
          </div>
        )
      ))}
    </div>
  );
}

export default memo(Season);