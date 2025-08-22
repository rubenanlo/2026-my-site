"use client";

import { Typewriter } from "motion-plus/react";
import { delay, wrap } from "motion/react";
import { useState } from "react";

export default function Typewrite({
  text,
  whenToStart,
  speed,
  className,
  backspaceFactor,
  showCursor,
}: {
  text: string[] | string;
  whenToStart: number;
  speed: number;
  className: string;
  backspaceFactor: number;
  showCursor?: boolean;
}) {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <Typewriter
        as="span"
        delay={whenToStart} // Initial delay before typing starts (1 second)
        speed={speed} // Typing speed in milliseconds per character
        onComplete={() => {
          // This fires when typing is complete
          // delay() takes seconds, not milliseconds
          delay(() => setIndex(wrap(0, text.length, index + 1)), 2); // Wait 2 seconds before starting to backspace/erase
        }}
        className={className}
        backspaceFactor={backspaceFactor} // Controls backspace speed (0.1 = very fast backspacing)
        cursorStyle={{ visibility: showCursor ? "visible" : "hidden" }}
      >
        {`${text[index]} `}
      </Typewriter>
    </div>
  );
}
