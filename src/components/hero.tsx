import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../context/useTheme";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

 

  return (
    <section
      className={`relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden ${
        theme === "dark"
          ? "bg-gray-800"
          : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full"></div>
      </div>

    

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl sm:text-5xl font-bold  text-blue-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-100 mb-10 mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <div className="flex gap-3 justify-center">
            <Link
              to="/entrance"
              className="group relative inline-flex items-center justify-center
                px-8 py-3 bg-gradient-to-r from-[#30A2C7] to-[#174F61]
                text-white font-semibold rounded-full transform transition-all duration-300"
              aria-label={t("hero.entranceButton")}
            >
              {t("hero.entranceButton")}
            </Link>

            <Link
              to="/register"
              className="group relative inline-flex items-center justify-center
                px-8 py-3 bg-gradient-to-r from-[#30A2C7] to-[#015579]
                text-[#fff] font-semibold rounded-full transform transition-all duration-300"
              aria-label={t("hero.registerButton")}
            >
              {t("hero.registerButton")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
