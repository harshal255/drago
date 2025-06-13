import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { updateBoard as updateBoardClient } from "../api/board";

const UpdateBoard = () => {
  const { board_id } = useParams();
  const [formData, setFormData] = useState({ title: "", board_id });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const UpdateBoard = async (e) => {
    e.preventDefault();
    try {
      const res = await updateBoardClient(formData);
      const { message } = res;
      toast.success(message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-12 max-w-xl mx-auto divide-y md:max-w-4xl">
      <h2 className="text-2xl font-bold">Update Board</h2>
      <div className="mt-8 max-w-md">
        <form onSubmit={UpdateBoard} className="grid grid-cols-1 gap-6">
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
            Update Board
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBoard;
