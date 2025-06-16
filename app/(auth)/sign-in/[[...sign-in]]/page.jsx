import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import img from "../../../../assets/Container.svg";
export default function Page() {
  return (
    <>
      <section className="overflow-hidden bg-gray-50 md:grid md:grid-cols-3 p-5 gap-8 flex flex-col-reverse items-center justify-center">
        <SignIn />

        <Image
          alt="Sign-Up"
          src={img}
          width={300}
          height={200}
          className=" w-full object-cover h-[80vh] col-span-2 -order-1 m-2"
        />
      </section>
    </>
  );
}
