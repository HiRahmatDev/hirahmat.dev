import { CTAButton } from "./CTAButton";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <nav>
      <div className="container py-4 flex justify-between align-center">
        <Logo />
        <CTAButton />
      </div>
    </nav>
  );
}
