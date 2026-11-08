"use client";
import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(true);
  const [showIOSHint, setShowIOSHint] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    setIsStandalone(standalone);

    const ios =
      /iPhone|iPad|iPod/.test(navigator.userAgent) ||
      (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
    setIsIOS(ios);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Resultado de instalación: ${outcome}`);
    setDeferredPrompt(null);
  };

  if (isStandalone) return null;

  if (isIOS) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowIOSHint((v) => !v)}
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-all shadow-md"
        >
          Instalar App
        </button>
        {showIOSHint && (
          <div className="absolute right-0 mt-2 z-50 text-xs bg-slate-800 text-white p-3 rounded-lg w-64 shadow-lg">
            Toca <strong>Compartir</strong> (el icono ⬆️) y luego{" "}
            <strong>Añadir a pantalla de inicio</strong>.
          </div>
        )}
      </div>
    );
  }

  if (!deferredPrompt) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-all shadow-md"
    >
      Instalar App
    </button>
  );
}