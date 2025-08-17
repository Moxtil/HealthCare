import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return (
    <>
      <main className="min-h-screen flex md:flex-row justify-center items-center gap-6 p-5 overflow-hidden login">
        <section className="w-full">
          <SignIn forceRedirectUrl="/" />
        </section>
      </main>
    </>
  );
}
