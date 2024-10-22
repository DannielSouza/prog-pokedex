"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SearchInput } from "./search-input";
import { useRouter } from "next/navigation";
import usePokemonView from "../_states/pokemon-view";

export const Header = () => {
  const router = useRouter();
  const { currentView, onChangeCurrentView } = usePokemonView();
  const [isScrolled, setIsScrolled] = useState(false);

  function handleToggleViewMode() {
    if (currentView === 1) return onChangeCurrentView(2);
    if (currentView === 2) return onChangeCurrentView(3);
    if (currentView === 3) return onChangeCurrentView(1);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-screen border-gray-900 flex items-center justify-between px-4 md:px-14 fixed top-0 left-0 right-0 bg-[#121212] z-20 transition-all ${
        isScrolled ? "h-14 border-b" : "h-16 border-b border-transparent"
      }`}
    >
      <Image
        onClick={() => router.push("/")}
        src="/assets/logo.png"
        width={80}
        height={30}
        alt="logo"
        className="cursor-pointer hidden md:block"
      />

      <SearchInput isScrolled={isScrolled} />

      <button
        onClick={handleToggleViewMode}
        className="border rounded-full w-8 h-8 border-gray-400 text-gray-400"
      >
        {currentView}
      </button>
    </div>
  );
};
