import { FaComments } from "react-icons/fa";

function Comments() {
  return (
    <div className="w-full text-white">
      <h1 className="flex items-center gap-2 text-xl"> <span><FaComments size={30}/></span> Comments</h1>
      <input type="text" 
        placeholder="Your comments ..."
        className="w-full rounded-lg mt-5 pt-2 pb-16 px-2 text-black"
      />
      <ul></ul>
    </div>
  );
}

export default Comments;