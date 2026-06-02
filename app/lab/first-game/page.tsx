import { ArcSection } from "./components/ArcSection";
import { RectangleSection } from "./components/RectangleSection";

export default function FirstGamePage() {
  return (
    <div className="max-w-180 mx-auto px-4 pb-8">
      <h1 className="font-semibold text-2xl my-4">Canvas Basics</h1>
      <div className="space-y-4">
        <RectangleSection />
        <ArcSection />
      </div>
    </div>
  );
}
