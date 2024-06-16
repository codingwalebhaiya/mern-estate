import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

function SignIn() {
  const [formData, setFormData] = useState({});
  //const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    //  by preventDefault-  to prevent refreshing the page when you submit form
    e.preventDefault();

    try {
     // setLoading(true);
      dispatch(signInStart());

      // use fetch method for form submitting
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message))
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message))
    }
  };
  
 
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg "
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg "
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:bg-opacity-95 disabled:opacity-80 "
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Do not have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700 hover:underline">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default SignIn;
