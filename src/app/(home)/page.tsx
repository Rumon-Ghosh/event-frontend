import Banner from "@/components/home/Banner";
import Testimonials from "@/components/home/testimonials";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Testimonials></Testimonials>
    </>
  );
}
