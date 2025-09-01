// src/pages/About.jsx
import PageHeader from "../components/common/PageHeader";
import AboutHero from "../components/about/AboutHero";
import ReachUs from "../components/about/ReachUs";
import HomeAbout from "../components/common/About";
import Stats from "../components/common/Stats";
import Features from "../components/common/Features";
const About = () => {
  return (
    <div>
      <PageHeader
        title="About Us"
        image="/assets/page-header.jpg"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "About Us" },
        ]}
      />
        <HomeAbout />
       <Stats bgColor="bg-darkNavy" numberColor="text-cream" labelColor="text-cream" />
        <Features />
        <AboutHero />
        <ReachUs />

      {/* Rest of content */}
    </div>
  );
};

export default About;
