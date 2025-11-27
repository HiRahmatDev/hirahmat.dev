import Image from "next/image";
import methodIntroImage from "../../assets/project-aidah-onboarding-method-intro-screen.jpg";

export function OnboardingMethodIntroScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-8 pb-8 px-4">
      <Image
        src={methodIntroImage}
        alt="Welcome to the Onboarding Screen"
        placeholder="blur"
        className="rounded-2xl"
      />
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="space-y-3 text-center">
          <h1 className="text-2xl/[34px] font-bold tracking-[-0.6px] max-w-[320px] mx-auto">
            Menghafal Ringan, Konsisten, dan Terarah
          </h1>
          <p className="text-sm/5 tracking-[-0.4px] max-w-[320px] mx-auto text-zinc-500">
            Micro-session 2–5 menit, murajaah cerdas, dan latihan suara untuk
            menjaga hafalan tetap kuat.
          </p>
        </div>
      </div>
    </div>
  );
}
