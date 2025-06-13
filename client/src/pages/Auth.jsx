import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const intialFormData = { email: "", password: "" };
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState(intialFormData);
  const { loginUser, registerUser, token } = useContext(AppContext);
  const navigate = useNavigate();
  console.log("CTX:", registerUser, loginUser);

  const selectAuth = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(isLogin, formData);
    if (isLogin) {
      await loginUser(formData);
    } else {
      await registerUser(formData);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="text-normal font-medium text-green-600 text-center text-4xl my-5">
          {isLogin ? "Login with your Credentials" : "Register Your Account"}
        </h1>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={selectAuth}
            disabled={!!isLogin}
            className={`${
              !isLogin && "opacity-50"
            } text-white duration-500 bg-green-600 px-5 py-2 outline-0 rounded-lg hover:bg-green-700 cursor-pointer`}
          >
            Login
          </button>
          <button
            onClick={selectAuth}
            disabled={!isLogin}
            className={`${
              isLogin && "opacity-50"
            } text-white duration-500 bg-green-600 px-5 py-2 outline-0 rounded-lg hover:bg-green-700 cursor-pointer`}
          >
            Signup
          </button>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                {isLogin ? "Login " : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
