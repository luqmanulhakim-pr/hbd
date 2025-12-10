"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// Pastikan path foto sesuai folder kamu
const portraitPhotos = Array.from({ length: 21 }, (_, i) => `/photos/portrait/portrait_${i + 1}.JPG`);
const landscapePhotos = Array.from({ length: 9 }, (_, i) => `/photos/landscape/landscape_${i + 1}.JPG`);

export default function BackgroundGrid() {
  const leftPortraits = portraitPhotos.slice(0, 11);
  const rightPortraits = portraitPhotos.slice(11, 21);
  const duplicateArray = (arr: string[]) => [...arr, ...arr, ...arr];

  return (
    // Background dasar Krem kekuningan (hangat)
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#FFFDF5]">
      {/* Kolom Kiri */}
      <motion.div
        animate={{ y: [0, -3000] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-[35%] md:w-[30%] flex flex-col gap-6 p-4"
      >
        {duplicateArray(leftPortraits).map((photo, index) => (
          <div key={`left-${index}`} className="relative w-full h-[60vh] overflow-hidden rounded-xl shadow-sm bg-white p-2 opacity-80 hover:opacity-100 transition-opacity">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image src={photo} alt="Memory" fill className="object-cover" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Kolom Tengah (Landscape) */}
      <motion.div
        animate={{ y: [-3000, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute left-[35%] md:left-[30%] w-[30%] md:w-[40%] flex flex-col gap-6 pt-20 p-4"
      >
        {duplicateArray(landscapePhotos).map((photo, index) => (
          <div key={`center-${index}`} className="relative w-full h-[40vh] overflow-hidden rounded-xl shadow-sm bg-white p-2 opacity-80 hover:opacity-100 transition-opacity">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image src={photo} alt="Memory" fill className="object-cover" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Kolom Kanan */}
      <motion.div
        animate={{ y: [0, -3000] }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="absolute right-0 w-[35%] md:w-[30%] flex flex-col gap-6 pt-10 p-4"
      >
        {duplicateArray(rightPortraits).map((photo, index) => (
          <div key={`right-${index}`} className="relative w-full h-[60vh] overflow-hidden rounded-xl shadow-sm bg-white p-2 opacity-80 hover:opacity-100 transition-opacity">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image src={photo} alt="Memory" fill className="object-cover" />
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Overlay Gradient agar foto menyatu halus dengan background atas/bawah */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FFFDF5] to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FFFDF5] to-transparent z-10" />
    </div>
  );
}