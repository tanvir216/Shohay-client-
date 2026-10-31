"use client";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "shohay-night" ||
      (!localStorage.getItem("theme") && matchMedia("(prefers-color-scheme: dark)").matches));
  }, []);
  const toggle = () => {
    const next = dark ? "shohay" : "shohay-night";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setDark(!dark);
  };
  return (
    <button onClick={toggle} className="btn btn-ghost btn-circle" aria-label="Toggle light and dark theme">
      {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
