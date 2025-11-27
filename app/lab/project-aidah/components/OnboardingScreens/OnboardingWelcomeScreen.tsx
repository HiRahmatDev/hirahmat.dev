import Image from "next/image";
import welcomeImage from "../../assets/project-aidah-onboarding-welcome-screen.jpg";

export function OnboardingWelcomeScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-8 pb-8 px-4">
      <Image
        src={welcomeImage}
        alt="Welcome to the Onboarding Screen"
        placeholder="blur"
        className="rounded-2xl"
      />
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="space-y-3 text-center">
          <h1 className="text-2xl/[34px] font-bold tracking-[-0.6px] max-w-[320px] mx-auto">
            Mulai Menghafal Al-Qur’an Dengan Tenang
          </h1>
          <p className="text-sm/5 tracking-[-0.4px] max-w-[320px] mx-auto text-zinc-500">
            Langkah kecil hari ini sudah cukup. Kita jalani hafalan dengan
            ringan dan tanpa tekanan.
          </p>
        </div>
      </div>
    </div>
  );
}
