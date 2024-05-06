import { useEffect, useState } from "react";

import { IoIosWater } from "react-icons/io";

import HeaderItems from './HeaderItems'
import HeaderSearch from './HeaderSearch'
import HeaderLanguages from './HeaderLanguages'
import HeaderAccount from './HeaderAccount'


function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);



  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    //#32332c
    <header className={`bg-transparent fixed top-0 w-full h-10 px-9 py-8 z-10
      transition-colors duration-500 ${scrollPosition > 50 ? 'bg-[#34352c] bg-opacity-90' : 'bg-transparent'} 
    `}>
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
    </header>
  );
}

export default Header;