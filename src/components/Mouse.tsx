import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rotate3D } from "lucide-react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mouseClicked, setMouseClicked] = useState(false);

  useEffect(() => {
    const up = () => setMouseClicked(false);
    const down = () => setMouseClicked(true);

    window.addEventListener("mouseup", up);
    window.addEventListener("mousedown", down);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => {
    window.removeEventListener("mousemove", move);         
    window.removeEventListener("mouseup", up);
    window.removeEventListener("mousedown", down);
    }
  }, []);

  return (
    <>
    <motion.div
      animate={{
        x: "-50%",
        y: "-50%",  
        scale: mouseClicked ? 1.5 : 1 }}       
      style={{
        top: pos.y, 
        left: pos.x,
        position: "fixed",
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "white",
        pointerEvents: "none",
        zIndex: 9999,
      }}/>
    <motion.div
      animate={{    
        x: "-50%",
        y: "-50%",
        rotate: 45, 
        top: pos.y, 
        left: pos.x
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{
        position: "fixed",
        width: 20,
        height: 20,
        borderRadius: "0",
        background: "none",
        border: "1px solid white",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
    </>
  );
}