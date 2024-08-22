"use client";
import React from "react";

export function Header() {
  return (
    <header className="inset-x-0 top-0 z-50 backdrop-blur duration-200 bg-zinc-900 shadow-sm shadow-zinc-800">
      <div className="container flex items-center justify-between p-6 mx-auto">
        <span className="text-4xl font-bold dark:text-white">
          Faturar Digital
        </span>
      </div>
    </header>
  );
}
