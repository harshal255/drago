import { useContext, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {
  addBoard as addBoardClient,
  deleteBoard as deleteBoardClient,
} from "../api/board";

const AddBoard = () => {
  const { boards, getAllBoards } = useContext(AppContext);
  const [formData, setFormData] = useState({ title: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addBoard = async (e) => {
    e.preventDefault();
    try {
      const res = await addBoardClient(formData);
      const { message } = res;
      toast.success(message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBoard = async (board_id) => {
    try {
      const res = await deleteBoardClient(board_id);

      const { message } = res;
      toast.success(message);
      getAllBoards();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-12 max-w-xl mx-auto divide-y md:max-w-4xl">
      <h2 className="text-2xl font-bold">
        {boards?.length < 1 && "It's like you have not added board yet,"} Create
        Board
      </h2>
      <div className="mt-8 max-w-md">
        <form onSubmit={addBoard} className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-gray-700">Title</span>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              autoComplete="title"
              className="w-full mt-1 p-3 block rounded-md bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0 outline-0 border-gray-500 border-2"
              placeholder="Enter Board Name"
            />
          </label>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add Board
          </button>
        </form>
      </div>
      <h2 className="text-2xl font-bold my-5">List of Board</h2>
      <div className="flex flex-col gap-3">
        {boards?.map((ele) => {
          return (
            <div
              key={ele.id}
              className="p-5 bg-gray-300 rounded-lg flex justify-between"
            >
              {ele.title}
              <div className="flex gap-3 items-center">
                <span className="cursor-pointer">
                  <MdDeleteOutline
                    className="cursor-pointer hover:scale-110 duration-300"
                    onClick={() => deleteBoard(ele.id)}
                  />
                </span>
                <span className="cursor-pointer">
                  <FaEdit
                    className="cursor-pointer hover:scale-110 duration-300"
                    onClick={() => navigate(`/update-board/${ele.id}`)}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddBoard;
