import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Package, MapPin, LogOut } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
const Profile = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  const profileNavItems = [
    {
      title: "Orders",
      path: "/profile",
      icon: <Package className="w-5 h-5" />,
    },
    {
      title: "Address",
      path: "/profile/myaddress",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="  flex-1 bg-white border-r mt-[160px] p-6">
        {/* User Profile */}
        <div className="flex flex-col items-center ">
          <div className="w-24 h-24 bg-gray-300 rounded-lg mb-3 flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
          </div>
          <h4 className="text-sm font-medium text-gray-700">
            Hello yakshith Saravu
          </h4>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-5  my-4">
          {profileNavItems.map((item, ind) => (
            <Link
              key={ind}
              to={item.path}
              className={`{w-full flex items-center gap-3 px-4 py-3 text-gray-900 bg-gray-100 rounded-lg ${
                pathname === item.path && "bg-orange-200 text-white"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-900 bg-gray-100 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className=" flex-[5]  p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
