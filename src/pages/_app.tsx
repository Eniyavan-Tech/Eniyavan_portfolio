import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";
import "@/styles/locomotive-scroll.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div lang={"en"} className="font-sans">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
