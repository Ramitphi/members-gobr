import axios from "axios";

const getAddress = async (fid: string) => {
  const options = {
    headers: {
      accept: "application/json",
      api_key: "4F532532-1BE6-4A5C-9C83-C6B793F4FA02",
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
