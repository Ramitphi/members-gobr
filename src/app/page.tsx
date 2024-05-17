import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import type { Metadata } from "next";

const NEXT_PUBLIC_URL = "https://55b7-103-59-75-29.ngrok-free.app";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Just Sendit ↗",
    },
  ],
  image: `${NEXT_PUBLIC_URL}/sendit.png`,

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
