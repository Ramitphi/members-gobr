import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { init, validateFramesMessage } from "@airstack/frames";

import { NextRequest, NextResponse } from "next/server";
import { transferToken } from "../../utils/transfer";
import { Redis } from "@upstash/redis";
import getAddress from "../../utils/getAddress";

const NEXT_PUBLIC_URL = "https://members-gobr.vercel.app";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  init("1108ca72f6a414da788a0bd485866ca62");
  let accountAddress: string | undefined = "";
  const body: FrameRequest = await req.json();

  const { isValid, message } = await validateFramesMessage(body);
  const redis = new Redis({
    url: "https://needed-jaguar-51926.upstash.io",
    token: "AcrWAAIncDFkMTVmMTE5OWRjOWY0Y2FkYjA2Y2U5N2VhNzNhNmVlMHAxNTE5MjY",
  });

  console.log({ gg: message?.data.fid });

  const add = await getAddress(`${message?.data.fid}` || " ");
  if (isValid) {
    accountAddress = add;
    const randomAmount = Math.random() * 69;

    const past_date = await redis.get(accountAddress || "");
    console.log(past_date);
    const last_claim = (Date.now() - Number(past_date)) / 1000 / (60 * 60);
    console.log(last_claim);

    if (last_claim >= 12) {
      const success = await transferToken(accountAddress || "", randomAmount);
      console.log({ success });

      if (success) {
        const data = await redis.set(accountAddress || "", Date.now());

        return new NextResponse(
          getFrameHtmlResponse({
            buttons: [
              {
                label: `You recived ${randomAmount} $Member`,
              },
              {
                label: "Share as cast",
                action: "link",
                target:
                  "https://warpcast.com/~/compose?text=Claim%20$Member&embeds[]=https://members-gobr.vercel.app/",
              },
            ],
            image: `${NEXT_PUBLIC_URL}/members_success.png`,
            post_url: `${NEXT_PUBLIC_URL}/api/frame`,
          })
        );
      }
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: `Try Again`,
            },
          ],
          image: `${NEXT_PUBLIC_URL}/members.png`,
          post_url: `${NEXT_PUBLIC_URL}/api/frame`,
        })
      );
    } else {
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: `Try again in ${Math.floor(12 - last_claim)} Hours`,
            },
          ],
          image: `${NEXT_PUBLIC_URL}/members.png`,
          post_url: `${NEXT_PUBLIC_URL}/api/frame`,
        })
      );
    }
  }
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Auth Failed`,
        },
      ],
      image: `${NEXT_PUBLIC_URL}/failure.png`,
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
