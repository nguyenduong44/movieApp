import PopularMovie from "./PopularMovie";
import TopRatedMovie from "./TopRatedMovie";
import TVSeries from "./TVSeries";
import { FaHotjar } from "react-icons/fa";
import { TbStarsFilled } from "react-icons/tb";
import { PiTelevisionDuotone } from "react-icons/pi";

function Content() {
  return (
    <div className="my-16 px-28">
      <div>
        <div className="flex justify-between items-center text-white mb-8">
          <h1 className="text-2xl font-extrabold flex items-center"> <FaHotjar color="yellow" className="mr-2"/> Popular</h1>
          <div className="bg-slate-600 h-px grow mx-4"></div>
          <h4 className="text-sm text-slate-300">See More</h4>
        </div>
        <PopularMovie />

        <div className="flex justify-between items-center text-white mb-8 mt-16">
          <h1 className="text-2xl font-extrabold flex items-center"> <TbStarsFilled color="yellow" size={30} className="mr-2"/> Top Rated</h1>
          <div className="bg-slate-600 h-px grow mx-4"></div>
          <h4 className="text-sm text-slate-300">See More</h4>
        </div>
        <TopRatedMovie />

        <div className="flex justify-between items-center text-white mb-8 mt-16">
          <h1 className="text-2xl font-extrabold flex items-center"> <PiTelevisionDuotone color="yellow" size={30} className="mr-2"/> TV Series</h1>
          <div className="bg-slate-600 h-px grow mx-4"></div>
          <h4 className="text-sm text-slate-300">See More</h4>
        </div>
        <TVSeries />
      </div>
    </div>
  );
}

export default Content;