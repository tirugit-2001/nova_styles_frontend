import React from "react";
import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import logoN from "../../../public/logo_N.png";
import logo from "../../../public/whitelogo.png";

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
  tagline = "Your Complete Interior & Construction Partner",
  address = "Kozhikode, Kerala - 673001",
  phone = "+91-XXXXX-XXXXX",
  email = "info@novastyles.com",
  website = "www.novastyles.com",
}) => {
  const services = [
    "Interior Design",
    "Wall Decor & Flooring",
    "Construction Services",
    "Modular Kitchens",
    "Home Renovation",
  ];

  const company = [
    "About Us",
    "Our Portfolio",
    "Client Reviews",
    "Blog & Tips",
    "Career Opportunities",
  ];

  const locations = [
    "Kozhikode (Calicut)",
    "Wayanad",
    "Thrissur",
    "Ernakulam",
    "Palakkad",
  ];

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
                  <div className="flex gap-2">
                    <img src={logoN} alt="#" className="text-white" />
                    <img src={logo} alt="" />
                  </div>
                </a>
              </div>
              <p className="text-sm font-light">{tagline}</p>
              <p className="text-sm font-light">{address}</p>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row justify-start lg:justify-end gap-4 sm:gap-10 lg:col-span-2 items-start sm:items-center">
              <div className="text-start">
                <h3 className="text-base sm:text-lg font-medium mb-2">
                  Free home interior guide
                </h3>
                <p className="text-xs font-normal mb-4">
                  Don't forget to consider these fundamental design guidelines
                  to know before you start interior designing!
                </p>
              </div>
              <button
                className="border-2 px-8 py-2 text-sm font-normal hover:bg-white hover:text-gray-900 transition-colors duration-200 w-fit h-fit"
                style={{ borderColor: "#C9A66B", color: "#C9A66B" }}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Contact Info */}
          <div className="space-y-2 col-span-2 sm:col-span-1">
            <p className="text-sm break-words">Phone: {phone}</p>
            <p className="text-sm break-words">Email: {email}</p>
            <p className="text-sm break-words">Website: {website}</p>
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
                    href="#"
                    className="text-sm font-light hover:text-gray-300 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-base font-normal mb-3 sm:mb-4">
              Connect With us
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
              Connect With US:
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
              © Novastyleconstructionand interirworks PrivateLimited
            </p>
            <div className="flex gap-4 sm:gap-8">
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                Terms and Condition
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
