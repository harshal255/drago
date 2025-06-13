import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getTaskById as getTaskByIdClient,
  updateTask as updateTaskClient,
} from "../api/task";

const UpdateTask = () => {
  const { task_id } = useParams();
  const initialFormData = {
    title: "",
    description: "",
    dueDate: "",
    priority: 1,
    task_id,
  };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTaskbyId = async () => {
    try {
      const res = await getTaskByIdClient(task_id);
      const { data } = res;
      setFormData({
        ...formData,
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: data.dueDate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await updateTaskClient(formData);
      const { message } = res;
      toast.success(message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (task_id) {
      getTaskbyId();
    }
  }, [task_id]);

  return (
    <div className="py-12 max-w-xl mx-auto divide-y md:max-w-4xl">
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
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
