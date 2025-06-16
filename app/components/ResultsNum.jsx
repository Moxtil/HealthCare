import React from "react";

export default function ResultsNum({ num, perc, title }) {
  return (
    <div className="flex flex-col justify-center items-center gap-1 font-semibold col-span-1 m-2">
      <h1 className="text-[#007E85] text-3xl">
        {num}
        <span className="text-[#007e8584]">{perc}</span>
      </h1>
      <p className="text-[#333333]">{title}</p>
    </div>
  );
}
