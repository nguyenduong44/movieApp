import { useCallback } from "react";

import ContentSection from "./ContentSection";
import ItemList from "./ItemList";

import { FaHotjar } from "react-icons/fa";
import { TbStarsFilled } from "react-icons/tb";
import { PiTelevisionDuotone } from "react-icons/pi";

function Content() {
  const handleDateToYear = useCallback((date) => 
  {
    return date.slice(0,4);
  }, []);

  return (
    <div className="my-16 px-28">
      <ContentSection title="Popular" icon={<FaHotjar color="yellow" className="mr-2"/>}>
          <ItemList
            title="Popular"
            fetchUrl='popular?api_key=92cd1c00191d7a87cc773c5ee643696c'
            onDateToYear={handleDateToYear}
            dataType='movie'
          />
      </ContentSection>
      <ContentSection title="Top Rated" icon={<TbStarsFilled color="yellow" size={30} className="mr-2"/>}>
        <ItemList 
          title="Top Rated"
          fetchUrl='top_rated?api_key=92cd1c00191d7a87cc773c5ee643696c'
          onDateToYear={handleDateToYear}
          dataType='movie'
        />
      </ContentSection>
      <ContentSection title="TV Series" icon={<PiTelevisionDuotone color="yellow" size={30} className="mr-2"/>}>
        <ItemList 
          title="TV Series"
          fetchUrl='popular?api_key=92cd1c00191d7a87cc773c5ee643696c'
          onDateToYear={handleDateToYear}
          dataType='tv'
        />
      </ContentSection>
    </div>
  );
}

export default Content;