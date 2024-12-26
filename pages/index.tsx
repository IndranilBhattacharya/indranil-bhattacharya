// pages/index.tsx
import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import dynamic from "next/dynamic";

// Import our Portfolio Layout with a loading state
const PortfolioLayout = dynamic(() => import("@/components/Portfolio/Layout"), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-white text-xl animate-pulse">
        Loading experience...
      </div>
    </div>
  ),
});

const Home: NextPage = () => {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Enable smooth scrolling using CSS
    document.documentElement.style.scrollBehavior = "smooth";

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <>
      <Head>
        <title>Your Name | Creative Developer Portfolio</title>
        <meta
          name="description"
          content="Portfolio showcasing creative development work, interactive experiences, and technical expertise."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph tags for better social sharing */}
        <meta property="og:title" content="Your Name | Creative Developer" />
        <meta
          property="og:description"
          content="Portfolio showcasing creative development and interactive experiences."
        />
        <meta property="og:type" content="website" />

        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="web development, creative developer, portfolio, interactive design"
        />
      </Head>

      <main className="bg-black text-white">
        <PortfolioLayout />
      </main>
    </>
  );
};

export default Home;
