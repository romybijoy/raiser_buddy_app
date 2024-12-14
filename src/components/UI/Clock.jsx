import React, { useState, useEffect } from "react";
import "../../styles/clock.css";

const Clock = () => {
 
    const calculateEndTime = () => {
      const endsTime = new Date();
      endsTime.setDate(endsTime.getDate() + 30);
      return endsTime;
    };

   // Function to calculate remaining time
  const calculateTimeLeft = (endTime) => {
    const now = new Date();
    const difference = endTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };


  const [endTime, setEndTime] = useState(calculateEndTime);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endTime));

   // Function to restart the timer
   const restartTimer = () => {
    setEndTime(calculateEndTime()); // Set a new end time 30 days from now
  };

  // Update the timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endTime);
      setTimeLeft(newTimeLeft);

      // If timer reaches zero, restart it
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        restartTimer(); // Automatically restart the timer
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  
  return (
    <div className="clock_wrapper d-flex align-items-center gap-3">
      <div className="clock_data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{timeLeft.days} </h1>
          <h5 className="text-white fs-6">Days</h5>
        </div>
        <span className="text-white fs-1">:</span>
      </div>
      <div className="clock_data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{timeLeft.hours} </h1>
          <h5 className="text-white fs-6">Hours</h5>
        </div>
        <span className="text-white fs-1">:</span>
      </div>
      <div className="clock_data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{timeLeft.minutes} </h1>
          <h5 className="text-white fs-6">Minutes</h5>
        </div>
        <span className="text-white fs-1">:</span>
      </div>
      <div className="clock_data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{timeLeft.seconds} </h1>
          <h5 className="text-white fs-6">Seconds</h5>
        </div>
      </div>
    </div>
  );
};

export default Clock;
