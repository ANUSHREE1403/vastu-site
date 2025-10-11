import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import Logo from "./Logo";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiGlobe,
  FiHome,
  FiInfo,
  FiBriefcase,
  FiBookOpen,
  FiMail,
  FiLogIn,
  FiUserPlus,
  FiSettings,
  FiPhone,
} from "react-icons/fi";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsUserMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: t("nav.home"), icon: FiHome },
    { path: "/about", label: t("nav.about"), icon: FiInfo },
    { path: "/services", label: t("nav.services"), icon: FiBriefcase },
    { path: "/blog", label: t("nav.blog"), icon: FiBookOpen },
    { path: "/contact", label: t("nav.contact"), icon: FiMail },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar container */}
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Logo size="default" />
            <div className="hidden sm:flex flex-col leading-tight">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Vastu Shakti
              </h1>
              <p className="text-xs text-orange-500 dark:text-orange-300 font-medium">
                {language === "en" ? "Transform Your Life" : "अपना जीवन बदलें"}
              </p>
            </div>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-300 transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            {/* Phone */}
            <a
              href="tel:+918448750725"
              className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-300 rounded-md hover:bg-orange-100 dark:hover:bg-orange-900/30 transition"
            >
              <FiPhone className="w-4 h-4" />
              <span className="text-sm font-medium">+91 84487 50725</span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {theme === "light" ? (
                <FiMoon className="w-5 h-5" />
              ) : (
                <FiSun className="w-5 h-5" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              title={
                language === "en" ? "Switch to Hindi" : "अंग्रेज़ी में बदलें"
              }
              aria-label="Toggle language"
              className="relative group p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <FiGlobe className="w-5 h-5" />
              <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Auth / Profile */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <FiUser className="w-5 h-5" />
                  <span className="hidden sm:inline">{user?.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiUser className="w-4 h-4" />
                      <span>
                        {language === "en" ? "My Profile" : "मेरी प्रोफ़ाइल"}
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>{language === "en" ? "Logout" : "लॉगआउट"}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <FiLogIn className="w-4 h-4" />
                  <span>{t("nav.login")}</span>
                </Link>
                <Link
                  to="/register"
                  className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-red-400 text-white px-5 py-2 rounded-md font-semibold hover:from-orange-500 hover:to-red-500 transition shadow-md hover:shadow-lg"
                >
                  <FiUserPlus className="w-4 h-4" />
                  <span>{t("nav.register")}</span>
                </Link>
              </div>
            )}

            {/* Book Button */}
            <Link
              to="/book-consultation"
              className="hidden lg:block bg-gradient-to-r from-orange-400 to-red-400 text-white px-5 py-2 rounded-md font-semibold hover:from-orange-500 hover:to-red-500 transition shadow-md hover:shadow-lg"
            >
              {t("common.bookConsultation")}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <a
              href="tel:+918448750725"
              className="flex items-center space-x-2 px-4 py-3 bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-300 rounded-md mx-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiPhone className="w-5 h-5" />
              <div>
                <span className="text-xs font-medium">
                  {language === "en" ? "Call Us" : "हमें कॉल करें"}
                </span>
                <span className="block text-sm font-semibold">
                  +91 84487 50725
                </span>
              </div>
            </a>

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiLogIn className="w-4 h-4" />
                  <span>{t("nav.login")}</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUserPlus className="w-4 h-4" />
                  <span>{t("nav.register")}</span>
                </Link>
              </>
            )}

            <Link
              to="/book-consultation"
              className="flex justify-center items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md font-semibold hover:from-blue-600 hover:to-purple-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("common.bookConsultation")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
