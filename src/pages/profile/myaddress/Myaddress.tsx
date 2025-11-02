import { useEffect, useState } from "react";
import useUserStore from "../../../store/useUserStoree";

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

  return (
    <div className=" w-[100%] h-full flex  ">
      <div className="mt-[150px] flex flex-col   flex-1">
        <h1 className="text-xl font-semibold ">My Addresses</h1>

        {userAddresses.length > 0 ? (
          <div className="space-y-2 flex-1  border-2 mb-4">
            {userAddresses.map((addr: any) => (
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
