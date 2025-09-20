import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ServicesCard({ img, title }) {
  return (
    <article className="overflow-hidden rounded-lg shadow-sm  hover:shadow-lg col-span-1 border-2 border-transparent hover:border-[#007E85] transition-all">
      <Image alt="Service" src={img} className="h-56 w-full object-cover" />

      <div className="bg-white p-4 sm:p-6">
        <h4 className="block text-xs text-gray-500">Highest Expertise</h4>

        <h3 className="mt-0.5 text-2xl text-[#007E85]">{title}</h3>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          dolores, possimus pariatur animi temporibus nesciunt praesentium
          dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus
          soluta, voluptates neque explicabo tempora nisi culpa eius atque
          dignissimos. Molestias explicabo corporis voluptatem?
        </p>
      </div>
    </article>
  );
}
