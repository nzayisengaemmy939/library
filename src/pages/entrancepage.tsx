import { useState } from "react";
import AccessibilityMenu from "../components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useTheme } from "../context/useTheme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const LibraryEntrance = () => {
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [data, setData] = useState<string>("");

  const [regNo, setRegNumber] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        `https://nsalibrentrebk.onrender.com/users/student/entry/${regNo}`
      );

      if (response.data) {
        if (response.data.qrcode) {
          setData(response.data.qrcode);
        }

        if (response.data.status === 409) {
          toast.info(response.data.message || "Conflict occurred.");
        } else {
          toast.success("Entrance successful!");
          setFormSubmitted(true)
        }
      } else {
        toast.error("No data received from the server.");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.info(error.response.data.message || "Conflict occurred.");

          if (error.response.data.qrcode) {
            setData(error.response.data.qrcode);
            setFormSubmitted(true)
          }
        } else {
          toast.error(
            error.response.data.message ||
              "An error occurred. Please try again."
          );
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full h-screen  bg-gray-100 ${
        theme === "dark" ? "bg-gray-800" : ""
      }`}
    >
      <AccessibilityMenu
        ariaLabel="Menu"
        onScreenReaderToggle={function (): void {
          throw new Error("Function not implemented.");
        }}
        onThemeToggle={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className={`h-[88vh] flex items-center justify-center`}>
        {!formSubmitted ? (
          <div
            className={`flex flex-col  rounded-md sm:p-8 p-4 w-[95%] sm:w-[40%] ${
              theme === "dark"
                ? "bg-gray-900"
                : "bg-white"
            }`}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="regNumber"
                  className="block text-blue-500 font-medium mb-3 sm:text-lg sm:text-center text-2xl dark:text-gray-100"
                >
                  {t("hero.enterRegNumber")}
                </label>
                <input
                  type="text"
                  id="regNumber"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:border-blue-300 dark:text-gray-300 focus:outline-none text-gray-600  dark:bg-gray-800 dark:border-gray-600"
                  placeholder={t("hero.regNumber")}
                  value={regNo}
                  onChange={(e) => setRegNumber(e.target.value)}
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#30A2C7] to-[#015579] text-[#fff] font-semibold
                 rounded-full transform transition-all duration-300 w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                disabled={loading}
              >
                {loading ? t('hero.sending'): t("hero.send")}
              </motion.button>
            </form>
            <div className="w-full">
              <p className="text-gray-700 mt-4 text-center dark:text-gray-100">
              {t("hero.notRegistered")}{" "}
                <Link to="/register" className="text-blue-500">
                {t("hero.registerButton")}
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col bg-gray-100 rounded-md p-8 sm:w-[40%] w-[95%] items-center justify-center relative dark:bg-gray-900">
            <h2 className="text-blue-500 text-lg font-medium mb-4">
            {t("hero.qrcode")}
            </h2>
            <div className="relative">
              <QRCodeCanvas
                value={data}
                size={256}
                fgColor={fgColor}
                bgColor={bgColor}
              />
            </div>
            <div className="flex gap-4 mt-4">
              <div className="flex flex-col items-center">
                <label className="text-sm text-gray-700 dark:text-white">Foreground</label>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="text-sm text-gray-700 dark:text-white">Background</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default LibraryEntrance;
