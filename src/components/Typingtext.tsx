import { useEffect, useRef, useState } from "react";

interface TypingTextProps {
  text: string | string[];
  speed?: number;           
  deleteSpeed?: number;     
  pauseTime?: number;       
  cursorChar?: string;      
  loop?: boolean;          
  className?: string;
}

export function TypingText({
  text,
  speed = 60,
  deleteSpeed = 35,
  pauseTime = 1800,
  cursorChar = "|",
  loop = true,
  className,
}: TypingTextProps) {
  const texts = Array.isArray(text) ? text : [text];
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const indexRef = useRef(0);       
  const charRef = useRef(0);       
  const phaseRef = useRef<"typing" | "pausing" | "deleting">("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function tick() {
      const current = texts[indexRef.current];
      const phase = phaseRef.current;

      if (phase === "typing") {
        charRef.current += 1;
        setDisplayed(current.slice(0, charRef.current));

        if (charRef.current >= current.length) {
          phaseRef.current = "pausing";
          timeoutRef.current = setTimeout(tick, pauseTime);
          return;
        }
       
        const char = current[charRef.current - 1];
        const delay = char === " " || char === "," ? speed * 2 : speed;
        timeoutRef.current = setTimeout(tick, delay);

      } else if (phase === "pausing") {
        
        if (texts.length === 1 && !loop) return;
        phaseRef.current = "deleting";
        timeoutRef.current = setTimeout(tick, deleteSpeed);

      } else if (phase === "deleting") {
        charRef.current -= 1;
        setDisplayed(current.slice(0, charRef.current));

        if (charRef.current <= 0) {
          indexRef.current = (indexRef.current + 1) % texts.length;
          if (!loop && indexRef.current === 0) return;
          phaseRef.current = "typing";
          timeoutRef.current = setTimeout(tick, speed * 3);
          return;
        }
        timeoutRef.current = setTimeout(tick, deleteSpeed);
      }
    }

    timeoutRef.current = setTimeout(tick, speed * 2);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  // 
  }, []);

  return (
    <span className={className}>
      {displayed}
      <span
        style={{
          opacity: cursorVisible ? 1 : 0,
          transition: "opacity 0.1s",
          marginLeft: "2px",
        }}
      >
        {cursorChar}
      </span>
    </span>
  );
}