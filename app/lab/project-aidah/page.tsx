import { notFound } from "next/navigation";

import { FLAGS } from "@/app/config/flags";
import { MobileContainer } from "./components/MobileContainer";
import { OnboardingScreen } from "./components/OnboardingScreens/OnboardingScreen";
import { OnboardingProvider } from "./components/OnboardingScreens/OnboardingContext";

export default function ProjectAidahPage() {
  if (!FLAGS.PROJECT_AIDAH) {
    notFound();
  }

  return (
    <MobileContainer>
      <OnboardingProvider>
        <OnboardingScreen />
      </OnboardingProvider>
    </MobileContainer>
  );
}
