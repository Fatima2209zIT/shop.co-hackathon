"use client";
import { useEffect } from "react";

const LandbotChat = () => {
  useEffect(() => {
    let myLandbot: any = null;

    const initLandbot = () => {
      if (typeof window !== "undefined" && !myLandbot) {
        const script = document.createElement("script");
        script.type = "module";
        script.async = true;
        script.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs";

        script.onload = () => {
          myLandbot = new (window as any).Landbot.Livechat({
            configUrl:
              "https://storage.googleapis.com/landbot.online/v3/H-2780936-KKJV5IQV2SFIG5TK/index.json",
          });
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

  return null; // The chatbot is floating, no UI needed
};

export default LandbotChat;



