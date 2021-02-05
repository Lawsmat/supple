import { motion } from "framer-motion";
import { Flipped } from "react-flip-toolkit";

export default function ButtonBox() {
    return <Flipped key="button">
        <motion.a whileHover={{scale:1.05}}
         style={{width:"10rem", height:"10rem", background: "gray"}}
         >Product
         </motion.a>
        </Flipped>
}