import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="py-8 md:py-4 p-4">{children}</div>
      <Footer />
    </>
  );
}
