import React, { useState, useEffect } from "react";
import Navbar from "~/components/analytics/navbar/Navbar";
import NavbarTopMobile from "~/components/analytics/navbar/NavbarTopMobile";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const slideInOut = {
  hidden: { x: "-100%" },
  visible: { x: "0%" },
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  const handleCloseOnClickOutside = (event: Event) => {
    const target = event.target as Node;
    const navbar = document.getElementById("navbar");

    if (navbar && !navbar.contains(target)) {
      setIsNavbarVisible(false);
    }
  };

  useEffect(() => {
    if (isNavbarVisible) {
      document.addEventListener("click", handleCloseOnClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleCloseOnClickOutside);
    };
  }, [isNavbarVisible]);

  return (
    <div className="layout relative">
      {isNavbarVisible && (
        <div className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"></div> // Hide overlay on lg screens and above
      )}
      <div className="fixed left-0 right-0 top-0 z-10 lg:hidden">
        <NavbarTopMobile
          toggleNavbar={toggleNavbar}
          isNavbarOpen={isNavbarVisible}
        />
      </div>
      <AnimatePresence mode="wait">
        {isNavbarVisible && (
          <motion.div
            className="fixed left-0 top-0 z-20 lg:hidden" // Hide sidebar on lg screens and above
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideInOut}
            transition={{ duration: 0.2 }}
          >
            <Navbar
              toggleNavbar={toggleNavbar}
              isNavbarVisible={isNavbarVisible}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`fixed left-0 top-0 z-20 ${
          isNavbarVisible ? "hidden lg:block" : "lg:block"
        }`}
      >
        {/* This will now only be shown on lg screens and above */}
        <Navbar toggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
      </div>

      <div className="content z-0 mt-16 lg:ml-[256px] lg:mt-0">{children}</div>
    </div>
  );
};

export default Layout;
