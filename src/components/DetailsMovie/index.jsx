import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import { db, auth } from '../../firebase'; 
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

import DetailInformation from "./DetailInformation";

import { PiPlayCircleDuotone } from "react-icons/pi";
import { TbHeart } from "react-icons/tb";



function DetailsMovie() {
  const [playBtn, setPlayBtn] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteDocId, setFavoriteDocId] = useState(null);
  const {movieId, dataType} = useParams();
  const location = useLocation();
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en-US');

  const fetchItems = async (language) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${dataType}/${movieId}
      ?api_key=92cd1c00191d7a87cc773c5ee643696c&language=${language}&append_to_response=credits`
    );
    return response.data;
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: [movieId, language],  
    queryFn: () => fetchItems(language),
    retry: 3,
    retryDelay: 1000,
    staleTime: Infinity,
    cacheTime: Infinity
  });

  useEffect(() => {
    if(!isLoading && !isError)
    {
      window.scrollTo({top: 0, behavior: "instant"})
    }
  }, [isLoading,isError]);

  useEffect(() => {
    localStorage.setItem('Data', location.state)
  }, []);

  useEffect(() => {
    const previousLanguage = localStorage.getItem('language');
    if (previousLanguage !== language) {
      setLanguage(language);
      localStorage.setItem('language', language);
    }
  }, [language]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        try {
          const querySnapshot = await getDocs(collection(db, "users", userId, "favoriteMovies"));
          querySnapshot.forEach((doc) => {
            if (doc.data().movieId === movieId && doc.data().dataType === dataType) {
              setFavorite(true);
              setFavoriteDocId(doc.id);
            }
          });
        } catch (error) {
          console.error("Error retrieving favorite movies:", error);
        }
      }
    };
    checkFavorite();
  }, [movieId, dataType]);

  const handleFavoriteClick = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      if (favorite) {
        try {
          if (favoriteDocId) {
            await deleteDoc(doc(db, "users", userId, "favoriteMovies", favoriteDocId));
            setFavorite(false);
            setFavoriteDocId(null);
          } else {
            console.error("Favorite document ID is null");
          }
        } catch (e) {
          console.error("Error removing document: ", e);
        }
      } else {
        // Add to favorites
        try {
          const docRef = await addDoc(collection(db, "users", userId, "favoriteMovies"), {
            movieId,
            dataType
          });
          setFavorite(true);
          setFavoriteDocId(docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    } else {
      console.log("User is not logged in");
    }
  };


  if(isLoading)
  {
    return <div className="text-white">Loading Items Popular</div>
  }

  if(isError)
  {
    return <div className="text-white">Error Details</div>
  }

  return (
    <div>
      <div style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')`}}
      className="w-full h-[90vh] bg-cover bg-center bg-no-repeat relative from-[#050b0a]
        tablet:h-[100vh] mobile:h-[100vh]
      ">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050b0a]"
              style={{boxShadow: 'inset 0 72px 40px -7px rgba(0,0,0,0.3)'}}
        ></div>
        <Link to={`/${dataType}/${movieId}/videos`}>
          <PiPlayCircleDuotone color={playBtn ? '#CCFF00' : '#fff'} size={100}
            className="absolute opacity-65 cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300"
            onMouseEnter={() => setPlayBtn(true)}
            onMouseLeave={() => setPlayBtn(false)}
          />
        </Link>
        <div className="absolute left-28 mobile:left-9 bottom-14">
          <div>
            <h1 className="text-white font-extrabold text-4xl mb-5 mobile:text-xl">{data.title || data.name}</h1>
            <div className="flex items-center">
              <Link to={`/${dataType}/${movieId}/videos`}>
                <h1 className="text-white text-base border-none rounded-lg
                        bg-primary bg-opacity-65 px-4 py-2 cursor-pointer
                        hover:bg-opacity-80 duration-300
                ">
                    Watch Now
                </h1>
              </Link>
              <TbHeart color={favorite ? 'red' : '#fff'} size={30} className="mx-6 cursor-pointer duration-300 hover:scale-125"
                  onClick={handleFavoriteClick}
              />
            </div>
          </div>
        </div>
      </div>
      { !isLoading && !isError &&
        data && <DetailInformation data = {data}  onLoading={isLoading} onError={isError}
        />}
    </div>
  );
}

export default DetailsMovie;