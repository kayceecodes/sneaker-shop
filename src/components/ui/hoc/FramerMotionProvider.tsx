import { FunctionComponent } from 'react'
import { Motions } from '../../../types/interfaces/animation';

interface Props {
    children: FunctionComponent<any>
}

const FramerMotionProvider = ({ children }: Props) => {
    const styleProps:any | Motions = {
      motions: {
        initial: "initial",
        animate: "out",
        exit: "in",
      },
      pageAnimations: {
        variants: {
          initial: {
            opacity: 0,
            x: "-2vw",
            // scale: 0.8,
          },
          in: {
            opacity: 1,
            x: 0,
            // scale: 1,
          },
          out: {
            opacity: 0,
            x: "2vw",
            // scale: 1.1,
          },
        },
        transition: {
          type: "tween", // Tween: animation that looks like it's evolving/transforming into something else
          ease: "linear",
          duration: 0.18,
        },
      },
    }
    return children(styleProps)
}

export default FramerMotionProvider