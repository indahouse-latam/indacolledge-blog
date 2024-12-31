"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { opacity, slideUp } from "./preloader-animation";
import { Image } from "@nextui-org/react";

const words = [
  "Aprende",
  "Estudia",
  "Descubre",
  "Crea",
  "Explora",
  "Imagina",
  "Conquista",
  "Inspírate",
];

export function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;
    const timeout = setTimeout(
      () => setIndex(index + 1),
      index === 0 ? 1000 : 150
    );
    return () => clearTimeout(timeout);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  } L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 flex items-center justify-center z-[99] h-screen w-screen bg-white"
    >
      {dimension.width > 0 && (
        <>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-4 text-black z-10">
              <h2 className="text-4xl text-black font-medium">
                Indacollege <span className="text-sm">by</span>
              </h2>
              <Image src="/logo-indahouse.svg" alt="Indahouse" />
            </div>
            <motion.p
              variants={opacity}
              initial="initial"
              animate="enter"
              className="flex items-center z-10 text-2xl"
            >
              {words[index]}
            </motion.p>
          </div>
          <svg
            className="absolute top-0 w-full"
            style={{ height: `calc(100% + 300px)` }}
          >
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              className="fill-white"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
