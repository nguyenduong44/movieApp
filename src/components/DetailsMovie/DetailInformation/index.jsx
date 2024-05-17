import { memo } from "react";
import ActorInformation from "./ActorInformation";
import DetailsVideos from "./DetailsVideos";

function DetailInformation({ data, onLoading, onError }) {

  if (onLoading) {
    return <p>Loading data...</p>;
  }

  if (onError) {
    return <p>Error fetching data</p>;
  }

  return (
    <div className="w-full bg-[#050b0a] py-9 px-28 mobile:px-9">
      <DetailsVideos/>
      <div className="text-slate-300 flex mb-16
      tablet:flex-col tablet:w-full mobile:flex-col mobile:w-full
      ">
        <div className="w-1/2 tablet:w-full tablet:mb-10 mobile:w-full mobile:mb-10">
          <h3 className="text-lg text-white font-bold mb-3">About</h3>
          <div className="flex mb-3 text-sm">
            <p className="w-[30%]">Genres</p>
            {data && data.genres && data.genres.map((genre, index) => {
              return <span key={genre.id} className={`${index !== 0 ? 'ml-3' : ''}`}>{genre.name}</span>
            })}
          </div>
          <div className="flex mb-3 text-sm">
            <p className="w-[30%]">Date</p>
            {data && <span>{data.release_date || data.first_air_date}</span>}
          </div>
          <div className="flex mb-3 text-sm">
            <p className="w-[30%]">Country</p>
            {data && <span>{data.origin_country[0]}</span>}
          </div>
          <div className="flex text-sm">
            <p className="w-[30%]">Rating</p>
            {data && <span>{data.vote_average}</span>}
          </div>
        </div>
        <div className="w-1/2 tablet:w-full mobile:w-full">
          <h3 className="text-lg text-white font-bold mb-3">Overview</h3>
          <p className="">{data && data.overview}</p>
        </div>
      </div>
      {!onLoading && !onError && data &&
        <ActorInformation data={data} onLoading={onLoading} onError={onLoading}/>
      }
      <div className="text-white">
        Reviews <br/>
        Work in proress ...
      </div>
      <div className="text-white">
        Reviews <br/>
        Work in proress ...
      </div>
      <div className="text-white">
        Reviews <br/>
        Work in proress ...
      </div>      
    </div>
  );
}

export default memo(DetailInformation);