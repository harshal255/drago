import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logOut, token } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <span
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Trello Clone</span>
        </span>

        <div className={`relative group ${token ? "flex" : "hidden"}`}>
          <div className="h-10 w-10 rounded-full bg-green-500"></div>
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
            <ul className="text-nowrap list-none m-0 p-2">
              <li
                onClick={() => navigate("/add-board")}
                className="py-1 px-2 cursor-pointer pr-10 bg-white rounded-md text-sm drop-shadow-sm hover:bg-zinc-200 hover:text-black"
              >
                Board List
              </li>
              <li
                onClick={() => logOut()}
                className="py-1 px-2 cursor-pointer pr-10 bg-white rounded-md text-sm drop-shadow-sm hover:bg-zinc-200 hover:text-black"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
