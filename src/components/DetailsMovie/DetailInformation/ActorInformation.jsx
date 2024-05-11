import { memo, useEffect } from "react";
import {LazyLoadImage} from 'react-lazy-load-image-component';

import not_found from '../../../img/not_found.jpg';

function ActorInformation({ data, onLoading, onError }) {

  const limitActor = data.credits.cast.length / 3;

  if (onLoading) {
    return <p>Loading data actor...</p>;
  }

  if (onError) {
    return <p>Error fetching data actor</p>;
  }

  const handleError = (error) => {
    error.target.src = not_found;
  };

  return (
    <div className="w-full mb-20">
      <h3 className="text-lg text-white font-bold mb-3">Casts</h3>
      <div className="w-full grid grid-cols-5 gap-[90px]">
        {data && data.credits.cast.slice(0, limitActor).map((c, i) => {
          return (
            <div key={i} className="mb-6 h-[280px] cursor-pointer">
              <LazyLoadImage src={`https://image.tmdb.org/t/p/w185${c.profile_path}`} 
                onError={handleError}
                className="h-full bg-cover bg-center bg-no-repeat mb-3 rounded-lg"
              />
              <h3 className="text-white font-bold">{c.name}</h3>
              <h2 className="text-slate-400 text-sm">{c.character}</h2>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default memo(ActorInformation);