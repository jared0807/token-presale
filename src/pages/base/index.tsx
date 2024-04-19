// pages/dashboard/index.tsx
import Layout from "~/components/analytics/layout/layout";
import { motion } from "framer-motion";
import { useAccount, useBalance } from "wagmi";
import { useEffect, useState } from "react";
import type { CSSProperties } from "styled-components";
import { useRouter } from "next/router";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const Alerts = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  // isConnected = true, when user is connected
  // address = Logged inUser wallet address, otherwise undefined
  // https://wagmi.sh/ for more Web3 docs

  return (
    <div className="m-0 h-screen w-full overflow-x-hidden bg-gray-900 pb-4 lg:pt-16">
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {/*Do so everything wraps in max-width 1536px to easen sizes on large monitors*/}
        <div className="font-inter mx-auto flex h-auto w-full max-w-[520px] flex-col items-start gap-8 p-4">
          <p className="font-inter inline h-10 w-full text-center text-4xl font-[800] leading-10 text-white">
            Code
          </p>
        </div>
        <div className="font-inter mx-auto flex h-auto w-full  flex-col items-start gap-8 p-4">
          <p className="font-inter inline h-10 w-full text-center text-4xl font-[800] leading-10 text-white">
            {address}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Alerts;
