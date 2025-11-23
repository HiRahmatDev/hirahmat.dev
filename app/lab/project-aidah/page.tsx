import { notFound } from "next/navigation";

import { FLAGS } from "@/app/config/flags";
import { MobileContainer } from "./components/MobileContainer";
import { OnboardingScreen } from "./components/OnboardingScreens/OnboardingScreen";

export default function ProjectAidahPage() {
  if (!FLAGS.PROJECT_AIDAH) {
    notFound();
  }

  return (
    <MobileContainer>
      <OnboardingScreen />
    </MobileContainer>
  );
}
