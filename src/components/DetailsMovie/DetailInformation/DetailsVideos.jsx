import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function DetailsVideos() {

  const {movieId, dataType} = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchVideos = async() => {
    const apiUrl = `https://api.themoviedb.org/3/${dataType}/${movieId}/videos?api_key=92cd1c00191d7a87cc773c5ee643696c`;
    const response = await axios.get(apiUrl);
    return response.data;
  };

  const {data, isLoading, isError} = useQuery({
    queryKey:['videoTrailer'],
    queryFn: fetchVideos,
    retry: 3,
    retryDelay: 3000,
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return <div className="text-white">Loading Videos...</div>;
  }

  if (isError) {
    return <div className="text-white">Error loading videos</div>;
  }

  return (
    <div className="mb-16">
      <h3 className="text-lg text-white font-bold mb-3">Videos || Trailers</h3>
      <div className="flex flex-wrap gap-4">
        {data.results.map(video => (
          <div
            key={video.id}
            className="cursor-pointer p-2 border border-gray-400 rounded-md text-white hover:border-primary-rgba"
            onClick={() => setSelectedVideo(video)}
          >
            <p>{video.name}</p>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <div className="mt-4">
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideo.key}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[80vh]"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default DetailsVideos;