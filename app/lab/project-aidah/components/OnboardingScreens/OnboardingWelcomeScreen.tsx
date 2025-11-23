"use client";

import Image from "next/image";

import { NextButton } from "../NextButton";
import welcomeImage from "../../assets/project-aidah-onboarding-welcome-screen.jpg"

function OnboardingWelcomeScreen() {
  return (
    <div className="h-[inherit] flex flex-col justify-between items-center pt-20 pb-10 px-4">
      <Image src={welcomeImage} alt="Welcome to the Onboarding Screen" placeholder="blur" className="rounded-2xl" />
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="space-y-3 text-center">
          <h1 className="text-2xl/[34px] font-bold tracking-[-0.6px] max-w-[320px] mx-auto">
            Mulai Menghafal Al-Qur’an Dengan Tenang
          </h1>
          <p className="text-sm/5 tracking-[-0.4px] max-w-[320px] mx-auto text-zinc-500">
            Langkah kecil hari ini sudah cukup. Kita jalani hafalan dengan ringan dan tanpa tekanan.
          </p>
        </div>
        <Indicators />
        <NextButton className="w-[inherit]" />
      </div>
    </div>
  );
}

function Indicators() {
  return (
    <div className="flex justify-center items-center h-3">
      <div className="flex gap-1">
        <div className="w-3 h-1.5 rounded-[3px] bg-accent" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="size-1.5 rounded-[3px] bg-accent/20" />
        ))}
        <div />
      </div>
    </div >
  )
}

export { OnboardingWelcomeScreen }
