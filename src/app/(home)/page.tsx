import Banner from "@/components/home/Banner";
import HowItWorks from "@/components/home/HowItWorks";
import LatestEvent from "@/components/home/LatestEvent";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/testimonials";

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <LatestEvent></LatestEvent>
      <Testimonials></Testimonials>
      <Newsletter></Newsletter>
    </>
  );
}
