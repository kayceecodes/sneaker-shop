import { Variants, Transition } from "framer-motion"

export interface PageAnimations {
  variants: Variants
  transition: Transition
}

export interface Motions {
  initial: string
  animate: string
  exit: string
}

export interface FramerMotion {
  motions: Motions
  pageAnimations: PageAnimations
  pageStyle: any /* Styles passed down to each component */
}
