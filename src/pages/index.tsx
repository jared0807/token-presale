import Head from "next/head";
import Image from "next/image";
import insightxlogo from "/public/insightxlogo.svg";

import type { GetServerSidePropsContext } from "next";
import { useMemo, useState, useEffect } from "react";
import {
  useAccount,
  useBalance,
  useChainId,
  useReadContract,
  usePublicClient,
  useWalletClient,
  useWriteContract,
} from "wagmi";

import { parseEther, formatEther } from "ethers";
import BuySaleABI from "../context/abi/BuySaleABI.json";
import { Address } from "viem";

import { Oval } from "react-loader-spinner";
interface HomeProps {
  userAgent: string | string[] | undefined;
}

const Home: React.FC<HomeProps> = () => {
  const [FTMAmount, setFTMAmount] = useState(0);
  const [curFTMBalance, setCurFTMBalance] = useState<Object>();
  const [isBuy, setIsBuy] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient: any = usePublicClient();

  const curBalance = useBalance({
    address: address,
  });

  useEffect(() => {
    if (!curBalance) return;
    setCurFTMBalance(curBalance.data?.formatted);
  }, [curBalance, walletClient]);

  const buyTokens = async () => {
    setIsBuy(true);
    if (!walletClient) return;
    try {
      const res = await walletClient.writeContract({
        abi: BuySaleABI,
        address: process.env.NEXT_PUBLIC_BUYSALE_ADDR as Address,
        functionName: "buyTokens",
        value: parseEther(FTMAmount.toString()),
      });
      await publicClient.waitForTransactionReceipt({ hash: res });
    } catch (e) {
      console.log(e);
    }

    setIsBuy(false);
  };
  return (
    <>
      {/* Render particles */}
      <Head>
        <title>TokenPresale</title>
        <meta name="description" content="TokenPresale" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative bg-gradient-to-b from-[#1b1b1ba1] to-[#0d0d0e4b]">
        <section
          id="hero"
          className="animate__animated animate__fadeIn flex h-screen w-full flex-col items-center justify-center px-4 sm:px-8 md:px-16"
        >
          {/* Logo */}
          <div className="swap-caption">
            <div className="flex flex-wrap justify-center text-center text-[32px] text-white lg:text-[60px]">
              Swap your FTM&nbsp;<div>for GAIA</div>
            </div>
            {/* <span className="inter mt-8 hidden flex-wrap justify-center text-[19px] lg:flex">
              <div className="text-white">
                Clean up your wallet and swap your dust for
              </div>{" "}
              &nbsp;
              <div className="font-bold text-white">D-UST.</div>&nbsp;
              <div className="text-[#E27714]">
                Millions of dollars have just been unlocked.
              </div>
            </span> */}
          </div>
          <div className="inter swap-platform mt-4 w-full max-w-[560px] rounded-[25px] border-[1px] border-[#242424] bg-[#131313] px-4 pb-5 lg:mt-14">
            <div className="flex justify-center px-3 py-6 text-[17px] font-medium text-white"></div>
            <div className={`flex flex-col gap-5`}>
              <div className="w-full rounded-[15px] bg-[#1B1B1B] px-6 py-3">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full border-none bg-transparent py-4 text-[20px] text-[#D9D9D9] outline-none"
                    placeholder="Please enter amount FTM for buying GAIA"
                    onChange={(e) => {
                      setFTMAmount(Number(e.target.value));
                    }}
                  ></input>
                </div>
              </div>
              <div className="px-2 text-white">
                Your Balance: {Number(curFTMBalance).toFixed(3)} FTM
              </div>{" "}
              <div className="w-full">
                <button
                  className={`flex w-full cursor-pointer justify-center rounded-[15px] bg-[#E27714] py-6 text-white hover:bg-[#995415]`}
                  onClick={() => {
                    buyTokens();
                  }}
                >
                  {isBuy ? (
                    <Oval
                      visible={true}
                      height="40"
                      width="40"
                      color="#ffffff"
                      secondaryColor="#dedede"
                      ariaLabel="oval-loading"
                    />
                  ) : (
                    " Buy GAIA"
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="py-8 text-center text-[15px] text-white">{``}</div>
        </section>
      </main>
    </>
  );
};

// Add getServerSideProps to get the user agent
// eslint-disable-next-line @typescript-eslint/require-await
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userAgent = context.req.headers["user-agent"] ?? "unknown";

  return {
    props: {
      userAgent,
    },
  };
}

export default Home;
