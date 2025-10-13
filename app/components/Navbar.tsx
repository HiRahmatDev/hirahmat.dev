import { CtaButton } from "./CtaButton";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <nav>
      <div className="container py-4 flex justify-between align-center">
        <Logo />
        <CtaButton />
      </div>
    </nav>
  );
}
