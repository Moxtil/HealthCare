"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import { usePathname } from "next/navigation";
import Image from "next/image";
import icon from "../../assets/icon.svg";
import { UserButton, useUser } from "@clerk/nextjs";
import { AuthContext } from "../context/AuthContext";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Appointment", href: "/appointment" },
  { name: "Contact", href: "/contact" },
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { role } = useContext(AuthContext);
  const path = usePathname();

  return (
    <header className="relative w-full max-w-full z-50 border-b border-gray-400 bg-white">
      <div className=" mx-auto px-3 py-4 flex justify-between items-center w-full">
        <Link
          href={"/home"}
          className={`text-2xl font-bold cursor-pointer flex items-center -translate-y-0.5 gap-1`}
        >
          <Image src={icon} width={45} height={45} alt="HealthCare" />
          <h2 className="font-semibold text-xl text-[#007E85]">
            Health<span className="text-[#6EAB36]">Care</span>
          </h2>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-[#007E85] font-semibold text-[15px] transition ${
                path.includes(link.href)
                  ? "text-[#007E85] border-b-2 border-[#007E85]"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        {user ? (
          <div className="hidden md:flex items-center gap-3">
            {role !== "admin" && (
              <Link href={`/${role}-chat`}>
                <IoChatbubbleEllipsesOutline
                  color={path === `/${role}-chat` ? "green" : "black"}
                  size={25}
                />
              </Link>
            )}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonPopoverCard: "shadow-lg border border-gray-200",
                  userButtonAvatarBox: "ring-2 ring-blue-500 w-[50px] h-[50px]",
                },
              }}
            />
          </div>
        ) : (
          <div className=" items-center gap-4 hidden md:flex">
            <Link
              className="group relative inline-flex items-center overflow-hidden rounded-sm bg-[#007E85] px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
              href="/sign-in"
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="size-5 shadow-sm rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              <span className="text-sm font-medium transition-all group-hover:me-4">
                Login
              </span>
            </Link>
            <Link
              className="group relative inline-flex items-center overflow-hidden rounded-sm border border-current px-8 py-3 text-[#007E85] focus:ring-3 focus:outline-hidden"
              href="/sign-up"
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="size-5 shadow-sm rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              <span className="text-sm font-medium transition-all group-hover:me-4">
                Sign Up
              </span>
            </Link>
          </div>
        )}

        {/* Mobile menu button */}
        <div className="flex items-center gap-6 md:hidden">
          {user ? (
            <>
              {role !== "admin" && (
                <Link href={`/${role}-chat`}>
                  <IoChatbubbleEllipsesOutline
                    color={path === `/${role}-chat` ? "green" : "black"}
                    size={25}
                  />
                </Link>
              )}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonPopoverCard: "shadow-lg border border-gray-200",
                    userButtonAvatarBox:
                      "ring-2 ring-blue-500 w-[50px] h-[50px]",
                  },
                }}
              />
            </>
          ) : (
            <Link
              className="w-full group relative inline-flex items-center overflow-hidden rounded-sm bg-[#007E85] px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
              href="/sign-in"
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="size-5 shadow-sm rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              <span className="text-sm font-medium transition-all group-hover:me-4">
                Login
              </span>
            </Link>
          )}
          <button
            className=" text-gray-700"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <CiMenuBurger color="#222" size={28} />
            ) : (
              <CiMenuFries color="#222" size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-screen w-64 bg-[#232323] border-r-2 text-white border-white shadow-lg z-40 flex flex-col items-start p-6 md:hidden"
          >
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`mb-4 text-lg hover:text-gray-400 transition tracking-widest ${
                  path.includes(link.href)
                    ? "text-[#ffffff] border-b-2 border-[#ffffff]"
                    : ""
                } `}
              >
                {link.name}
              </Link>
            ))}
            <div className=" items-center gap-4 flex flex-col ">
              {!user && (
                <Link
                  className="group w-full relative inline-flex items-center overflow-hidden rounded-sm border border-current px-8 py-3 text-[#007E85] focus:ring-3 focus:outline-hidden"
                  href="/sign-up"
                >
                  <span className="absolute -end-full transition-all group-hover:end-4">
                    <svg
                      className="size-5 shadow-sm rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>

                  <span className="text-sm font-medium transition-all group-hover:me-4">
                    Sign Up
                  </span>
                </Link>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
