import { useEffect, useState } from "react";
import { IoEarth } from "react-icons/io5";

function HeaderLanguages() {

  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en-US');
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const previousLanguage = localStorage.getItem('language');
    if (previousLanguage !== language) {
      setLanguage(language);
      localStorage.setItem('language', language);
      window.location.reload();
    }
  }, [language]);

  return (
    <div className="flex items-center mx-4 tablet:hidden mobile:hidden">
      <IoEarth color="#CCFF00"/>
      <h3 className="ml-1 text-white cursor-pointer rounded-md px-2 py-1 relative
        hover:bg-primary-rgba"
        onMouseEnter={() => setDisplay(true)}
        onMouseLeave={() => setDisplay(false)}  
      >
        {language === 'en-US' ? 'EN' : 'VI'}
        <div className={`text-white absolute z-10 top-[120%] left-0 w-24
              ${display ? 'block' : 'hidden'}
        `}>
          <div className="w-full bg-gray-900 px-2 py-1 hover:bg-primary-rgba"
            onClick={() => setLanguage('en-US')}
          >
            English
          </div>
          <div className="w-full bg-gray-900 px-2 py-1 hover:bg-primary-rgba"
            onClick={() => setLanguage('vi-VN')}
          >
            Tiếng Việt
          </div>  
          <span className="before:content-[' '] before:block before:w-full before:h-3 
          before:bg-transparent before:absolute before:top-[-10px]"> 
          </span>
        </div>
      </h3>
    </div>
  );
}

export default HeaderLanguages;