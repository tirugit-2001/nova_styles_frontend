import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';


interface CheckoutPageProps {
  cartItems?: any[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    email: '',
    gstin: '',
    country: '',
    city: '',
    state: '',
    firstName: '',
    lastName: '',
    address: '',
    pincode: '',
    phoneNumber: ''
  });

  // 🔹 Update this to use cart from context
  const calculateSubtotal = () => {
    return cart.reduce(
      (total:any, item:any) => total + (item.price ?? 0) * (item.quantity ?? 1),
      0
    );
  };

  const calculateGST = () => calculateSubtotal() * 0.18;
  const calculateTotal = () => calculateSubtotal() + calculateGST();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Order submitted:', { formData, cart });
    clearCart();
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-8 px-4 mt-48">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Contact and Shipping Form */}
          <div className="space-y-6">
            <div className="p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Contact information
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Latest dream home interiors delivered the hassle-free way
              </p>

              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  name="gstin"
                  placeholder="GSTIN (optional)"
                  value={formData.gstin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Shipping address
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Latest dream home interiors delivered the hassle-free way
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="p-6 shadow-sm">
              {/* Total Section */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Total</h3>
                  <p className="text-sm text-gray-600">
                    Including ₹ {calculateGST().toLocaleString()} GST @18%
                  </p>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹ {calculateTotal().toLocaleString()}
                </div>
              </div>

              {/* Order Summary */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order summary
              </h3>

              {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                <div className="space-y-6 mb-6">
                  {cart.map((item:any, index:number) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <span className="font-semibold text-gray-900">
                            ₹ {item.price?.toLocaleString()}
                          </span>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Quantity: {item.quantity ?? 1}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Order Button */}
              {cart.length > 0 && (
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-semibold text-lg"
                >
                  Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
