import HomeHero from "../components/home/HomeHero";
import HomeAbout from "../components/common/About";
import Features from "../components/common/Features";
import Speakers from "../components/common/Speakers";
import Stats from "../components/common/Stats";
import Schedule from "../components/common/Schedule";
import WhyChooseUs from "../components/home/WhyChooseUs";
import RegisterForm from "../components/home/RegisterForm";
import BlogSection from "../components/home/BlogSection";
import Tickets from "../components/common/Tickets";
const Home = () => {
  return (
    <div>
      <HomeHero />
      <HomeAbout />
      <Features />
      <Speakers />
      <Stats bgColor="bg-cream" numberColor="text-darkNavy" labelColor="text-neutralDark" />
      <Schedule />
      <Tickets />
      <WhyChooseUs />
      <RegisterForm />
      <BlogSection />
      {/* Other home page sections can be added here */}
    </div>
  );
}

export default Home;