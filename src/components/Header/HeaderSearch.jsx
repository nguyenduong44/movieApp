import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function HeaderSearch() {
  
  return (
    <div className="tablet:hidden mobile:hidden">
      <input 
      placeholder="Search..."
      className="px-2 py-1 font-semibold placeholder-gray-400 text-black rounded-2xl border-none 
      ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 focus:outline-none"
      />
    </div>
  );
}

export default HeaderSearch;