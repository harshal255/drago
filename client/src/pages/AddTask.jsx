import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { addTask as addTaskClient } from "../api/task";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/features/taskSlice";
import { fetchColumns } from "../redux/features/columnSlice";
import moment from "moment";

const AddTask = () => {
  const { column_id } = useParams();

  // console.log({ column_id });
  const initialFormData = {
    title: "",
    description: "",
    column_id,
    dueDate: moment(new Date()).format("YYYY-MM-DD"),
    priority: 1,
  };
  console.log({ initialFormData });

  const { boardId: defaultBoardId } = useSelector((state) => state.board);
  const { columns } = useSelector((state) => state.column);
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTask = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await addTaskClient(formData);
      const { message } = res;
      dispatch(fetchTasks(defaultBoardId));
      toast.success(message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (column_id) {
      setFormData({ ...formData, column_id });
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (defaultBoardId) {
        dispatch(fetchColumns(defaultBoardId));
      }
    })();
  }, [defaultBoardId]);

  return (
    <div className="py-12 max-w-xl mx-auto  md:max-w-4xl">
      <h2 className="text-2xl font-bold">Create Task</h2>
      <div className="mt-8 max-w-md">
        <form onSubmit={addTask} className="grid grid-cols-1 gap-6">
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
              className="mt-1 p-3 block w-full rounded-md bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0 outline-0 border-gray-500 border-2"
              placeholder=""
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Description</span>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              autoComplete="description"
              className="mt-1 p-3 block w-full rounded-md bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0 outline-0 border-gray-500 border-2"
              rows="2"
            ></textarea>
          </label>
          <label className="block">
            <span className="text-gray-700">Select Column</span>
            <select
              className="mt-1 p-3 block w-full rounded-md bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0 outline-0 border-gray-500 border-2"
              id="column_id"
              name="column_id"
              value={formData.column_id}
              onChange={handleChange}
              required
              autoComplete="column_id"
            >
              {columns.map((ele) => {
                return (
                  <option key={ele.id} value={ele.id}>
                    {ele.title}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Select Priory</span>
            <select
              className="mt-1 p-3 block w-full rounded-md bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0 outline-0 border-gray-500 border-2"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              autoComplete="priority"
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Due Date</span>
            <input
              type="date"
              className="mt-1 p-3 block w-full rounded-md bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0 outline-0 border-gray-500 border-2"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              autoComplete="dueDate"
            />
          </label>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
