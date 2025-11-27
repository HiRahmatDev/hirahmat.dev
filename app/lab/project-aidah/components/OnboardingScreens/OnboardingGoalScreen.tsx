import { RadioButton } from "./RadioButton";

export function OnboardingGoalScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-8 pb-12 px-4">
      <div />
      <div className="w-full flex flex-col items-start justify-center gap-8">
        <div className="space-y-3">
          <h1 className="text-2xl/[34px] font-bold tracking-[-0.6px] max-w-[320px] mx-auto">
            Apa tujuanmu sekarang?
          </h1>
          <p className="text-sm/5 tracking-[-0.4px] max-w-[320px] mx-auto text-zinc-500">
            Kami akan menyesuaikan pengalaman sesuai perjalanan hafalanmu.
          </p>
        </div>
        <div className="space-y-3 w-full">
          <RadioButton name="goal">Hafalan Baru</RadioButton>
          <RadioButton name="goal">Perkuat Hafalan</RadioButton>
          <RadioButton name="goal">Fokus Muraja{"'"}ah</RadioButton>
        </div>
      </div>
    </div>
  );
}
