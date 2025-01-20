import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import ur1 from "../assets/ur 1.png";
import { FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../context/useTheme";

interface AccessibilityMenuProps {
  onScreenReaderToggle: Dispatch<SetStateAction<boolean>>;
  onThemeToggle: () => void;
  ariaLabel: string;
}

export default function AccessibilityMenu({
  ariaLabel,
}: AccessibilityMenuProps) {
  const { t, i18n } = useTranslation(); 
  const [navbarColor, setNavbarColor] = useState("#015579");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const colorOptions = [
    { color: "#015579", icon: "🔵" },
    { color: "#28A745", icon: "🟢" },
    { color: "#DC3545", icon: "🔴" },
    { color: "#FFC107", icon: "🟡" },
    { color: "#6F42C1", icon: "🟣" },
  ];
  const { theme, toggleTheme } = useTheme();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language); 
    setIsLanguageModalOpen(false); 
  };

  return (
    <div
      role="complementary"
      aria-label={ariaLabel}
      className={`shadow-lg backdrop-blur-sm h-16  flex items-center justify-between px-6 sm:px-4 ${
        theme === "dark" ? "bg-gray-900" : ""
      }`}
      style={{
        backgroundColor: theme !== "dark" ? navbarColor : undefined,
      }}
    >
      <div className="flex items-center gap-3 text-gray-200">
        <Link to="/">
          <img src={ur1} alt="UR Logo" width={40} height={40} />
        </Link>

        <p className="text-sm sm:text-base"> {t("hero.libraryName")}</p>
      </div>

      <button
        className="sm:hidden text-gray-200 text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={t("accessibility.toggleMenu")}
      >
        ☰
      </button>

      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row sm:items-center sm:gap-4  dark:bg-gray-900 sm:static absolute top-16 left-0 w-full sm:w-auto py-4 sm:py-0 px-6 sm:px-0`}
        style={{ backgroundColor: isMenuOpen ? navbarColor : undefined }}
      >
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-400 dark:hover:bg-blue-400 z-20"
          aria-label={t("accessibility.toggleTheme")}
        >
          <FaMoon className="text-xl text-gray-200" />
        </button>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {colorOptions.map(({ color, icon }, index) => (
            <button
              key={index}
              onClick={() => setNavbarColor(color)}
              className="p-2 rounded-lg text-xl hover:bg-blue-500 sm:flex hidden"
              aria-label={`Change navbar color to ${color}`}
            >
              {icon}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 mt-2 sm:mt-0">
          <span role="img" aria-hidden="true" className="text-xl">
            🌍
          </span>
          <button
            onClick={() => setIsLanguageModalOpen(true)} // Open modal on click
            className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer hover:bg-blue-500 rounded text-gray-200"
            aria-label={t("accessibility.language")}
          >
            {t("hero.selectLanguage")}
          </button>
        </div>
      </div>

     
      {isLanguageModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-2 rounded-lg sm:w-[150px] w-[150px] relative top-20 sm:top-20  sm:left-56 left-20  dark:bg-gray-900">
            <button
              onClick={() => handleLanguageChange("en")}
              className="w-full py-1 bg-transparent text-blue-500 rounded-md mb-2 text-sm"
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange("rw")}
              className="w-full py-1 bg-transparent text-blue-500 rounded-md text-sm px-1"
            >
              Kinyarwanda
            </button>
            <button
              onClick={() => setIsLanguageModalOpen(false)} 
              className="mt-4 w-full py-2 bg-[#015579] text-white rounded-md"
            >
              {t("hero.close")}
            </button>
          </div>
        </div>
      )}

      <div className="mt-2 sm:mt-0 sm:flex hidden">
        <div className="px-4 py-2 bg-blue-500 rounded-lg text-gray-200">Download app</div>
      </div>
    </div>
  );
}
