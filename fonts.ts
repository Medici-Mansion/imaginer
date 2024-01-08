import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const fonts = { roboto };
export default fonts;
