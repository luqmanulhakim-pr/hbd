"use client";

import { useState, useEffect, useRef } from "react"; // 1. Tambah useRef
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import BackgroundGrid from "./components/BackgroundGrid";
import Confetti from "react-confetti";

export default function Home() {
  const [gateOpen, setGateOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // 2. Buat referensi ke video player
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // 3. Logic Auto Play: Begitu gateOpen = true, video dimainkan
  useEffect(() => {
    if (gateOpen && videoRef.current) {
      // Delay 1 detik agar transisi halus, lalu play
      setTimeout(() => {
        videoRef.current?.play().catch((error) => {
          console.log("Autoplay blocked:", error);
        });
      }, 1000);
    }
  }, [gateOpen]);

  const { scrollYProgress } = useScroll();

  // Blur background lebih kuat saat di-scroll agar teks terbaca
  const blurAmount = useTransform(
    scrollYProgress,
    [0.2, 0.5],
    ["blur(2px)", "blur(20px)"]
  );

  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);

  const handleStartExperience = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000); // Confetti 8 detik
    setTimeout(() => setGateOpen(true), 300);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFDF5] font-fredoka">
      {/* 1. Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={400}
            recycle={false}
            colors={["#FF9E80", "#FFD54F", "#FFCCBC", "#FFECB3"]}
          />
        </div>
      )}

      {/* 2. Background Grid (Foto-foto) */}
      {gateOpen && (
        <motion.div style={{ filter: blurAmount }} className="fixed inset-0">
          <BackgroundGrid />
        </motion.div>
      )}

      {/* 3. The Gate (Halaman Pembuka) */}
      <AnimatePresence>
        {!gateOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFAB91]" // Warna Coral Soft
          >
            <div className="flex flex-col items-center gap-8 px-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <button
                  onClick={handleStartExperience}
                  className="relative overflow-hidden rounded-full w-56 h-56 border-8 border-[#FFFDF5] shadow-[0_0_50px_rgba(255,255,255,0.5)] z-10 hover:scale-105 transition-transform"
                >
                  <Image
                    src="/btn_ilaa.jpg" // Pastikan foto ini ada di folder public
                    alt="Tap Me"
                    fill
                    className="object-cover"
                    priority
                  />
                </button>
                {/* Ripple Effect */}
                <motion.div
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-[#FFFDF5] -z-10"
                />
              </motion.div>

              <div>
                <h1 className="text-[#FFFDF5] text-4xl mb-2 font-pacifico drop-shadow-md">
                  Hai Ilaaaaaa 😁
                </h1>
                <p className="text-white/90 text-lg font-fredoka bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm">
                  Buat liat isinya tap pipi kamu yang imut itu yaaa xixixixi
                  😘😘😘
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Konten Utama (Setelah Gate Terbuka) */}
      {gateOpen && (
        <div className="relative z-10">
          {/* Hero Title Section */}
          <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
            {/* Wrapper Judul dengan style "Sticker" agar terbaca jelas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="relative z-10"
            >
              <h1 className="text-6xl md:text-8xl text-[#FF9E80] font-pacifico mb-2 drop-shadow-[4px_4px_0px_#FFFDF5] stroke-text">
                Happy <br className="md:hidden" /> Birthday yang ke - 17 🎉
              </h1>

              <div className="bg-[#FFFDF5]/90 backdrop-blur-sm px-8 py-3 rounded-full shadow-lg inline-block border-2 border-[#FFD54F] mt-4 transform -rotate-2 hover:rotate-0 transition-all">
                <p className="text-2xl md:text-4xl text-[#5D4037] font-bold font-fredoka">
                  SIRAJAFA A.K.A ILAAA
                </p>
              </div>

              <p className="text-xl text-[#FFFDF5] mt-6 font-bold bg-[#FF9E80] inline-block px-4 py-1 rounded-lg shadow-md transform rotate-2">
                YEYYY SELAMATTT!!!!!
              </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-10"
            >
              <div className="w-8 h-12 border-4 border-[#FF9E80] rounded-full flex justify-center p-1 bg-white/50 backdrop-blur-sm">
                <div className="w-1 h-3 bg-[#FF9E80] rounded-full" />
              </div>
            </motion.div>
          </div>

          <div className="h-[20vh]" />

          {/* Kartu Ucapan & Video */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="relative px-4 pb-20 max-w-4xl mx-auto space-y-12"
          >
            {/* Card 1: Ucapan */}
            <div className="bg-[#FFFDF5]/80 backdrop-blur-xl p-8 md:p-10 rounded-[30px] border-4 border-[#FFD54F] shadow-[0_10px_40px_rgba(255,213,79,0.2)] text-center relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF9E80]/20 rounded-full blur-2xl group-hover:bg-[#FF9E80]/40 transition-all" />

              <h2 className="text-3xl md:text-4xl font-pacifico text-[#FF9E80] mb-6">
                Selamat Ulang Tahun Ilaaaa !!!
              </h2>
              <p className="text-lg md:text-xl text-[#5D4037] leading-relaxed font-fredoka">
                Btw bener kan yang ke-17 yaaa xixixixi. First of all aku mau
                bilang makasih banyak karena sudah selalu bisa membuat aku
                tersenyum, tertawa, kesal apapun itu disetiap harinya, Kamu udah
                bisa bikin aku lebih berwarna 🫶🫶🫶🫶. Sekarang giliran aku buat
                bikin kamu setidaknya bisa tersenyum dengan hadiah kecil ini,
                semoga kamu sukaaa yaaa.
                <br />
                Semoga di umur yang baru ini, kamu selalu diberikan kesehatan,
                kebahagiaan, kelucuan, kecantikan, kelancaran, kenyaman,
                kesempurnaan cintaaaaaaaaaa. <br /> Terus jadi pribadi yang
                baik, lucu, dan jangan lupa tetap jaga kerandomannya. <br />
                Jangan lupa untuk selalu jadi diri sendiri ( abaikan bacotan
                para tetangga yang iri dengki dan so nge judge padahal gatau apa
                apa ) dan tetap semangat mengejar mimpi-mimpi kamu yaaa!
              </p>
            </div>

            {/* Card 2: Video Cover */}
            <div className="bg-white p-6 md:p-8 rounded-[30px] shadow-xl border-b-8 border-[#FF9E80]">
              <h3 className="text-2xl font-pacifico text-[#5D4037] mb-4 text-center flex items-center justify-center gap-2">
                <span>🎤</span>Spesial Performance from your BFF<span>🎤</span>
              </h3>

              {/* VIDEO PLAYER CONTAINER */}
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-4 border-[#FFFDF5] shadow-inner">
                {/* 4. VIDEO TAG IMPLEMENTATION */}
                <video
                  ref={videoRef}
                  controls
                  playsInline
                  // loop // Uncomment jika ingin video berulang terus
                  className="w-full h-full object-cover"
                >
                  <source src="/video/video.mp4" type="video/mp4" />
                  Browser kamu tidak mendukung video tag.
                </video>
              </div>
              <p className="text-center text-[#FF9E80] mt-4 font-fredoka text-sm">
                *Maaf kalau suaranya pas-pasan ya hehe* ✌️
              </p>
            </div>

            {/* Footer */}
            <div className="text-center py-10">
              <p className="text-[#FF9E80] font-pacifico text-2xl">
                Senyum selalu yaa! ✨
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
