import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import Layout from "~/components/analytics/layout/layout";
import { Web3Provider } from "../components/Web3Provider";
if (typeof window !== "undefined") {
  localStorage.setItem("theme", "dark");

  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  }
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Web3Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Provider>
  );
};

export default MyApp;
