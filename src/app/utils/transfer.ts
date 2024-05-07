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
      address: "0x7d89E05c0B93B24B5Cb23A073E60D008FEd1aCF9",
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
