"use client"

import React from "react";
import Hero from "./landing/Hero";
import Features from "./landing/Features";
import Dashboard from "./landing/Dashboard";
import CTA from "./landing/CTA";
import Footer from "./landing/Footer";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <Dashboard />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}