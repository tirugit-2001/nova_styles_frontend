import React from "react";
import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";

// import logo from "../../../public/novastyleslogo.svg";
// import logo from "../../../public/novastyleslogo.svg";
import logo from "../../../public/footer_logo.png";
import { Link } from "react-router-dom";

interface FooterProps {
  companyName?: string;
  tagline?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}

const Footer: React.FC<FooterProps> = ({
  // companyName = "NovaStyles Constructions",

  phone = "+91-9900334035",
  email = "salesnovastyles@gmail.com",
  website = "www.novastylesinterior.com",
}) => {
  const services = [
    "Interior Design",
    "Wall Decor & Flooring",
    "Construction Services",
    "Modular Kitchens",
    "Home Renovation",
  ];

  const company = [
    { label: "About Us", path: "https://novastylesinterior.com/portfolio" },
    {
      label: "Our Portfolio",
      path: "https://novastylesinterior.com/portfolio",
    },
    {
      label: "Client Reviews",
      path: "https://novastylesinterior.com/portfolio",
    },
  ];

  const locations = ["Bangalore", "Hubli", "Dharwad"];

  return (
    <footer
      className="w-full text-white"
      style={{ backgroundColor: "#332E27" }}
    >
      {/* Top Section with CTA */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Logo and Address */}
            <div className="">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <a href="/">
                  <div className="flex  w-[150px]  gap-2">
                    <img
                      src={logo}
                      alt="#"
                      className="text-white object-cover"
                    />
                  </div>
                </a>
              </div>
              <p className="text-sm font-light">
                NovaStyles | Home Interiors, Construction & Premium Interior
                Products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl   mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5  gap-6 sm:gap-8">
          {/* Contact Info */}
          <div className="space-y-2 sm:col-span-1">
            <p className="text-sm">
              <span className="whitespace-nowrap">Phone:&nbsp;{phone}</span>
            </p>
            <p className="text-sm">
              <span className="whitespace-nowrap">Email:&nbsp;{email}</span>
            </p>
            <p className="text-sm">
              <span className="whitespace-nowrap">Website:&nbsp;{website}</span>
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-normal mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm font-light hover:text-gray-300 transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-base font-normal mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    target="_blank"
                    className="text-sm font-light hover:text-gray-300 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-base  font-normal mb-3 sm:mb-4">
              Connect With Us
            </h4>
            <ul className="space-y-2">
              {locations.map((location, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm font-light hover:text-gray-300 transition-colors"
                  >
                    {location}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-base font-normal mb-3 sm:mb-4">
              Connect With Us:
            </h4>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4 text-xs sm:text-sm font-light text-center">
            <p className="break-words">
              © Novastyles Construction And Interiorworks Private Limited
            </p>
            <div className="flex gap-4 sm:gap-8">
              <Link
                to="/privacy"
                className="hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                Terms and Condition
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
