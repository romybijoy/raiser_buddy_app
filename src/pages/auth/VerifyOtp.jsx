import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyOTP, regenerateOTP } from "../../redux/slices/UserSlice";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, loading, message } = useSelector((state) => state.app);

  // Timer logic (fixed dependency issue)
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;

        if (minutes > 0) {
          setMinutes((m) => m - 1);
          return 59;
        }

        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes]);

  

  // Submit OTP
  const submitHandler = async (e) => {
  e.preventDefault();

  if (!otp) {
    toast.error("Please enter OTP");
    return;
  }

  try {
    await dispatch(
      verifyOTP({ email: user?.email, otp })
    ).unwrap();

    // Only runs if success
    toast.success("OTP verified successfully");
    navigate("/login");

  } catch (err) {
    // Runs if API fails
    toast.error(err || "Invalid OTP");
  }
};
  // Resend OTP
  const resendOTP = () => {
    setMinutes(1);
    setSeconds(30);

    dispatch(regenerateOTP({ email: user?.email }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>

        {/* OTP Input */}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-center text-lg tracking-widest"
        />

        {/* Timer */}
        <div className="mb-4">
          {seconds > 0 || minutes > 0 ? (
            <p className="text-gray-600">
              Time Remaining:{" "}
              <span className="font-semibold">
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </p>
          ) : (
            <p className="text-gray-500">Didn't receive code?</p>
          )}
        </div>

        {/* Resend Button */}
        <button
          onClick={resendOTP}
          disabled={seconds > 0 || minutes > 0}
          className={`mb-4 text-sm ${
            seconds > 0 || minutes > 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-red-500"
          }`}
        >
          Resend OTP
        </button>

        {/* Submit Button */}
        <button
          onClick={submitHandler}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Verifying..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
