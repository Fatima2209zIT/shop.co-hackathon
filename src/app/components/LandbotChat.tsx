"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    Landbot: {
      Livechat: new (config: { configUrl: string }) => void;
    };
  }
}

const LandbotChat = () => {
  useEffect(() => {
    const initLandbot = () => {
      if (typeof window !== "undefined") {
        const script = document.createElement("script");
        script.type = "module";
        script.async = true;
        script.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs";

        script.onload = () => {
          try {
            new window.Landbot.Livechat({
              configUrl:
                "https://storage.googleapis.com/landbot.online/v3/H-2780936-KKJV5IQV2SFIG5TK/index.json",
            });
          } catch (error) {
            console.error("Error initializing Landbot:", error);
          }
        };

        document.body.appendChild(script);
      }
    };

    window.addEventListener("mouseover", initLandbot, { once: true });
    window.addEventListener("touchstart", initLandbot, { once: true });

    return () => {
      window.removeEventListener("mouseover", initLandbot);
      window.removeEventListener("touchstart", initLandbot);
    };
  }, []);

  return null;
};

export default LandbotChat;


