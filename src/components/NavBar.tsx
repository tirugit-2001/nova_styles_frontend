import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ShoppingCart,
  User,
  Mail,
  Phone,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import SignInForm from "../tools/Email";
import logo from "../../public/novalogo.png"

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const menuItems = [
  {
    title: "Nova Interiors",
    hasDropdown: true,
    isMegaMenu: true,
    groups: [
      {
        title: "Wall papers",
        items: [
          { label: "Ready available wall papers", path: "/interiorHome" },
          { label: "Customised wall papers", path: "/interiorHome" },
        ],
      },
      {
        title: "Wooden flooring",
        items: [
          { label: "Laminated wooden flooring", path: "/flooring/laminated" },
          { label: "SPC flooring", path: "/flooring/spc" },
          { label: "Engineered wooden flooring", path: "/flooring/engineered" },
          { label: "Hardwood flooring", path: "/flooring/hardwood" },
          { label: "Carpet flooring", path: "/flooring/carpet" },
          { label: "Vinyl flooring", path: "/flooring/vinyl" },
        ],
      },
      {
        title: "Wall decors",
        items: [
          { label: "Canvas prints", path: "/canvasPrint" },
          { label: "Wall decor items", path: "/wallDecor" },
        ],
      },
      {
        title: "Wall panels",
        items: [{ label: "PVC fluted panels", path: "/pvcFluted" }],
      },
      {
        title: "Soft furnishings",
        items: [
          { label: "Curtains", path: "/furnishings/curtains" },
          { label: "Cushions", path: "/furnishings/cushions" },
          { label: "Rugs/Carpets", path: "/furnishings/rugs" },
          { label: "Headboard", path: "/furnishings/headboard" },
        ],
      },
      {
        title: "Furniture",
        items: [
          { label: "Sofas", path: "/furniture/sofas" },
          { label: "Chairs", path: "/furniture/chairs" },
          { label: "Beds", path: "/furniture/beds" },
          { label: "Console units", path: "/furniture/console" },
        ],
      },
      {
        title: "Lighting",
        items: [
          { label: "Ceiling Lights", path: "/lighting/ceiling" },
          { label: "Wall Lights", path: "/lighting/wall" },
          { label: "Table Lamps", path: "/lighting/table" },
          { label: "Floor Lamps", path: "/lighting/floor" },
        ],
      },
    ],
  },
  {
    title: "Nova Construction",
    hasDropdown: true,
    isCardMenu: true,
    items: [
      {
        label: "Modular interiors",
        path: "/construction",
        description:
          "Interior designs made of prefabricated units that can be combined or customized.",
      },
      {
        label: "Customised Premium interiors",
        path: "/construction",
        description:
          "High-end interior designs tailored to your space and needs.",
      },
    ],
  },
  {
    title: "Nova Products",
    path:"/ourProduct",
    hasDropdown: true,
    isMegaMenu: true,
    groups: [
      {
        title: "Wall papers",
        items: [
          { label: "Ready available wall papers", path: "/ourProduct" },
          { label: "Customised wall papers", path: "/interiorHome" },
        ],
      },
      {
        title: "Wooden flooring",
        items: [
          { label: "Laminated wooden flooring", path: "/products/flooring/laminated" },
          { label: "Engineered wooden flooring", path: "/products/flooring/engineered" },
          { label: "Hardwood flooring", path: "/products/flooring/hardwood" },
          { label: "Carpet flooring", path: "/products/flooring/carpet" },
          { label: "Vinyl flooring", path: "/products/flooring/vinyl" },
        ],
      },
    ],
  },
  {
    title: "About NovaStyles",
    hasDropdown: false,
    path: "/aboutus",
  },
];


const productCategories = [
  { label: "Wall papers", path: "/categories/wallpapers" },
  { label: "Wooden flooring", path: "/categories/flooring" },
  { label: "Wall decors", path: "/categories/walldecors" },
  { label: "Wall panels", path: "/categories/wallpanels" },
  { label: "Soft furnishings", path: "/categories/furnishings" },
  { label: "Furniture", path: "/categories/furniture" },
  { label: "Novastyles Interior", path: "/categories/interior" },
  { label: "Canvas Prints", path: "/categories/canvasPrint" },
  { label: "Wall decor items", path: "/categories/wallDecor" },
];



  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScreenBelow700, setIsScreenBelow700] = useState(
    window.innerWidth < 700
  );
  const [showEmailDignIn, setEmailSignIn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenBelow700(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
    };
    checkScroll();
    scrollRef.current?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-gray-100"
      }`}
    >
      {/* <div className=" flex-row  items-center justify-center"> */}
      {/* Top Bar */}
      <div className="bg-gray-200 py-2 px-4 md:px-8 ">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-6 text-sm">
          <a
            href="mailto:info@novastyles.com"
            className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors"
          >
            <Mail size={16} />
            <span className="hidden sm:inline">info@novastyles.com</span>
          </a>
          <span>|</span>
          <a
            href="tel:+917852369451"
            className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors"
          >
            <Phone size={16} />
            <span className="hidden sm:inline">Call Now: +91-7852369451</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex gap-10">
          {/* Logo */}
          <a className="flex items-center gap-1" href="/">
            <div className="text-amber-500">
              <img src={logo} alt="" />
            </div>
          </a>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.title)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.hasDropdown ? (
                  <button className="flex items-center gap-1 text-gray-700 hover:text-brand transition-colors py-2">
                    {item.title}
                    <ChevronDown size={16} />
                  </button>
                ) : (
                  <a
                    href={item.path}
                    className="flex items-center gap-1 text-gray-700 hover:text-brand transition-colors py-2"
                  >
                    {item.title}
                  </a>
                )}

                {/* Mega Menu (Nova Interiors only) */}
                {item.isMegaMenu && openDropdown === item.title && (
                  <div className="absolute top-full left-0 w-[800px] bg-white rounded-lg shadow-xl py-6 px-6 border border-gray-100 grid grid-cols-2 gap-8">
                    {item.groups.map((group) => (
                      <div key={group.title}>
                        <a href={group.items.find((e) => e.path )?.path}>
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {group.title}
                        </h4>
                        </a>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {group.items.map((subItem) => (
                            <li
                              key={subItem.label}
                              className="hover:text-brand cursor-pointer transition-colors"
                            >
                              {subItem.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Nova Construction → Card-style dropdown */}
                {item.isCardMenu && openDropdown === item.title && (
                  <div className="absolute top-full left-0 w-[400px] bg-white rounded-lg shadow-xl py-4 px-4 border border-gray-100 group-hover:block">
                    {item.items.map((subItem) => (
                      <div
                        key={subItem.label}
                        className="py-3 border-b last:border-0 hover:bg-amber-50 rounded-md px-2"
                      >
                        <a href={subItem.path}>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {subItem.label}
                        </h4>
                        </a>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {subItem.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Normal Dropdowns */}
                {item.isMegaMenu && openDropdown === item.title && (
                  <div className="absolute top-full left-0 w-[400px] bg-white rounded-lg shadow-xl p-4 border border-gray-100">
                    {item.groups?.map((group) => (
                      <div key={group.title}>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {group.title}
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {group.items.map((subItem) => (
                            <li key={subItem.label}>
                              <a
                                href={subItem.path}
                                className="hover:text-brand cursor-pointer transition-colors"
                              >
                                {subItem.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
            </div>
          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <a href="/contactUs">
            <button className="hidden md:block px-6 py-2  text-brand border border-brand rounded hover:bg-brand hover:text-white transition-colors font-medium">
              Get Free Estimate
            </button>
            </a>

            {/* Mobile Menu Toggle */}
            <div>
              {isScreenBelow700 && (
                <>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ShoppingCart size={20} className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <User
                      onClick={() => {
                        setEmailSignIn(true);
                      }}
                      size={20}
                      className="text-gray-700"
                    />
                  </button>
                </>
              )}

              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Product Categories Bar */}
        <div className="mx-16 hidden lg:flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
          )}

          {/* Categories Scrollable */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth flex-1"
          >
            {productCategories.map((category) => (
              <a
                key={category.label}
                href={category.path}
                className="text-sm font-medium  text-[#4D4D4D] hover:text-brand transition-colors whitespace-nowrap"
              >
                {category.label}
              </a>
            ))}
          </div>

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          )}

          {/* Fixed Buttons (always visible, never scroll) */}
          <div className="flex items-center gap-2 ml-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart size={20} className="text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User
                size={20}
                onClick={() => {
                  setEmailSignIn(true);
                }}
                className="text-gray-700"
              />
            </button>
          </div>
        </div>
      </div>

      {showEmailDignIn && <SignInForm onClose={() => setEmailSignIn(false)} />}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-4">
          {menuItems.map((item) => (
            <div key={item.title} className="border-b border-gray-100 py-3">
              {item.hasDropdown ? (
                <>
                  <button
                    className="flex items-center justify-between w-full text-gray-700"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.title ? null : item.title
                      )
                    }
                  >
                    {item.title}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openDropdown === item.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === item.title && (
                    <div className="mt-2 pl-4">
                      {item.items?.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.path ? subItem.path : "#"}
                          className="block py-2 text-sm text-gray-600 hover:text-amber-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.path}
                  className="block text-gray-700 hover:text-amber-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </a>
              )}
            </div>
          ))}
          <button className="w-full mt-4 px-6 py-3 bg-brand text-white rounded hover:bg-amber-500 transition-colors font-medium">
            Get Free Estimate
          </button>
        </div>
      )}
      {/* </div> */}
    </nav>
  );
};

export default NavBar;
