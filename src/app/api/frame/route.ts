import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { transferToken } from "../../utils/transfer";
import { Redis } from "@upstash/redis";

const NEXT_PUBLIC_URL = "https://members-gobr.vercel.app";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = "";
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: "9269D1DF-9073-4D62-96AD-E8AA03CD9C12",
  });
  const redis = new Redis({
    url: "https://needed-jaguar-51926.upstash.io",
    token: "AcrWAAIncDFkMTVmMTE5OWRjOWY0Y2FkYjA2Y2U5N2VhNzNhNmVlMHAxNTE5MjY",
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
    const randomAmount = Math.random() * 69;

    const past_date = await redis.get(accountAddress);
    console.log(past_date);
    const last_claim = (Date.now() - Number(past_date)) / 1000 / (60 * 60);
    console.log(last_claim);

    if (last_claim >= 12) {
      const success = await transferToken(accountAddress, 1);
      console.log({ success });
      const data = await redis.set(accountAddress, Date.now());

      if (success) {
        return new NextResponse(
          getFrameHtmlResponse({
            buttons: [
              {
                label: `You recived ${randomAmount} $Member`,
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
