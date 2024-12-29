// pages/index.tsx
import PortfolioLayout from "@/components/main/Layout";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Your Name | Creative Developer Portfolio</title>
        <meta
          name="description"
          content="Portfolio showcasing creative development work, interactive experiences, and technical expertise."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Your Name | Creative Developer" />
        <meta
          property="og:description"
          content="Portfolio showcasing creative development and interactive experiences."
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="web development, creative developer, portfolio, interactive design"
        />
      </Head>
      {/* <ThemeToggle /> */}
      <PortfolioLayout />
    </>
  );
};

export default Home;
