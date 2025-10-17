import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function InteriorDesignForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    floorplan: '',
    purpose: '',
    requirements: {
      kitchen: 1,
      wardrobe: 1,
      studyUnit: 1,
      crockeryUnit: 1
    },
    selectedPackage: '',
    name: '',
    email: '',
    mobile: '',
    pincode: '',
    whatsappUpdates: false
  });

  const floorplans = ['1 BHK', '2 BHK', '3 BHK', '4 BHK'];
  const purposes = ['Move In', 'Rent Out', 'Renovate'];

  const packages = [
    {
      name: 'Essential Interiors',
      subtitle: 'For homes to be rented out',
      items: [
        { label: 'Kitchen', price: '3.5 Lakh' },
        { label: 'Wardrobe', price: '₹1.6 Lakh' },
        { label: 'Study unit', price: '₹84,892' },
        { label: 'Crockery unit', price: '₹1.1 Lakh' }
      ]
    },
    {
      name: 'Essential Interiors',
      subtitle: 'For homes to be rented out',
      items: [
        { label: 'Kitchen', price: '3.5 Lakh' },
        { label: 'Wardrobe', price: '₹1.6 Lakh' },
        { label: 'Study unit', price: '₹84,892' },
        { label: 'Crockery unit', price: '₹1.1 Lakh' }
      ]
    },
    {
      name: 'Essential Interiors',
      subtitle: 'For homes to be rented out',
      items: [
        { label: 'Kitchen', price: '3.5 Lakh' },
        { label: 'Wardrobe', price: '₹1.6 Lakh' },
        { label: 'Study unit', price: '₹84,892' },
        { label: 'Crockery unit', price: '₹1.1 Lakh' }
      ]
    }
  ];

  type RequirementField = 'kitchen' | 'wardrobe' | 'studyUnit' | 'crockeryUnit';

  const handleIncrement = (field: RequirementField) => {
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        [field]: formData.requirements[field] + 1
      }
    });
  };

  const handleDecrement = (field: RequirementField) => {
    if (formData.requirements[field] > 0) {
      setFormData({
        ...formData,
        requirements: {
          ...formData.requirements,
          [field]: formData.requirements[field] - 1
        }
      });
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

   const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.mobile) {
      alert('Please fill in all required fields (Name, Email, Mobile)');
      return;
    }

    setIsSubmitting(true);

    // ⚠️ REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
    const SERVICE_ID = 'deepak_2442';
    const TEMPLATE_ID = 'template_oscvb3b';
    const PUBLIC_KEY = 'I4G2FBNszgEyUKK0Q';

    // Create formatted message with all form details
    const message = `
Interior Design Consultation Request

📋 Project Details:
━━━━━━━━━━━━━━━━━━━━
• Floorplan: ${formData.floorplan}
• Purpose: ${formData.purpose}

🛋️ Requirements:
━━━━━━━━━━━━━━━━━━━━
• Kitchen: ${formData.requirements.kitchen}
• Wardrobe: ${formData.requirements.wardrobe}
• Study Unit: ${formData.requirements.studyUnit}
• Crockery Unit: ${formData.requirements.crockeryUnit}

📦 Selected Package:
━━━━━━━━━━━━━━━━━━━━
${formData.selectedPackage}

📞 Contact Information:
━━━━━━━━━━━━━━━━━━━━
• Email: ${formData.email}
• Mobile: ${formData.mobile}
• Pincode: ${formData.pincode}
• WhatsApp Updates: ${formData.whatsappUpdates ? 'Yes' : 'No'}
    `.trim();

    // Get current time in readable format
    const now = new Date();
    const timeString = now.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Prepare template parameters matching your EmailJS template
    const templateParams = {
      name: formData.name,
      time: timeString,
      message: message
    };

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );
      
      console.log('Email sent successfully!', response.status, response.text);
      alert('✅ Form submitted successfully! Our team will contact you shortly.');
      
      // Reset form to initial state
      setFormData({
        floorplan: '',
        purpose: '',
        requirements: {
          kitchen: 1,
          wardrobe: 1,
          studyUnit: 1,
          crockeryUnit: 1
        },
        selectedPackage: '',
        name: '',
        email: '',
        mobile: '',
        pincode: '',
        whatsappUpdates: false
      });
      setCurrentStep(1);
      
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('❌ Failed to send email. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 1: Floorplan and Purpose
  const renderStep1 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your floorplan</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {floorplans.map((plan) => (
            <button
              key={plan}
              onClick={() => setFormData({ ...formData, floorplan: plan })}
              className={`py-3 px-5 border-2 transition-all ${
                formData.floorplan === plan
                  ? 'border-brand bg-brand text-white'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {plan}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Purpose</h3>
        <div className="grid grid-cols-3 gap-4">
          {purposes.map((purpose) => (
            <button
              key={purpose}
              onClick={() => setFormData({ ...formData, purpose })}
              className={`py-3 lg:px-5 border-2  transition-all ${
                formData.purpose === purpose
                  ? 'border-brand bg-brand text-white'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {purpose}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 2: Requirements
  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Your requirements for {formData.floorplan}
      </h3>
      
      {Object.entries(formData.requirements).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between py-3 border-b">
          <span className="text-gray-700 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleDecrement(key as RequirementField)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
            >
              −
            </button>
            <span className="w-12 text-center border border-gray-300 rounded py-1">
              {value}
            </span>
            <button
              onClick={() => handleIncrement(key as RequirementField)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Step 3: Package Selection
  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Our Estimates Based On Your Preference
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`border-2  p-6 cursor-pointer transition-all ${
              formData.selectedPackage === pkg.name + index
                ? 'border-gray-300 bg-yellow-100 text-black'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => setFormData({ ...formData, selectedPackage: pkg.name + index })}
          >
            <h4 className="font-semibold text-gray-800 mb-1">{pkg.name}</h4>
            <p className="text-sm text-gray-600 mb-6">{pkg.subtitle}</p>
            
            <div className="space-y-3">
              {pkg.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-medium">{item.price}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setFormData({ ...formData, selectedPackage: pkg.name + index });
                handleNext();
              }}
              className="w-full mt-6 bg-brand hover:bg-brand-dark text-white py-2 transition"
            >
              Continue
            </button>
            
            <p className="text-xs text-gray-500 mt-4">
              By submitting this form, (this is just estimate) you agree to the privacy policy & terms and conditions
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 4: Contact Details
  const renderStep4 = () => (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Connect with Us</h3>
        <p className="text-gray-600">Get your dream home today. Let our experts help you</p>
      </div>

      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
      />

      <input
        type="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
      />

      <div className="relative">
        <span className="absolute left-4 top-3.5 text-xl">🇮🇳</span>
        <input
          type="tel"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="whatsapp"
          checked={formData.whatsappUpdates}
          onChange={(e) => setFormData({ ...formData, whatsappUpdates: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="whatsapp" className="text-sm text-gray-700">
          Get updates on Whatsapp
        </label>
      </div>

      <input
        type="text"
        placeholder="Enter Your Pincode"
        value={formData.pincode}
        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
      />

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to the privacy policy & terms and conditions
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4 lg:mt-40">
      <div className="bg-white  shadow-lg  p-8 w-full max-w-4xl ">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`p-2 rounded-lg ${
              currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {currentStep === 1 && 'Lets Get Started'}
              {currentStep === 2 && `Your requirements for ${formData.floorplan}`}
              {currentStep === 3 && 'Our Estimates Based On Your Preference'}
              {currentStep === 4 && 'Connect with Us'}
            </h2>
            <p className="text-gray-500 mt-1">Step {currentStep} of 4</p>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full ${
                step <= currentStep ? 'bg-brand' : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>

        {/* Form Content */}
        <div className="mb-8 ">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Continue Button */}
        {currentStep !== 3 && (
            <div className='flex justify-center items-center'>
          <button
            onClick={currentStep === 4 ? handleSubmit : handleNext}
            className=" bg-brand hover:bg-brand-dark text-white lg:px-64 md:px-40 sm:px-36  px-24 py-3  font-medium transition"
          >
             {isSubmitting ? 'Submitting...' : (currentStep === 4 ? 'Submit' : 'Continue')}
          </button>
          </div>
        )}
      </div>
    </div>
  );
}