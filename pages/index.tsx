// pages/index.tsx
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

/**
 * Dynamically import HorizontalScroll component
 * We're importing the default export, so we don't need to specify a named import
 * The loading component provides a smooth transition while the main component loads
 */
const HorizontalScroll = dynamic(
  () => import("@/components/HorizontalScroll"),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full overflow-hidden min-h-screen bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl animate-pulse">
            Loading experience...
          </div>
        </div>
      </div>
    ),
  }
);

/**
 * Home page component
 * Provides the main layout and meta information for the page
 * Renders the HorizontalScroll component as its main content
 */
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Interactive Portfolio | Horizontal Scroll Experience</title>
        <meta
          name="description"
          content="An interactive portfolio showcasing work through an innovative horizontal scrolling experience"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-black">
        <HorizontalScroll />
      </main>
    </>
  );
};

export default Home;
