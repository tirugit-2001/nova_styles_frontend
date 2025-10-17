import React from 'react';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  backgroundColor?: string;
  buttonColor?: string;
}

const CTABanner: React.FC<CTABannerProps> = ({
  title = "Transform your 2BHK, 3BHK",
  subtitle = "Book a free consultation with expert interior designers.",
  buttonText = "Book Free Consultation",
  onButtonClick,
  // backgroundColor = "bg-[#9CA992]",
  // buttonColor = "bg-[#C9A66B]"
}) => {
  return (
    <div className={`w-full py-16 px-4`} style={{ backgroundColor: '#9CA992' }}>
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-2xl font-bold text-white">
          {title}
        </h2>
        <p className="text-white text-lg md:text-lg font-normal">
          {subtitle}
        </p>
        <div>
        <a href="/contactUs">
        <button
          onClick={onButtonClick}
          className="hover:opacity-90 text-white px-12 py-4 text-base font-normal transition-opacity duration-200 bg-brand hover:bg-brand-dark"
        >
          {buttonText}
        </button>
        </a>
        </div>
      </div>
    </div>
  );
};


export default CTABanner;