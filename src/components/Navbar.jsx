import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import ThemeToggle from "./ThemeToggle";
import { logo, menu, close } from "../assets";

const Navbar = ({ onOpenModal }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX
        } w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-primary" : "bg-transparent"
        }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Rupesh &nbsp;
            <span className='sm:block hidden'> | Full Stack DevOps Engineer</span>
          </p>
        </Link>
        <ThemeToggle />

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {/* Desktop Navigation */}
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer relative group`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              {/* Dropdown Menu (Appears on Group Hover) */}
              {nav.children && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#1d1836] rounded-xl shadow-card p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top z-50">
                  <div className="flex flex-col gap-4">
                    {nav.children.map((child) => (
                      <a
                        key={child.id}
                        href={child.path}
                        target={child.external ? "_blank" : "_self"}
                        className="text-secondary hover:text-white text-[16px] font-medium block"
                        onClick={(e) => {
                          // Check if this item is a "Model Item"
                          if (child.modelItem) {
                            e.preventDefault(); // Stop page jump
                            
                            // Send data UP to App.jsx
                            onOpenModal(
                              child.modelType, 
                              child.modelKey, 
                              child.modelData
                            );
                          } else if (!child.external) {
                            setActive(nav.title);
                          }
                        }}
                      >
                        {child.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle (Simplified) */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${!toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] w-full`}
                >
                  {/* CHECK: Does this item have children (Dropdown)? */}
                  {nav.children ? (
                    <div className="flex flex-col gap-2">
                      {/* Parent Title (Acts as a Header) */}
                      <span className="text-white/50 text-[12px] uppercase tracking-wider font-bold">
                        {nav.title}
                      </span>

                      {/* Children Links (Indented) */}
                      <ul className="flex flex-col gap-3 pl-3 border-l-2 border-white/10">
                        {nav.children.map((child) => (
                          <li key={child.id}>
                            <a
                              href={child.path}
                              target={child.external ? "_blank" : "_self"}
                              className="text-secondary hover:text-white block"
                              onClick={() => {
                                setToggle(!toggle); // Close menu
                                // Check if this item is a "Model Item"
                                if (child.modelItem) {
                                  e.preventDefault(); // Stop page jump
                                  // Send data UP to App.jsx
                                  onOpenModal(
                                    child.modelType, 
                                    child.modelKey, 
                                    child.modelData
                                  );
                                } else if (!child.external) {
                                  setActive(nav.title);
                                }
                                setActive(nav.title); // Set Active State
                              }}
                            >
                              {child.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    /* STANDARD LINK (No Dropdown) */
                    <a
                      href={`#${nav.id}`}
                      className={`${active === nav.title ? "text-white" : "text-secondary"
                        }`}
                      onClick={() => {
                        setToggle(!toggle);
                        setActive(nav.title);
                      }}
                    >
                      {nav.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
