import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logOut, isAuthenticated, user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-10 py-5 flex-col md:flex-row items-center justify-between">
        <span
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="/assets/favicon.png" alt="Drago" width={30} height={35} />
          <span className="ml-3 text-xl">DraGO</span>
        </span>

        <div
          className={`relative group ${
            isAuthenticated ? "flex" : "hidden"
          } cursor-pointer`}
        >
          <img
            src={
              user?.profilePic ? user?.profilePic : "/assets/profile_icon.png"
            }
            alt="profile"
            width={40}
            height={40}
            className="w-10 h-10 drop-shadow rounded-full"
          />
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="text-nowrap list-none m-0 p-2">
              <li className="text-sm py-1 px-2 cursor-pointer pr-10 bg-white rounded-md drop-shadow-sm hover:bg-zinc-200 hover:text-black">
                {user?.email}
              </li>
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
