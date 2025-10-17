import React from 'react';

interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
}

interface ConsProcessStepsProps {
  steps?: Step[];
  mainTitle?: string;
  mainSubtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const ConsProcessSteps: React.FC<ConsProcessStepsProps> = ({
  steps,
  mainTitle = "Transform your 2BHK, 3BHK",
  mainSubtitle = "Book a free consultation with expert interior designers.",
  buttonText = "Get Free Estimate",
  onButtonClick
}) => {
  const defaultSteps: Step[] = [
    {
      id: 1,
      number: "1",
      title: "Design Consultation",
      description: "Latest dream home interiors delivered."
    },
    {
      id: 2,
      number: "2",
      title: "Design Consultation",
      description: "Latest dream home interiors delivered."
    },
    {
      id: 3,
      number: "3",
      title: "Design Consultation",
      description: "Latest dream home interiors delivered."
    },
    {
      id: 4,
      number: "4",
      title: "Design Consultation",
      description: "Latest dream home interiors delivered."
    }
  ];

  const ConsProcessSteps = steps || defaultSteps;

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Steps Timeline */}
        <div className="relative mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {ConsProcessSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connecting Line */}
                {index < ConsProcessSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-300 z-0" 
                       style={{ marginLeft: '24px' }}></div>
                )}
                
                {/* Step Content */}
                <div className="relative z-10 text-center">
                  {/* Circle Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-300 text-gray-600 font-normal text-lg mb-4">
                    {step.number}
                  </div>
                  
                  {/* Step Title */}
                  <h3 className="text-gray-900 font-normal text-base mb-2">
                    {step.title}
                  </h3>
                  
                  {/* Step Description */}
                  <p className="text-gray-600 text-sm font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-normal text-gray-900">
            {mainTitle}
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-light">
            {mainSubtitle}
          </p>
          <button
            onClick={onButtonClick}
            className="px-10 py-3 text-white text-sm font-normal hover:bg-brand-dark transition-opacity duration-200 bg-brand">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};



export default ConsProcessSteps;