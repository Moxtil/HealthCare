"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from "../../assets/Google.svg";
import img2 from "../../assets/Pinterest.svg";
import img3 from "../../assets/Twitch.svg";
import img4 from "../../assets/Vector.svg";
import img5 from "../../assets/Webflow.svg";
import img6 from "../../assets/YouTube.svg";
import Image from "next/image";
const items = [
  { id: 1, imgSrc: img1 },
  { id: 2, imgSrc: img2 },
  { id: 3, imgSrc: img3 },
  { id: 4, imgSrc: img4 },
  { id: 5, imgSrc: img5 },
  { id: 6, imgSrc: img6 },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};

const CarouselComponent = () => {
  return (
    <div className="w-full py-10 px-4">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        showDots
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        containerClass="carousel-container w-full my-1 bg-[#ffffff] p-5 shadow-sm"
        dotListClass="custom-dot-list-style"
        itemClass="px-2"
      >
        {items.map((item) => (
          <Image
            width={150}
            height={100}
            key={item.id}
            src={item.imgSrc}
            alt="Icon"
            className="w-full object-contain max-w-[100px] ml-8 md:ml-15"
          >
            {item.title}
          </Image>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
