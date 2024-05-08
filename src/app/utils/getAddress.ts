import axios from "axios";

const getAddress = async (fid: string) => {
  const options = {
    headers: {
      accept: "application/json",
      api_key: "9269D1DF-9073-4D62-96AD-E8AA03CD9C12",
    },
  };

  const { data } = await axios.get(
    `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
    options
  );
  console.log({ g: data.users[0].verifications[0] });
  return (
    data.users[0].verifications[0] ||
    "0x4C4926B2d1feFa7CceC2888ffCA1e2db98BC42A4"
  );
};

export default getAddress;
