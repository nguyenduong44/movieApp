import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

  return (
    <ul className="flex">
      {items.map((item, index) => {
        return (
          <li key={index} className={`text-[#FFF] font-medium relative 
                                      ${currentIndex === index && 'underline underline-offset-8'}
                                      hover:text-primary-rgba duration-300
                                      `}
                                      onClick={() => handleClick(index)} 
                                      >
            {index !== 0 && <div className="absolute left-0 top-[6px] h-3/6 border-l border-white opacity-60"
            style={{width: '1px'}}></div>}
            <Link to={item.path}>
              <span className="mx-9 cursor-pointer">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default HeaderItems;