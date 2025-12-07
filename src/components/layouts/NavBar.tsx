import { useState } from "react";
import { ShoppingCart, CircleUser, Mail, Phone, Menu, X } from "lucide-react";

import logo from "../../../public/novastyleslogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore, useUserStore } from "../../store";
import SignInForm from "../../service/Email";

const NavBar = () => {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useUserStore();
  console.log(user);
  console.log("user");
  const { items } = useCartStore();

  const applicationSections = [
    { label: "Kids & Playful Spaces", id: "kids-playful-spaces" },
    { label: "Heritage & Vintage Arts", id: "heritage-vintage-arts" },
    {
      label: "Indian Cultural Art – Pichwai",
      id: "indian-cultural-art-pichwai",
    },
    { label: "Tropical Nature & Leaves", id: "tropical-nature-leaves" },
    { label: "Peacock Elegance Collection", id: "peacock-elegance-collection" },
  ];

  const [showEmailDignIn, setEmailSignIn] = useState(false);
  const handleToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className={` sticky top-0 z-[999]`}>
      <div className="bg-[#DFE6DE] py-2  md:px-8 ">
        <div className=" mx-auto flex justify-end items-center gap-2 text-sm">
          <a
            href="mailto:info@novastyles.com"
            className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors"
          >
            <Mail size={16} />
            <span className="hidden sm:inline">salesnovastyles@gmail.com</span>
          </a>
          <span>|</span>
          <a
            href="tel:+917852369451"
            className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors"
          >
            <Phone size={16} />
            <span className="hidden sm:inline">Call Now: +91-9900334035</span>
          </a>
        </div>
      </div>
      <div className=" bg-white px-4  xl:px-10 py-8">
        <div className=" md:mx-8 flex items-center gap-4 ">
          <div className="gap-6 flex justify-between items-center md:items-center flex-1">
            <div className="flex gap-3 lg:gap-10 items-center">
              <Link className="lg:w-auto" to={"/"}>
                <img
                  src={logo}
                  className="h-full object-cover w-full"
                  alt="logo"
                />
              </Link>
              <div className="lg:gap-9 gap-3 md:gap-6   hidden md:flex ">
                {applicationSections.map((section) => (
                  <Link
                    key={section.id}
                    to={`/#${section.id}`}
                    onClick={(e) => {
                      const currentPath = window.location.pathname;
                      if (currentPath !== "/") {
                        // If not on home page, navigate first, then scroll
                        navigate(`/#${section.id}`);
                        setTimeout(() => {
                          const element = document.getElementById(section.id);
                          if (element) {
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }, 300);
                      } else {
                        // If already on home page, just scroll
                        e.preventDefault();
                        const element = document.getElementById(section.id);
                        if (element) {
                          element.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                          // Update URL hash without scrolling again
                          window.history.pushState(null, "", `#${section.id}`);
                        }
                      }
                    }}
                    className="font-medium text-[#4D4D4D] hover:text-brand transition-colors text-sm whitespace-nowrap relative pb-1 hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-brand-light"
                  >
                    {section.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex relative flex-1 justify-end items-center md:hidden  gap-3">
              <div className=" flex items-center gap-2 md:hidden">
                <button
                  onClick={() => {
                    navigate("/cart");
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <div className="relative  ">
                    {items?.length > 0 && (
                      <div className="h-5 w-5 absolute right-3 top-[-12px] text-sm bg-brand text-white rounded-full">
                        {items.length}
                      </div>
                    )}
                    <ShoppingCart size={20} className="text-gray-700" />
                  </div>
                </button>

                {!user ? (
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <CircleUser
                      onClick={() => {
                        navigate("/login");
                      }}
                      size={20}
                      className="text-gray-700"
                    />
                  </button>
                ) : (
                  <div
                    onClick={() => {
                      navigate("/profile");
                    }}
                    className="flex gap-2 cursor-pointer"
                  >
                    <CircleUser size={20} className="text-gray-700" />
                    <span className=" font-semibold"> {user?.username}</span>
                  </div>
                )}
              </div>
              <Menu
                size={20}
                className="cursor-pointer md:hidden"
                onClick={handleToggle}
              />
              {isMobileMenuOpen && (
                <div className="absolute rounded-lg p-3 z-[999]  top-[50px] gap-3  border-2   right-0 px-4  bg-white shadow-md flex flex-col md:hidden ">
                  <div className="flex items-center justify-end">
                    <X
                      className="cursor-pointer"
                      onClick={handleToggle}
                      size={20}
                    />
                  </div>
                  {applicationSections.map((section) => (
                    <Link
                      onClick={(e) => {
                        handleToggle();
                        const currentPath = window.location.pathname;
                        if (currentPath !== "/") {
                          // If not on home page, navigate first, then scroll
                          navigate(`/#${section.id}`);
                          setTimeout(() => {
                            const element = document.getElementById(section.id);
                            if (element) {
                              element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                            }
                          }, 300);
                        } else {
                          // If already on home page, just scroll
                          e.preventDefault();
                          const element = document.getElementById(section.id);
                          if (element) {
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                            // Update URL hash without scrolling again
                            window.history.pushState(
                              null,
                              "",
                              `#${section.id}`
                            );
                          }
                        }
                      }}
                      key={section.id}
                      to={`/#${section.id}`}
                      className="text-sm font-medium text-[#4D4D4D] hover:text-brand transition-colors whitespace-nowrap relative pb-1 hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-brand-light"
                    >
                      {section.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 ml-4">
            <button
              onClick={() => {
                navigate("/cart");
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <div className="relative ">
                {items?.length > 0 && (
                  <div className="h-5 w-5 absolute right-3 top-[-12px] text-sm bg-brand text-white rounded-full">
                    {items.length}
                  </div>
                )}
                <ShoppingCart size={20} className="text-gray-700" />
              </div>
            </button>

            {!user ? (
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <CircleUser
                  onClick={() => {
                    navigate("/login");
                  }}
                  size={20}
                  className="text-gray-700"
                />
              </button>
            ) : (
              <div
                onClick={() => {
                  navigate("/profile");
                }}
                className="flex gap-2 cursor-pointer"
              >
                <CircleUser size={20} className="text-gray-700" />
                <span className=" font-semibold"> {user?.username}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {showEmailDignIn && <SignInForm onClose={() => setEmailSignIn(false)} />}
    </nav>
  );
};

export default NavBar;
