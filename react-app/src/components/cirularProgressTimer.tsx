import React, { useState, useEffect } from "react";

const CIRCLE_SIZE = 150; // Adjust the size
const STROKE_WIDTH = 8;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// const TOTAL_TIME = 3 * 24 * 60 * 60; // Example: 3 days in seconds
const TOTAL_TIME = 60 * 2;

const CircularCountdownTimer = ({ time = TOTAL_TIME }) => {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Calculate time breakdown
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  // Determine how to display the time
  const timeDisplay =
    days > 0
      ? `${days}d ${hours}hr`
      : hours > 0
      ? `${hours}hr ${minutes}m`
      : minutes > 0
      ? `${minutes}m ${seconds}s`
      : `${seconds}s`;

  // Progress logic (starts full and shrinks to empty)
  const progress = timeLeft / time;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        width={CIRCLE_SIZE}
        height={CIRCLE_SIZE}
        viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
      >
        {/* Background Circle */}
        <circle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          stroke="lightgray"
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          stroke="blue"
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      {/* Time Left in Center */}
      <div
        style={{
          position: "absolute",
          fontSize: "18px",
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
        }}
      >
        {timeDisplay}
      </div>
    </div>
  );
};

export default CircularCountdownTimer;
