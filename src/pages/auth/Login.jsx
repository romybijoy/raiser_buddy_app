import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/slices/UsersApiSlice";
import { setCredentials } from "../../redux/slices/AuthSlice";
import { toast } from "react-toastify";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { UserAuth } from "../../context/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { googleSignIn, facebookSignIn } = UserAuth();

  // 🔥 Submit
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter valid email");
      return;
    }

    if (password.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials(res));

      // 🔥 Use role from response
      if (res.role === "ADMIN") {
        toast.error("Invalid user credentials");
        return;
      }

      toast.success("Login successfully");
      navigate("/home");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  // 🔥 Google Login
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  // 🔥 Facebook Login
  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
      navigate("/home");
    } catch (error) {
      toast.error("Facebook login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler}>
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Forgot */}
          <div className="text-right mb-4">
            <Link to="/forgotPassword" className="text-blue-500 text-sm">
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Register */}
        <div className="mt-4 text-center text-sm">
          New Customer?{" "}
          <Link to="/signup" className="text-blue-500">
            Register
          </Link>
        </div>

        {/* Divider */}
        <div className="my-4 text-center text-gray-500">OR</div>

        {/* Social Login */}
        <div className="space-y-3">
          <GoogleLoginButton onClick={handleGoogleSignIn} />
          <FacebookLoginButton onClick={handleFacebookSignIn} />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
