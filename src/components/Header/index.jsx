import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";

import { IoIosWater } from "react-icons/io";

import HeaderItems from './HeaderItems'
import HeaderSearch from './HeaderSearch'
import HeaderLanguages from './HeaderLanguages'
import HeaderAccount from './HeaderAccount'


function Header() {
  const [color, setColor] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 200)
      {
        setColor(true);
      }else{
        setColor(false);
      }
    };

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll);
  }, [window.scrollY]);

  return (
    //#32332c bg-lime-950
    <div className={`bg-transparent fixed top-0 w-full h-10 px-9 py-8 z-10
      transition-colors duration-500 ${color ? 'bg-zinc-900 bg-opacity-90' : 'bg-[#32332c] bg-opacity-0'}`}
      >
      <div className="flex items-center justify-between w-full h-full">
        <Link to={`/`}
        className="text-[#fff] text-[28px] tracking-[0.2em] leading-6 flex items-center font-extrabold font-dancing cursor-pointer">
          Phim<br/>Swim<IoIosWater color="#CCFF00"/>
        </Link>
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

export default memo(Header);