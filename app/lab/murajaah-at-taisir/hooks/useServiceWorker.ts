import { useEffect } from "react";

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/murajaah-sw.js", // Put inside "{root}/public/"
        {
          scope: "/lab/murajaah-at-taisir",
          updateViaCache: "none",
        },
      );

      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }

      try {
        const sub = await registration.pushManager.subscribe();
        console.log({ sub });
      } catch (error) {
        console.error(`Subscription failed with ${error}`);
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
}

export function useServiceWorker() {
  useEffect(() => {
    registerServiceWorker();
  }, []);
}
