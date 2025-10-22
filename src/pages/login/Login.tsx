import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import api from "../../service/api";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem("deviceId", deviceId);
    }
    if (!formData.password || !formData.email) {
      alert("All fields are required!");
      return;
    }
    try {
      const { status } = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
        deviceId: deviceId,
      });
      if (status == 200) {
        navigate("/", { replace: true });
        toast.success("Login successful!", {
          style: { color: "green" },
        });
      }
    } catch (e) {
      toast.error("Login failed. Please try again.", {
        style: { color: "red" },
      });
      console.error("Login error:", e);
    }
    console.log("Sign in:", formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        <div className="px-2 py-2 flex justify-end">
          <button
            className="text-2xl"
            onClick={() => {
              navigate(-1);
            }}
          >
            x
          </button>
        </div>
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              "Welcome Back"
            </h2>
            <p className="text-gray-600">"Sign in to your account"</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
            >
              "Sign In"
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              "Already have an account?"
              <button className="ml-2 text-brand hover:text-brand-dark font-semibold">
                <Link to="/register">Register</Link>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
