import { Link } from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import { CiStar } from "react-icons/ci";


function Item({ data, onDateToYear, onLoading, onError, page, category }) {

  if(onLoading)
  {
    return <div className="text-white">Loading Layout Category</div>
  }

  if(onError)
  {
    return <div className="text-white">Error Layout Category</div>
  }

  const dataLinkJSON = {
    page: page,
    category: category
  }

  const dataLink = JSON.stringify(dataLinkJSON);

  return (
    <div className="text-white grid grid-cols-5 gap-x-8 gap-y-10
      tablet:grid-cols-4 mobile:grid-cols-2
    ">
      {data && data.results.map((item, index) => {
        return (
          <Link to={`/details/movie/${item.id}`} state={dataLink} key={index}>
            <div className="col-span-1 relative hover:grayscale-[30%] cursor-pointer
            duration-500 ease-in-out hover:scale-110
            ">
              <LazyLoadImage 
                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`} 
                alt={item.title}
                className="rounded-lg mb-1"
              />
              <h2 className="line-clamp-1 text-lg
                tablet:text-sm mobile:text-sm
                ">{item.title || item.name}
              </h2>
              <p className="text-sm text-slate-400 font-light
                tablet:text-xs mobile:text-xs
                ">{onDateToYear(item.release_date || item.first_air_date)}
              </p>
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

export default Item;