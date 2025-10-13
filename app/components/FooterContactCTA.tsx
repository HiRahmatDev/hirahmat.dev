import { EMAIL_HREF } from "./constants";
import { Mail } from "lucide-react";

export function FooterContactCTA() {
  return (
    <div className="container py-6">
      <div className="p-5 bg-accent text-white rounded-[20px] flex gap-3">
        <Mail className="shrink-0" />
        <div className="space-y-1">
          <h2 className="text-xl/[24px] font-semibold tracking-[0.4px]">
            Punya ide atau proyek menarik?
          </h2>
          <p className="text-base/[24px] tracking-[0.4px]">
            Saya siap berkolaborasi — kirim email ke{" "}
            <a href={EMAIL_HREF}>
              <strong className="font-mono font-semibold tracking-[-1px] underline">
                hirahmat.dev@gmail.com
              </strong>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
