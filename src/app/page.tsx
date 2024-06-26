import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import type { Metadata } from "next";

const NEXT_PUBLIC_URL = "https://members-gobr.vercel.app";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Go Brrrrrrr",
    },
  ],
  image: `${NEXT_PUBLIC_URL}/members.png`,

  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: "ramit.xyz",
  description: "LFG",
  openGraph: {
    title: "ramit",
    description: "LFG",
    images: [`${NEXT_PUBLIC_URL}/success.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return <>gggg</>;
}
