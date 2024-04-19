import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { CSSProperties } from "styled-components";
import PageLoader from "next/dist/client/page-loader";
import {
  StyledButton,
  StyledButtonAnalytics,
} from "~/components/connectKitButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import favicon from "../../../../icons/svg/favicon.png";

// Define the NavbarProps type
interface NavbarProps {
  isNavbarVisible?: boolean; // Make this prop optional
  toggleNavbar?: () => void; // Make this prop optional
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const Navbar: React.FC<{
  isNavbarVisible: boolean;
  toggleNavbar: () => void;
}> = ({ isNavbarVisible, toggleNavbar }) => {
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [pageLoaded, setIsPageLoading] = useState(false);

  /*Wallet Connect / Disconnect*/
  const { address, isConnecting, isConnected, isDisconnected } = useAccount();
  //disconnect
  const { disconnect, disconnectAsync } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
  };

  /*Loading spinner style*/
  const loadingDiv = <div></div>;

  /* Shorten ETH Address */
  function shortenEthAddress(address: string, visibleChars = 4) {
    const startChars = address.slice(0, visibleChars + 2); // Include "0x"
    const endChars = address.slice(-visibleChars);

    return startChars + "..." + endChars;
  }

  useEffect(() => {
    setIsPageLoading(true);
  }, []);
  //Navbar clicked outside
  // Close navbar if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        if (isNavbarVisible) {
          toggleNavbar?.();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNavbarVisible, toggleNavbar]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActivePageColor = (path: string) => {
    return router.pathname.includes(path)
      ? "bg-gray-900 rounded-md text-white"
      : "text-gray-500";
  };

  const isActiveSvgColor = (path: string) => {
    return router.pathname.includes(path) ? "#FFFFFF" : "#9CA3AF";
  };

  return (
    // Line 40: Added Tailwind classes
    <div
      ref={navbarRef}
      className={`fixed top-0 z-20 ${
        isNavbarVisible ? "block" : "hidden"
      } bg-black-800 w-64 text-white lg:block`}
    >
      <nav className={`flex h-screen flex-col overflow-y-auto`}>
        <div className="font-inter flex h-full w-64 flex-col bg-gray-800 text-left font-[600] text-gray-500 drop-shadow-lg">
          <div className="flex w-full flex-col items-start justify-between gap-5 self-stretch pt-5 [flex-grow:1]">
            <Link
              className="flex w-full items-start justify-center self-stretch py-1 pl-4 pr-4"
              href="/base"
            >
              <img src="/favicon.png" className="h-20 w-20" />
            </Link>
            {/* <div className="flex w-full flex-grow flex-col items-start gap-1 self-stretch px-2">
              <Link
                className={`font-inter inline-flex w-full items-center gap-3 self-stretch rounded-md py-2 pl-2 pr-3 text-left font-[500] transition-all ${isActivePageColor(
                  "/analytics"
                )}`}
                href="/analytics"
              >
                <div className="h-6 w-6">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="w-[74px] text-sm leading-5 transition-all">
                  Analytics
                </p>
              </Link>
              <Link
                className={`font-inter inline-flex w-full items-center gap-3 self-stretch rounded-md py-2 pl-2 pr-3 text-left font-[500] transition-all ${isActivePageColor(
                  "/tradewatch"
                )}`}
                href="/tradewatch"
              >
                <div className="h-6 w-6">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="w-[74px] text-sm leading-5 transition-all">
                  TradeWatch
                </p>
              </Link>
              <Link
                className={`font-inter inline-flex w-full items-center gap-3 self-stretch rounded-md py-2 pl-2 pr-3 text-left font-[500] transition-all ${isActivePageColor(
                  "/base"
                )}`}
                href="/exchange"
              >
                <div className="h-6 w-6">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.49768 2.49603L7.99831 3.99666L6.49768 5.49728"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.9983 3.99667H5.99747C4.33992 3.99667 2.99622 5.34038 2.99622 6.99792"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.5023 21.504L16.0017 20.0033L17.5023 18.5027"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.0017 20.0033H18.0025C19.6601 20.0033 21.0038 18.6596 21.0038 17.0021"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.499 20.0033C6.46016 20.0033 3.9967 17.5399 3.9967 14.501C3.9967 11.4622 6.46016 8.99875 9.499 8.99875C12.5378 8.99875 15.0013 11.4622 15.0013 14.501C15.0013 15.9603 14.4216 17.3599 13.3897 18.3917C12.3578 19.4236 10.9583 20.0033 9.499 20.0033"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.68756 13.4795L9.49889 12.6662V15.9155"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.68958 15.9175H10.3081"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.6102 5.66047C12.759 3.51169 16.2429 3.5117 18.3916 5.66048C20.5404 7.80926 20.5404 11.2931 18.3916 13.4419"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="w-[74px] text-sm leading-5 transition-all">
                  Exchange Center
                </p>
              </Link>
              <Link
                className={`font-inter inline-flex w-full items-center gap-3 self-stretch rounded-md py-2 pl-2 pr-3 text-left font-[500] transition-all ${isActivePageColor(
                  "/staking"
                )}`}
                href="/staking"
              >
                <div className="h-6 w-6">
                  <svg
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 3 12 L 5 10 M 5 10 L 12 3 L 19 10 M 5 10 V 20 C 5 20.552 5.448 21 6 21 H 9 M 19 10 L 21 12 M 19 10 V 20 C 19 20.552 18.552 21 18 21 H 15 M 9 21 C 9.552 21 10 20.552 10 20 V 16 C 10 15.448 10.448 15 11 15 H 13 C 13.552 15 14 15.448 14 16 V 20 C 14 20.552 14.448 21 15 21 M 9 21 H 15"
                      stroke={isActiveSvgColor("/analytics")}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="w-[74px] text-sm leading-5 transition-all">
                  Staking
                </p>
              </Link>

              <div className="pt-4">
                <div className="flex w-full flex-col items-start gap-1 self-stretch rounded-lg p-2 text-gray-600">
                  <div className="font-inter inline-flex w-full items-center gap-3 self-stretch rounded-md text-left font-[500] transition-all">
                    <div className="groupIcon h-[24px] w-[24px]" />
                    <p className="w-full text-sm leading-5 transition-all">
                      Jeet
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-col items-start gap-1 self-stretch rounded-lg p-2 text-gray-600">
                  <div className="font-inter inline-flex w-full items-center gap-3 self-stretch rounded-md text-left font-[500] transition-all">
                    <div className="productExchange h-[24px] w-[24px]" />
                    <p className="w-full text-sm leading-5 transition-all">
                      Degen
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-col items-start gap-1 self-stretch rounded-lg p-2 text-gray-600">
                  <div className="font-inter inline-flex w-full items-center gap-3 self-stretch rounded-md text-left font-[500] transition-all">
                    <div className="searchMoreGray h-[24px] w-[24px]" />
                    <p className="w-full text-sm leading-5 transition-all">
                      Discover
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-col items-start gap-1 self-stretch rounded-lg p-2 text-gray-600">
                  <div className="font-inter inline-flex w-full items-center gap-3 self-stretch rounded-md text-left font-[500] transition-all">
                    <div className="searchMoreGray h-[24px] w-[24px]" />
                    <p className="w-full text-sm leading-5 transition-all">
                      Rogue
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-col items-start gap-1 self-stretch rounded-lg p-2 text-gray-600">
                  <div className="font-inter inline-flex w-full items-center gap-3 self-stretch rounded-md text-left font-[500] transition-all">
                    <div className="searchMoreGray h-[24px] w-[24px]" />
                    <p className="w-full text-sm leading-5 transition-all">
                      Trading Terminal
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

            {/*New*/}
            <div className="w-full">
              <div className="font-inter inline-flex w-full flex-col items-start self-stretch bg-gray-800 text-left font-[500] text-white">
                <div className="h-px w-full bg-gray-700" />

                {!pageLoaded ? (
                  // If page is not loaded, show spinner
                  loadingDiv
                ) : isConnected ? (
                  // If page and useAccount are loaded and isConnected is true, show sign out button
                  <div className="flex w-full flex-col items-start gap-4 self-stretch pb-4 pt-4">
                    <div className="flex w-full flex-col items-start gap-4 self-stretch">
                      <div className="flex w-full items-center gap-2 self-stretch px-4">
                        <div className="flex flex-col items-start justify-center gap-2 [flex-grow:1]">
                          <div className="h-6 w-full gap-4">
                            <div className="flex flex-col items-start [flex-grow:1]">
                              <p className="font-inter inline h-6 w-[135px] text-left text-sm font-medium leading-tight text-white">
                                Connected Wallet
                              </p>
                            </div>
                          </div>
                          <div className="flex w-full flex-col items-start justify-center gap-2.5 self-stretch">
                            <div
                              className={`font-inter inline-flex items-center gap-2 rounded-[17px] bg-gray-900 py-[5px] pl-[11px] pr-[13px] text-left font-[500] text-gray-600 `}
                            >
                              <div className="flex h-6 w-6 items-center justify-center">
                                <div className="">
                                  <div className="wallet-default-white h-7 w-7" />
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  void navigator.clipboard
                                    .writeText(address || "")
                                    .then(() => {
                                      /*showAlert({
                                        type: "copy",
                                        message: "Copied to clipboard",
                                      });*/
                                    });
                                }}
                              >
                                <p className="w-[117px] text-base leading-4">
                                  {shortenEthAddress(address || "")}
                                </p>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full flex-col items-start gap-1 self-stretch px-4 transition-all">
                        {/*Account Settings*/}

                        <Link
                          className={`font-inter inline-flex w-full items-center gap-3 self-stretch rounded-md py-2 pl-2 pr-3 text-left font-[500] transition-all ${isActivePageColor(
                            "/settings"
                          )}`}
                          href="/settings"
                        >
                          <div className="h-6 w-6">
                            <svg
                              width="100%"
                              height="100%"
                              preserveAspectRatio="none"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M 14.121 9.879 C 15.293 11.05 15.293 12.95 14.121 14.121 C 12.95 15.293 11.05 15.293 9.879 14.121 C 8.707 12.95 8.707 11.05 9.879 9.879 C 11.05 8.707 12.95 8.707 14.121 9.879"
                                stroke={isActiveSvgColor("/settings")}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M 16.18 18.725 V 18.725 C 16.683 19.228 17.5 19.228 18.003 18.725 L 18.725 18.003 C 19.228 17.5 19.228 16.683 18.725 16.18 V 16.18 C 18.343 15.798 18.231 15.225 18.441 14.727 C 18.463 14.674 18.485 14.621 18.506 14.567 C 18.689 14.101 19.143 13.801 19.643 13.801 H 19.71 C 20.422 13.801 20.999 13.224 20.999 12.512 V 11.491 C 20.999 10.779 20.422 10.202 19.71 10.202 H 19.643 C 19.143 10.202 18.689 9.901 18.506 9.436 C 18.485 9.382 18.463 9.329 18.441 9.276 C 18.231 8.778 18.343 8.205 18.725 7.823 V 7.823 C 19.228 7.32 19.228 6.503 18.725 6 L 18.003 5.278 C 17.5 4.775 16.683 4.775 16.18 5.278 V 5.278 C 15.798 5.66 15.225 5.772 14.727 5.562 C 14.674 5.54 14.621 5.518 14.567 5.497 C 14.101 5.311 13.8 4.856 13.8 4.356 V 4.289 C 13.8 3.577 13.223 3 12.511 3 H 11.49 C 10.777 3 10.2 3.577 10.2 4.289 V 4.356 C 10.2 4.856 9.899 5.31 9.434 5.493 C 9.38 5.515 9.327 5.536 9.274 5.559 C 8.776 5.769 8.203 5.657 7.821 5.275 V 5.275 C 7.318 4.772 6.501 4.772 5.998 5.275 L 5.275 5.997 C 4.772 6.5 4.772 7.317 5.275 7.82 V 7.82 C 5.657 8.202 5.769 8.775 5.559 9.273 C 5.536 9.327 5.515 9.38 5.494 9.434 C 5.311 9.899 4.856 10.2 4.356 10.2 H 4.289 C 3.577 10.2 3 10.777 3 11.489 V 12.51 C 3 13.223 3.577 13.8 4.289 13.8 H 4.356 C 4.856 13.8 5.31 14.101 5.493 14.566 C 5.514 14.62 5.536 14.673 5.558 14.726 C 5.768 15.224 5.656 15.797 5.274 16.179 V 16.179 C 4.771 16.682 4.771 17.499 5.274 18.002 L 5.996 18.724 C 6.499 19.227 7.316 19.227 7.819 18.724 V 18.724 C 8.201 18.342 8.774 18.23 9.272 18.44 C 9.325 18.462 9.378 18.484 9.432 18.505 C 9.898 18.688 10.198 19.142 10.198 19.642 V 19.709 C 10.198 20.421 10.775 20.998 11.487 20.998 H 12.508 C 13.22 20.998 13.797 20.421 13.797 19.709 V 19.642 C 13.797 19.142 14.098 18.688 14.563 18.505 C 14.617 18.484 14.67 18.462 14.723 18.44 C 15.224 18.231 15.797 18.343 16.18 18.725 V 18.725 Z"
                                stroke={isActiveSvgColor("/settings")}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="text-base leading-6 transition-all">
                            Account settings
                          </p>
                        </Link>
                        {/*--*/}
                        <div className="font-inter inline-flex w-full items-center gap-3 self-stretch rounded-md py-2 pl-2 pr-3 text-left font-[500] ">
                          <div className="flex h-6 w-6 items-center justify-center">
                            <div className="signout h-6 w-6" />
                          </div>
                          <button onClick={handleDisconnect}>
                            <p className="w-full text-base leading-6 text-gray-500">
                              Sign out
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // If page and useAccount are loaded and isConnected is false, show sign in button
                  <div className="flex w-full flex-col items-start gap-4 self-stretch bg-[#eb3d29] pb-4 pt-4 transition-all">
                    <div className="flex w-full flex-col items-start gap-4 self-stretch transition-all">
                      <div className="flex w-64 items-center gap-2 pr-4 font-[500] transition-all">
                        <div className="flex items-center pl-4">
                          <div className="h-full gap-4">
                            <div>
                              <p className="w-[103px] text-base leading-6 ">
                                Not logged in
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="h-5 w-5">
                          <svg
                            width="100%"
                            height="100%"
                            preserveAspectRatio="none"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M 18 10 C 18 14.418 14.418 18 10 18 C 5.582 18 2 14.418 2 10 C 2 5.582 5.582 2 10 2 C 14.418 2 18 5.582 18 10 Z M 10 7 C 9.631 7 9.308 7.199 9.133 7.501 C 8.857 7.979 8.245 8.142 7.767 7.866 C 7.289 7.589 7.125 6.977 7.402 6.499 C 7.919 5.605 8.888 5 10 5 C 11.657 5 13 6.343 13 8 C 13 9.306 12.165 10.418 11 10.829 V 11 C 11 11.552 10.552 12 10 12 C 9.448 12 9 11.552 9 11 V 10 C 9 9.448 9.448 9 10 9 C 10.552 9 11 8.552 11 8 C 11 7.448 10.552 7 10 7 Z M 10 15 C 10.552 15 11 14.552 11 14 C 11 13.448 10.552 13 10 13 C 9.448 13 9 13.448 9 14 C 9 14.552 9.448 15 10 15 Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex w-full flex-col items-start gap-1 self-stretch transition-all">
                        <div className="flex w-64 items-center justify-center gap-2.5 px-4 font-[400]">
                          <p className="w-full text-sm leading-5 [flex-grow:1] [max-width:224px]">
                            You must log in with a valid wallet to access our
                            product.
                          </p>
                        </div>
                        <div className="font-inter inline-flex w-full items-center gap-3 self-stretch rounded-md py-2 pl-2 pr-3 text-left font-[500]">
                          <ConnectButton.Custom>
                            {({
                              account,
                              openConnectModal,
                              authenticationStatus,
                              mounted,
                            }) => {
                              // Determine if the button should be ready to interact with
                              const ready =
                                mounted && authenticationStatus !== "loading";
                              // Determine if the wallet is connected
                              const isConnected =
                                ready &&
                                account &&
                                (!authenticationStatus ||
                                  authenticationStatus === "authenticated");

                              return (
                                <div
                                  {...(!ready && {
                                    "aria-hidden": true,
                                    style: {
                                      opacity: 0,
                                      pointerEvents: "none",
                                      userSelect: "none",
                                    },
                                  })}
                                >
                                  <StyledButtonAnalytics
                                    onClick={
                                      isConnected
                                        ? () => {
                                            //  handleDisconnect();
                                          }
                                        : openConnectModal
                                    }
                                  >
                                    {isConnected
                                      ? "Connected"
                                      : "Connect Wallet"}
                                  </StyledButtonAnalytics>
                                </div>
                              );
                            }}
                          </ConnectButton.Custom>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
