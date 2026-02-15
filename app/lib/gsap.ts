import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, CustomEase);

export { gsap, useGSAP, CustomEase };
