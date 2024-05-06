import { FaGithubAlt, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import logo from  '../../img/logo.png' 
import { useState } from "react";

function Footer() {
  
  const [github, setGithub] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [linkein, setLinkedin] = useState(false);

  return (
    <footer className="w-full py-12 px-28 bg-[#0C1518] flex justify-between"
            style={{boxShadow: 'inset 0px 0px 100px rgba(0,0,0,1)'}}
    >
      <div className="flex flex-col justify-between w-1/2">
        <div>
          <img src={logo} alt="logo" className="h-40 w-h-40 mx-auto"/>
          <p className="text-[#8F9FA3] text-sm leading-6 font-semibold mt-6">
          Welcome to my first project with ReactJS! 
          This project is the result of relentless effort and hard work, 
          and I am very proud of it. During the construction of this project, 
          I learned a lot about ReactJS and other web technologies. 
          I hope you find this project as interesting and useful as I did during its creation.
           Thank you for visiting!
          </p>
          <h4 className="text-white mt-4 text-sm">More about us&#x2022;</h4>
        </div>

        <div className="flex justify-between mt-10">
          <div className="flex items-center">
            <a href="https://github.com/nguyenduong44"
              target="_blank"
              onMouseEnter={() => setGithub(true)}
              onMouseLeave={() => setGithub(false)}
            > <FaGithubAlt size={30} color={github ? '#CCFF00' : `#fff`} className="mr-5" /></a>
            <a href="https://www.linkedin.com/in/duong-nguyen-13b7b929a/?trk=opento_sprofile_topcard" 
              target="_blank"
              onMouseEnter={() => setLinkedin(true)}
              onMouseLeave={() => setLinkedin(false)}
            >
              <FaLinkedinIn size={30} color={linkein ? '#CCFF00' : `#fff`} className="mr-5" /></a>
            <a href="https://www.facebook.com/duong01062001"
              target="_blank"
              onMouseEnter={() => setFacebook(true)}
              onMouseLeave={() => setFacebook(false)}
            > 
            <FaFacebookF size={30} color={facebook ? '#CCFF00' : `#fff`} /></a>
          </div>
          <p className="text-[#8F9FA3] text-xs">© 2021 — Copyright <br/> All Rights reserved</p>
        </div>
      </div>

      <div className="flex flex-col flex-1 pl-[20%] justify-center">
        <div>
          <h1 className="text-white">Contact Us</h1>
          <p className="text-[#8F9FA3] text-sm">+84 378938307</p>
          <a href="mailto: nguyenduong1477@gmail.com" className="text-[#8F9FA3] no-underline text-sm">
            nguyenduong1477&#64;gmail&#8228;com
          </a>
        </div>
        <div className="mt-11">
          <h1 className="text-white">Location</h1>
          <p className="text-[#8F9FA3] text-sm">Tan Binh, Ho Chi Minh City</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;