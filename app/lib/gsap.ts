import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger);

export { gsap, useGSAP, CustomEase, ScrollTrigger };
