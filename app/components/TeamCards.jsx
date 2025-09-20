import Image from "next/image";
import React from "react";

export default function TeamCards({ img, job, name }) {
  return (
    <div className="relative col-span-1 flex flex-col justify-center items-center m-2 p-2 text-center gap-2 bg-[#ffffff] shadow-sm rounded-sm border-2 border-transparent hover:border-[#007E85] transition-all">
      <Image
        src={img}
        alt="Team-member"
        width={120}
        height={90}
        className="rounded-full my-2"
      />
      <h1 className="text-[#007E85] text-2xl font-semibold">{name}</h1>
      <p className="text-[14px] font-semibold text-[#333333] capitalize">
        {job}
      </p>
      <p className="text-[#555555c4] text-sm">
        Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit
        pretium nulla sed enim iaculis mi.{" "}
      </p>
    </div>
  );
}
