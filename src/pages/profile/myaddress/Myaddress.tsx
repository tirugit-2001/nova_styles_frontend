import { useEffect, useState } from "react";
import useUserStore from "../../../store/useUserStore";

const MyAddress = () => {
  const { userAddresses, loading, error, getAddresses } = useUserStore();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  console.log(userAddresses);
  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  if (loading) return <p>Loading addresses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  console.log(userAddresses);

  return (
    <div className=" mt-[110px]  w-[100%] h-full flex  ">
      <div className="flex flex-col px-2   flex-1">
        <h1 className="text-xl font-semibold mb-4">My Addresses</h1>

        {userAddresses?.length > 0 ? (
          <div className="space-y-2 flex-1  ">
            {userAddresses.map((addr: any) => (
              <div
                key={addr._id}
                onClick={() => handleSelectAddress(addr._id)}
                className={`p-3 border-2 border-brand-dark  rounded cursor-pointer ${
                  selectedAddressId === addr._id
                    ? " bg-orange-50"
                    : "border-gray-300"
                }`}
              >
                <p>
                  {addr.firstName} {addr.lastName}, {addr.street}, {addr.city},{" "}
                  {addr.state}, {addr.postalCode}, {addr.country}
                </p>
                <p>Phone: {addr.phone}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <h1 className=" text-black font-semibold text-3xl">
              No addresses found.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddress;
