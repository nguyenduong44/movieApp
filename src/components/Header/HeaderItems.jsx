import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdList } from "react-icons/io";

const items = [
  {
    label: 'HOME',
    active: true,
    path: '/',
    param: 'home'
  },
  {
    label: 'MOVIES',
    active: false,
    path: '/popular',
    param: 'popular'
  },
  {
    label: 'NOW PLAYING',
    active: false,
    path: '/now_playing',
    param: 'now_playing'
  },
  {
    label: 'UP COMING',
    active: false,
    path: '/upcoming',
    param: 'upcoming'
  }
]

function HeaderItems() {

  const {category} = useParams();
  const [currentIndex, setCurrentIndex] = useState(items.findIndex(item => item.param === category));
  const [displayItem, setDisplayItem] = useState(false);

  useEffect(() => {
    if(category)
    {
      setCurrentIndex(items.findIndex(item => item.param === category));
    }
    else {
      const isHome = window.location.pathname === '/';
      setCurrentIndex(isHome ? 0 : -1);
    }
  }, [category]);

  const handleClick = (index) => {
    setCurrentIndex(index);
  }

  const handleIconClick = () => {
    setDisplayItem(!displayItem);
  }

  return (
    <ul className="w-full">
      <div className="flex w-full items-end justify-center tablet:flex-col mobile:flex-col">
        {items.map((item, index) => {
          return (
            <li key={index} className={`text-[#FFF] font-medium relative
                                        ${currentIndex === index && 'underline underline-offset-8'}
                                        hover:text-primary-rgba duration-300
                                        tablet:px-16 tablet:py-1 tablet:my-1  tablet:bg-lime-950 tablet:bg-opacity-80
                                        tablet:rounded-3xl
                                        ${!displayItem && 'tablet:hidden mobile:hidden'} tablet:right-0 tablet:top-[174px]
                                        mobile:right-0 mobile:top-[173px] mobile:rounded-3xl
                                        mobile:px-10 mobile:py-1 mobile:my-1  mobile:bg-lime-950 mobile:bg-opacity-80
                                        `}
                                        onClick={() => handleClick(index)}
                                        >
              {index !== 0 && <div className="absolute tablet:hidden mobile:hidden left-0 top-[6px] h-3/6 border-l border-white opacity-60"
              style={{width: '1px'}}></div>}
              <Link to={item.path}>
                <h1 className="mx-9 cursor-pointer tablet:mx-0 tablet:my-4 tablet:text-center
                    mobile:mx-0 mobile:my-4 mobile:text-center
                ">{item.label}</h1>
              </Link>
            </li>
          );
        })}
        <IoMdList color="white" size={35} onClick={handleIconClick} 
           className={`desktop:hidden tablet:absolute tablet:top-4 tablet:right-5 tablet:mr-4
            mobile:absolute mobile:top-[14px] mobile:right-5 mobile:mr-2
           `}
        />
      </div>
    </ul>
  );
}

export default HeaderItems;