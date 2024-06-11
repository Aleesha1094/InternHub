"use client";
import Categories from "@/components/Categories";
import HeroSection from "@/components/HeroSection";
import React from "react";

export default function Home() {
  return (
    <main className="flex-grow">
      <HeroSection/>
      <Categories/>
    </main> 
  );
}