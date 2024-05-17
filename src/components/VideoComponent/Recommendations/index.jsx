import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { memo } from "react";
import { useParams } from "react-router-dom";

function Recommendations() {
  const {movieId, dataType} = useParams();

  const fetchRecommendations = async () => {
    const apiUrl = `https://api.themoviedb.org/3/${dataType}/${movieId}/recommendations?api_key=92cd1c00191d7a87cc773c5ee643696c`

    const response = await axios.get(apiUrl);
    return response.data;
  };

  const {data, isLoading, isError} = useQuery({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false
  });

  return (
    <div className="bg-white w-full">
      Recommend
    </div>
  );
}

export default memo(Recommendations);