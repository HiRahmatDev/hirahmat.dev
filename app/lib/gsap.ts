import { CustomEase } from "gsap/CustomEase";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger, ScrollSmoother);

export { gsap, useGSAP, CustomEase };
