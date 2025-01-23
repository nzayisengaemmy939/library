import { motion } from "framer-motion";
import AccessibilityMenu from "../components/Navbar";
import { CiCamera } from "react-icons/ci";
import { useTheme } from "../context/useTheme";
import { useState } from "react";
import { openCamera } from "../script/script.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LibraryAccountCreation = () => {

  const { t } = useTranslation();

  const { theme } = useTheme();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    regNo: "",
    firstName: "",
    otherName: "",
    department: "",
    school: "",
    gender: "",
    level: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
  
    if (!formData.regNo.trim()) {
      newErrors.regNumber = "Registration number is required.";
    } else if (!/^\d{9}$/.test(formData.regNo) || Number(formData.regNo) <= 1) {
      newErrors.regNumber = "Registration number must be a nine-digit number greater than 1.";
    }
  
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
  
    if (!formData.gender) {
      newErrors.gender = "Gender selection is required.";
    }
  
    if (!formData.department.trim()) {
      newErrors.department = "Department is required.";
    }
  
    if (!formData.school.trim()) {
      newErrors.school = "School is required.";
    }
  
    if (!formData.level) {
      newErrors.level = "Level is required.";
    } else if (Number(formData.level) <= 0) {
      newErrors.level = "Level must be a number greater than 0.";
    }
  
    if (!image) {
      newErrors.image = "Profile picture is required.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); 
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data: {
      regNo: string;
      firstName: string;
      otherName: string;
      department: string;
      school: string;
      gender: string;
      level: string;
      photo: Blob | null;
    } = {
      ...formData,
      photo: null,
    };

    if (image) {
      const blob = await fetch(image).then((res) => res.blob());
      data.photo = blob;
    }
    console.log(data, "data to be submitted");
    try {
      setLoading(true);
      const response = await axios.post(
        "https://nsalibrentrebk.onrender.com/users/student/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Registration successful!");
        setTimeout(()=>{
             navigate('/entrance')
        },2000)
      } else {
        if (response.data && response.data.message) {
          toast.error(response.data.message);
        } else {
          toast.error("Registration failed! Please try again.");
        }
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      if (error.response) {
        toast.error(
          error.response.data.message || "Server error"
        );
      } else {
        toast.error("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 ${
        theme === "dark" ? "bg-gray-800" : ""
      }`}
    >
      <ToastContainer />
      <AccessibilityMenu
        onScreenReaderToggle={() => console.log("Screen Reader Toggled")}
        onThemeToggle={() => console.log("Theme Toggled")}
        ariaLabel="Accessibility Menu"
      />
      <div
        className={`flex flex-col gap-1 bg-white dark:bg-gray-900 rounded-md sm:px-8 px-4 w-[95%] m-auto sm:w-[40%] sm:mt-20 mt-16 ${
          theme === "dark" ? "bg-gray-900" : ""
        }`}
      >
        <label
          htmlFor="regNumber"
          className="block text-blue-500 font-medium mb-2 sm:text-lg text-2xl text-center pt-3 dark:text-gray-100"
        >
           {t("hero.registerTitle")}
        </label>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="regNo"
            value={formData.regNo}
            onChange={handleInputChange}
            min="1"
            className={`border dark:bg-gray-800 dark:border-gray-600 ${
              errors.regNumber ? "border-red-500" : "border-gray-300"
            } rounded-md px-4 py-[5px] mb-1 w-full focus:outline-none dark:text-gray-300 text-gray-700`}
            placeholder= {t("hero.regNumber")}
          />

          {errors.regNumber && (
            <p className="text-red-500 text-sm">{errors.regNumber}</p>
          )}

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`border dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded-md px-4 py-[5px] mb-1 w-full focus:outline-none text-gray-700`}
            placeholder=  {t("hero.firstName")}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}

          <input
            type="text"
            name="otherName"
            value={formData.otherName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-[5px] mb-1 w-full focus:outline-none dark:text-gray-300 text-gray-700  dark:bg-gray-800 dark:border-gray-600"
            placeholder= {t("hero.otherName")}
            
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className={`border dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 ${
              errors.department ? "border-red-500" : "border-gray-300"
            } rounded-md px-4 py-[5px] mb-1 w-full focus:outline-none text-gray-700`}
            placeholder={t("hero.department")}
          />
          {errors.department && (
            <p className="text-red-500 text-sm">{errors.department}</p>
          )}

          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
            className={`border dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 ${
              errors.school ? "border-red-500" : "border-gray-300"
            } rounded-md px-4 py-[5px] mb-1 w-full focus:outline-none text-gray-700`}
            placeholder={t("hero.school")}
          />
          {errors.school && (
            <p className="text-red-500 text-sm">{errors.school}</p>
          )}

          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={`border dark:bg-gray-800 dark:border-gray-600 text-gray-600 dark:text-gray-300 ${
              errors.gender ? "border-red-500" : "border-gray-300"
            } rounded-md px-4 py-[5px] mb-1 w-full focus:outline-none `}
          >
            <option value="">{t("hero.gender.label")}</option>
            <option value="male">{t("hero.gender.options.male")}</option>
            <option value="female">{t("hero.gender.options.female")}</option>
           
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}

          <input
            type="number"

            min={1}
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className={`border dark:bg-gray-800 dark:border-gray-600 ${
              errors.level ? "border-red-500" : "border-gray-300"
            } rounded-md px-4 py-[5px] mb-1 w-full focus:outline-none  text-gray-700 dark:text-gray-300`}
            placeholder={t("hero.level")}
          />
          {errors.level && (
            <p className="text-red-500 text-sm">{errors.level}</p>
          )}

          <div className="relative w-full mb-4">
            <label
              className="flex items-center justify-center border border-gray-300 rounded-md px-4 py-2 text-gray-600 cursor-pointer hover:bg-blue-100 transition-all"
              onClick={() => openCamera(setImage)}
            >
              <CiCamera className="mr-2 w-6 h-6 text-blue-500" />
              <span className="text-blue-500 text-sm">
                {image ? t("hero.reProfilePicture") : t("hero.profilePicture")}
              </span>
            </label>
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
            {image && (
              <div className="mt-2">
                <p className="text-center text-sm text-gray-500">
                  Captured Image:
                </p>
                <img
                  src={image}
                  alt="Captured"
                  className="border border-gray-300 rounded-md w-full h-auto"
                />
              </div>
            )}
          </div>

          <motion.button
            className="group relative inline-flex items-center justify-center px-8 py-3 mb-2 bg-gradient-to-r from-[#30A2C7] to-[#015579] text-[#fff] font-semibold 
            rounded-full transform transition-all duration-300 w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." :  t("hero.registerButton")}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default LibraryAccountCreation;
