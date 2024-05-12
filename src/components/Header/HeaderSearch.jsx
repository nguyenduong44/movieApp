import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

function HeaderSearch() {

  return (
    <Link to={'/search'}>
      <div className="tablet:hidden mobile:hidden cursor-pointer px-3 py-1
        rounded-lg hover:bg-primary-rgba"
      >
       <BsSearch color="#fff" size={25}/>
      </div>
    </Link>
  );
}

export default HeaderSearch;