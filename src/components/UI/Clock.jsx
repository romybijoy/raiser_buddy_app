import React, { useState, useEffect } from "react";

const Clock = () => {
  // ✅ Set target only once (no reset issues)
  const [endTime] = useState(() => {
    const time = new Date();
    time.setHours(time.getHours() + 5); // 🔥 5 hours offer
    return time;
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = endTime - now;

    if (difference <= 0) {
      return { expired: true };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.expired) {
    return <p className="text-red-300">Offer Expired</p>;
  }

  return (
    <div className="flex gap-4">

      {["hours", "minutes", "seconds"].map((unit) => (
        <div
          key={unit}
          className="bg-white/20 px-4 py-2 rounded-lg text-center min-w-[70px]"
        >
          <p className="text-xl font-bold">
            {String(timeLeft[unit]).padStart(2, "0")}
          </p>
          <span className="text-xs uppercase">{unit}</span>
        </div>
      ))}

    </div>
  );
};

export default Clock;