import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { RiCompassDiscoverLine } from "react-icons/ri";

function HeaderSearch() {

  return (
    <div className="flex gap-3">
      <Link to={'/search'}>
        <div className="tablet:hidden mobile:hidden cursor-pointer px-3 py-1
          rounded-lg hover:bg-primary-rgba"
        >
         <BsSearch color="#fff" size={25}/>
        </div>
      </Link>

      <Link to={'/discover'}>
        <div className="tablet:hidden mobile:hidden cursor-pointer px-3 py-1
          rounded-lg hover:bg-primary-rgba"
        >
         <RiCompassDiscoverLine color="#fff" size={25}/>
        </div>
      </Link>
    </div>
  );
}

export default HeaderSearch;