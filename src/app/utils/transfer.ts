import {
  Address,
  createPublicClient,
  createWalletClient,
  http,
  publicActions,
  parseEther,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

import abi from "./abi";

export const transferToken = async (
  recipient_address: string,

  amount: number
) => {
  const client = createPublicClient({
    chain: base,
    transport: http(
      "https://base-mainnet.g.alchemy.com/v2/rMYr-Rk_99PwVZE8cioxT0aXKskRXRu7"
    ),
  });

  const PRIVATE_KEY = process.env.PRIVATE_KEY as Address;
  const account = privateKeyToAccount(PRIVATE_KEY);

  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: http(
      "https://base-mainnet.g.alchemy.com/v2/rMYr-Rk_99PwVZE8cioxT0aXKskRXRu7"
    ),
  }).extend(publicActions);

  try {
    const { request } = await walletClient.simulateContract({
      account,
      address: "0xBa5B9B2D2d06a9021EB3190ea5Fb0e02160839A4",
      abi: abi,
      functionName: "transfer",
      args: [recipient_address, parseEther(`${amount}`)],
    });

    const res = await walletClient.writeContract(request);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
