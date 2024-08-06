import { FrameMetadata } from "@coinbase/onchainkit/frame";
const NEXT_PUBLIC_URL = "https://ffab-103-59-75-116.ngrok-free.app";

// export const metadata: Metadase clientta = {
//   title: "ramit.xyz",
//   description: "LFG",
//   openGraph: {
//     title: "ramit",
//     description: "LFG",
//     images: [`${NEXT_PUBLIC_URL}/success.png`],
//   },
//   other: {
//     ...frameMetadata,
//   },
// };

// export default function Home() {
//   return <>gggg</>;
// }

export default function HomePage() {
  return (
    <FrameMetadata
      buttons={[
        {
          label: "Go Brrrrrrr",
        },
      ]}
      image={`${NEXT_PUBLIC_URL}/members.png`}
      post_url={`${NEXT_PUBLIC_URL}/api/frame`}
    />
  );
}
