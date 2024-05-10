import { useEffect, useState } from "react";

import { IoIosWater } from "react-icons/io";

import HeaderItems from './HeaderItems'
import HeaderSearch from './HeaderSearch'
import HeaderLanguages from './HeaderLanguages'
import HeaderAccount from './HeaderAccount'


function Header() {
  const [color, setColor] = useState(false);

  const handleScroll = () => {
    if(window.scrollY >= 50){
      setColor(true);
    }
    else{
      setColor(false);
    }
  }
  window.addEventListener('scroll', handleScroll)

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [color]);

  return (
    //#32332c bg-lime-950
    <div className={`bg-transparent fixed top-0 w-full h-10 px-9 py-8 z-10
      transition-colors duration-500 ${color !== false ? 'bg-green-950 bg-opacity-70' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between w-full h-full">
        <h1 className="text-[#fff] text-[28px] tracking-[0.2em] leading-6 flex items-center font-extrabold font-dancing">
          Phim<br/>Swim<IoIosWater color="#CCFF00"/>
        </h1>
        <HeaderItems />
        <div className="flex flex-initial justify-between items-center">
          <HeaderSearch />
          <HeaderLanguages />
          <HeaderAccount />
        </div>
      </div>
    </div>
  );
}

export default Header;