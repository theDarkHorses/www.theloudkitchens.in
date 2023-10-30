"use client"
import { useState, useEffect } from "react";

export default function Page() {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const now = new Date();
    const targetDate = new Date("October 31, 2023 23:59:59");
    const timeDiff = targetDate.getTime() - now.getTime();
    setTimeLeft(Math.floor(timeDiff / 1000));

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000); // 1 second in milliseconds

    return () => clearInterval(intervalId);
  }, []);

  const days = Math.floor(timeLeft / 86400).toString().padStart(2, "0");
  const hours = Math.floor((timeLeft % 86400) / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="min-h-[calc(100vh_-_62px)] flex-col flex items-center justify-center bg-white">
      <p className="font-bold font-raleway text-6xl">{days} days,</p>
      <p className="font-medium font-lato text-2xl mt-3">{hours}:{minutes}:{seconds} <span className="text-primary font-bold">left until launch!</span></p>
    </div>
  );
}