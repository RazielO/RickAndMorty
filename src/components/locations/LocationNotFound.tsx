import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

export const LocationNotFound = () => {
  return (
    <>
      <h1 className="text-6xl mt-8 mb-4 text-red-900 text-center">Error</h1>
      <h1 className="text-center text-4xl text-gray-100">
        The location you were looking for was not found
      </h1>
      <span className="text-2xl text-gray-100 flex items-center gap-2 justify-center my-4">
        <IoMdHome />
        <Link to="/"> Go Home</Link>
      </span>
    </>
  );
};
