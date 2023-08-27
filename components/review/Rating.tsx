"use client";

import React, { useState } from "react";
import "./Rating.css"; 

const Rating = ({
  initialRating,
  onChange,
}: {
  initialRating: number;
  onChange: (value: number) => void;
}) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value: number) => (
        <span
          key={value}
          className={value <= rating ? "star filled" : "star"}
          onClick={() => handleRatingChange(value)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
