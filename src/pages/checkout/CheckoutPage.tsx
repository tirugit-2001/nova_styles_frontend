import React, { useState, useEffect } from "react";

import api from "../../service/api";
import { useOrderStore } from "../../store";
import SummaryProductCard from "../../components/ui/SummaryProductCard";
import Button from "../../components/ui/Button";

declare const Razorpay: any;

interface Address {
  _id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

const CheckoutPage: React.FC = () => {
  const { items, totalAmount, clearOrder } = useOrderStore();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [userAddresses, setUserAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const [formData, setFormData] = useState({
    email: "",
    gstin: "",
    country: "",
    city: "",
    state: "",
    firstName: "",
    lastName: "",
    street: "",
    postalCode: "",
    phone: "",
  });

  // Fetch user addresses on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await api.get("/users/address");
        console.log("datatat");
        console.log(data);
        setUserAddresses(data.address);
        if (data.length > 0) {
          setSelectedAddressId(data[0]._id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAddresses();
  }, []);
  console.log(items);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSelectedAddressId(null);
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  const handleOrder = async () => {
    if (!items.length) {
      alert("No items to order!");
      return;
    }

    if (!razorpayLoaded) {
      alert("Payment system is still loading. Please wait a moment.");
      return;
    }

    try {
      const payload = {
        items,
        address: selectedAddressId
          ? { addressId: selectedAddressId }
          : formData,
        amount: totalAmount * 100,
      };
      console.log(items);

      const { data } = await api.post("/payments/create-order", payload);
      console.log(data);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: "INR",
        name: "Your Store Name",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async (response: any) => {
          try {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;
            await api.post("/payments/verify", {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              paymentMethod: "cash",
              items,
              address: selectedAddressId
                ? { addressId: selectedAddressId }
                : formData,
              totalAmount,
            });

            alert("Payment successful!");
            clearOrder();
          } catch (err) {
            console.error(err);
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#F97316" },
      };

      const rzp = new window.Razorpay(options);

      // Optional: Handle payment failures
      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        alert("❌ Payment failed. Please try again.");
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-8 px-4 mt-48">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Contact information
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Latest dream home interiors delivered hassle-free
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
                Select an address or enter new
              </p>

              {/* Address List */}
              {userAddresses.length > 0 && (
                <div className="space-y-2 mb-4">
                  {userAddresses.map((addr) => (
                    <div
                      key={addr._id}
                      onClick={() => handleSelectAddress(addr._id)}
                      className={`p-3 border rounded cursor-pointer ${
                        selectedAddressId === addr._id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-300"
                      }`}
                    >
                      <p>
                        {addr.firstName} {addr.lastName}, {addr.street},{" "}
                        {addr.city}, {addr.state}, {addr.postalCode},{" "}
                        {addr.country}
                      </p>
                      <p>Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Manual Address */}
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
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
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
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Total</h3>
                  <p className="text-sm text-gray-600">Including GST @18%</p>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹ {totalAmount.toLocaleString()}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order summary
              </h3>

              {items.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                <div className="space-y-6 mb-6">
                  {items.map((item) => (
                    // <div key={idx} className="flex gap-4">
                    //   <div className="w-24 h-24 flex-shrink-0">
                    //     <img
                    //       src={item?.image || ""}
                    //       alt={item.name}
                    //       className="w-full h-full object-cover rounded-md"
                    //     />
                    //   </div>
                    //   <div className="flex-1">
                    //     <div className="flex justify-between mb-2">
                    //       <h4 className="font-medium text-gray-900">
                    //         {item.name}
                    //       </h4>
                    //       <span className="font-semibold text-gray-900">
                    //         ₹ {(item.price * item.quantity).toLocaleString()}
                    //       </span>
                    //     </div>
                    //     <div className="text-sm text-gray-600 space-y-1">
                    //       <p>Quantity: {item.quantity}</p>
                    //       {item.area && <p>Area: {item.area} sq.ft</p>}
                    //       {item.selectedColor && (
                    //         <p>Color: {item.selectedColor}</p>
                    //       )}
                    //       {item.selectedTexture && (
                    //         <p>Texture: {item.selectedTexture}</p>
                    //       )}
                    //     </div>
                    //   </div>
                    // </div>
                    <SummaryProductCard item={item} />
                  ))}
                </div>
              )}

              {items.length > 0 && (
                <Button btnTitle={"Place Order"} handleClick={handleOrder} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
