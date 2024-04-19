import React from "react";

interface NavbarTopMobileProps {
  toggleNavbar: () => void;
  isNavbarOpen: boolean;
}

const NavbarTopMobile: React.FC<NavbarTopMobileProps> = ({
  toggleNavbar,
  isNavbarOpen,
}) => {
  return (
    <div
      className={`inline-flex h-16 w-full items-center justify-between gap-4 bg-gray-900`}
    >
      <div className="flex items-center pl-4 [flex-grow:1]">
        <button
          className="InxLogo-white block h-8 w-[76px]"
          onClick={toggleNavbar}
        >
          {/*Logo*/}
        </button>
      </div>
      <div className="flex items-center justify-end gap-2 opacity-0">
        <div className="flex items-center gap-3 py-1 pr-2">
          <div
            className={`inline-flex items-center justify-center rounded-2xl bg-gray-900 p-1 `}
          >
            <div className="relative h-6 w-6 overflow-clip">
              <div className="bg-bellbg-0x absolute inset-0 bg-contain bg-center bg-no-repeat opacity-50" />
            </div>
          </div>
          <div className={`rounded-2xl bg-gray-900 `}>
            <div className="relative h-8 w-8 overflow-clip">
              <div className="bg-bellbg-0x absolute inset-0 bg-contain bg-center bg-no-repeat opacity-50" />
            </div>
          </div>
        </div>
        <div
          className={`inline-flex items-center justify-center rounded-md p-2 opacity-0 `}
        >
          <div className="relative h-6 w-6 overflow-clip">
            <div className="bg-bellbg-0x absolute inset-0 bg-contain bg-center bg-no-repeat opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTopMobile;
