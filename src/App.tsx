import { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import LenisScroll, { getLenis } from "./components/LenisScroll";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import "./globals.css";
import Generate from "./pages/Generate";
import HomePage from "./pages/HomePage";
import MyGeneration from "./pages/MyGeneration";
import YTPreview from "./pages/YTPreview";

export default function App() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const lenis = getLenis();

    if (lenis) {
      // corta inercia + fuerza top inmediato
      lenis.stop();
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.start();
    } else {
      // fallback por si lenis todavía no está listo
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <>
      <LenisScroll />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/generate/:id" element={<Generate />} />
        <Route path="/my-generations" element={<MyGeneration />} />
        <Route path="/preview" element={<YTPreview />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}
