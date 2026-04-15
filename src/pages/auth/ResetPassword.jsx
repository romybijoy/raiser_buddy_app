import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../../redux/slices/UserSlice";

const ResetPassword = () => {
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");

  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error("Please enter new password");
      return;
    }

    if (newPassword.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }

    try {
      await dispatch(
        resetPassword({ email, newPassword })
      ).unwrap();

      toast.success("Password reset successfully");

      navigate("/login");

    } catch (err) {
      toast.error(err || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={submitHandler}>

          {/* Email (Read-only) */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email || ""}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;