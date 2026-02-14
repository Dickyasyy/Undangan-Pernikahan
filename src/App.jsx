import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaMusic,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import {
  fotoLaki,
  fotoPerempuan,
  gabungan,
  backgroundUndangan,
  ikatan,
  lari,
  love,
  gendong,
  akadNikah,
  date,
  backsound
} from "./assets";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});

  // Target Tanggal Pernikahan
  const targetDate = new Date("2026-12-31T08:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      setTimeLeft({
        hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
        jam: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        menit: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        detik: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    const audio = document.getElementById("bg-music");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.log("Playback error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const openInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    // Kita jalankan audio langsung saat interaksi klik
    const audio = document.getElementById("bg-music");
    if (audio) {
      audio.play().catch((err) => console.log("Autoplay blocked:", err));
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen font-serif text-stone-800">
      <audio id="bg-music" loop>
        <source src={backsound} type="audio/mpeg" />
      </audio>

      {/* --- TOMBOL MUSIK FLOATING --- */}
      {isOpen && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 p-4 bg-white/70 backdrop-blur-md rounded-full shadow-xl text-stone-700 hover:scale-110 transition-all flex items-center justify-center w-12 h-12 md:w-14 md:h-14"
        >
          {/* Animasi spin hanya saat lagu berputar */}
          <div className={`${isPlaying ? "animate-spin-slow" : ""}`}>
            {isPlaying ? (
              <FaMusic className="text-red-400" />
            ) : (
              <FaPlay className="ml-1" />
            )}
          </div>
        </button>
      )}

      {/* --- COVER / OPENING --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.section
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-900 text-white text-center px-4"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundUndangan})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-sm uppercase tracking-[0.5em] mb-4">
                The Wedding Of
              </h2>
              <h1 className="text-6xl md:text-8xl font-cursive mb-6">
                Nama Mempelai Pria & Wanita{" "}
              </h1>
              <p className="mb-10 text-stone-300 tracking-widest text-lg">
                Tanggal Pernikahan
              </p>
              <button
                onClick={openInvitation}
                className="px-8 py-3 bg-white text-stone-900 rounded-full font-bold shadow-2xl hover:bg-stone-200 transition-all flex items-center gap-2 mx-auto"
              >
                <FaHeart className="text-red-500 animate-pulse" /> Buka Undangan
              </button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* --- ISI UNDANGAN --- */}
      {isOpen && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Section Nama Mempelai */}
          <section
            className="relative pt-12 pb-24 px-4 overflow-hidden bg-cover bg-center bg-fixed min-h-screen flex items-center"
            style={{ backgroundImage: `url(${backgroundUndangan})` }}
          >
            {/* Overlay dibuat sangat tipis (20%) agar background tetap dominan */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

            <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                // Perubahan: mb-16 jadi mb-8 agar jarak ke foto mempelai lebih rapat
                className="mb-8"
              >
                {/* Teks Salam */}
                <h2 className="text-3xl md:text-4xl font-cursive text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-4">
                  Assalamu’alaikum Wr. Wb.
                </h2>
                <p className="text-white font-medium italic px-6 leading-relaxed max-w-2xl mx-auto drop-shadow-md text-base md:text-lg">
                  "Maha suci Allah yang telah menciptakan mahluk-Nya
                  berpasang-pasangan. Dengan penuh sukacita, kami mengundang
                  Bapak/Ibu/Saudara/i untuk menjadi bagian dari hari istimewa
                  kami."
                </p>
              </motion.div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16">
                {/* Bagian Mempelai Pria */}
                <div className="flex-1 space-y-4">
                  {/* Ukuran foto sedikit diperkecil agar tidak makan tempat (w-36 h-36) */}
                  <div className="w-36 h-36 md:w-44 md:h-44 mx-auto rounded-full border-4 border-white shadow-2xl overflow-hidden ring-4 ring-white/20">
                    <img
                      src={fotoLaki}
                      className="w-full h-full object-cover"
                      alt="Mempelai Pria"
                    />
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 shadow-xl">
                    <h3 className="text-xl md:text-2xl font-cursive text-white font-bold drop-shadow-lg mb-2">
                      Nama Lengkap Suami Disini
                    </h3>
                    <div className="text-[10px] md:text-xs text-stone-100 uppercase tracking-widest flex flex-col gap-0">
                      <span className="opacity-80">Putra dari:</span>
                      <span className="font-bold text-white">
                        Bpk. Nama Ayah & Ibu Nama Ibu
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ikon Pemisah Tengah - Dikecilkan ukurannya */}
                <motion.div
                  className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center my-[-10px] md:my-0"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src={ikatan}
                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    alt="Pemisah"
                  />
                </motion.div>

                {/* Bagian Mempelai Wanita */}
                <div className="flex-1 space-y-4">
                  <div className="w-36 h-36 md:w-44 md:h-44 mx-auto rounded-full border-4 border-white shadow-2xl overflow-hidden ring-4 ring-white/20">
                    <img
                      src={fotoPerempuan}
                      className="w-full h-full object-cover"
                      alt="Mempelai Wanita"
                    />
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 shadow-xl">
                    <h3 className="text-xl md:text-2xl font-cursive text-white font-bold drop-shadow-lg mb-2">
                      Nama Lengkap Istri Disini
                    </h3>
                    <div className="text-[10px] md:text-xs text-stone-100 uppercase tracking-widest flex flex-col gap-0">
                      <span className="opacity-80">Putri dari:</span>
                      <span className="font-bold text-white">
                        Bpk. Nama Ayah & Ibu Nama Ibu
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Countdown */}
          <section className="relative bg-stone-900 text-white py-24 text-center px-4 overflow-hidden shadow-inner">
            {/* --- FOTO DEKORASI ANIMASI --- */}

            {/* Foto 1: Kiri Atas */}
            <motion.img
              src={lari}
              alt="lari"
              className="absolute -top-10 -left-10 w-40 h-40 md:w-64 md:h-64 object-contain opacity-40 z-0"
              animate={{
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Foto 2: Kanan Bawah */}
            <motion.img
              src={gendong}
              alt="gendong"
              className="absolute -bottom-10 -right-10 w-40 h-40 md:w-64 md:h-64 object-contain opacity-40 z-0"
              animate={{
                y: [0, -20, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* --- ISI KONTEN --- */}
            <div className="relative z-10 max-w-4xl mx-auto">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-cursive mb-12 text-stone-200 italic drop-shadow-lg"
              >
                Menuju Hari Bahagia
              </motion.h3>

              <div className="flex justify-center gap-3 md:gap-8">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <motion.div
                    key={unit}
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Box Countdown dengan Glassmorphism yang lebih gelap */}
                    <div className="text-3xl md:text-5xl font-bold bg-white/5 w-20 h-24 md:w-28 md:h-32 flex items-center justify-center rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
                      {value || 0}
                    </div>
                    <span className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-400 font-semibold">
                      {unit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Section Acara */}
          <section className="relative py-32 px-4 overflow-hidden min-h-[700px] flex items-center justify-center">
            {/* --- ANIMASI BACKGROUND FULL --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <motion.img
                src={akadNikah}
                alt="background-animasi"
                className="w-full h-full object-cover opacity-10"
                animate={{
                  y: [-30, 30, -30],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto w-full">
              {/* Grid dengan gap lebih besar agar background lebih terekspos */}
              <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center justify-items-center">
                {/* Kartu Akad Nikah */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  /* ANIMASI HOVER: Membesar, Mengangkat, & Shadow lebih tajam */
                  whileHover={{
                    scale: 1.05,
                    y: -15,
                    shadow: "0px 20px 40px rgba(0,0,0,0.2)",
                  }}
                  className="w-full max-w-[320px] p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl text-center border-b-4 border-stone-200 cursor-pointer transition-shadow duration-300"
                >
                  <div className="mb-4 inline-block p-3 bg-stone-50 rounded-full mx-auto">
                    <FaCalendarAlt className="text-2xl text-stone-400" />
                  </div>
                  <h4 className="text-xl font-bold tracking-[0.2em] mb-3 uppercase text-stone-800">
                    Akad Nikah
                  </h4>
                  <div className="space-y-1 text-stone-600 text-sm md:text-base">
                    <p className="font-medium text-stone-500">Tanggal Acara</p>
                    <p className="font-bold text-xl text-stone-800 my-3">
                      Jam Acara
                    </p>
                    <div className="h-[1px] w-12 bg-stone-200 mx-auto my-3"></div>
                    <p className="text-stone-400 italic text-sm">
                      Tempat Acara
                    </p>
                  </div>
                </motion.div>

                {/* Kartu Resepsi */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  /* ANIMASI HOVER: Membesar & Efek cahaya pada card gelap */
                  whileHover={{
                    scale: 1.05,
                    y: -15,
                    boxShadow: "0px 15px 35px rgba(0,0,0,0.5)",
                  }}
                  className="w-full max-w-[320px] p-8 bg-stone-900/80 backdrop-blur-md text-white rounded-3xl shadow-xl text-center cursor-pointer transition-shadow duration-300 border border-white/10"
                >
                  <div className="mb-4 inline-block p-3 bg-white/10 rounded-full mx-auto">
                    <FaMapMarkerAlt className="text-2xl text-stone-400" />
                  </div>
                  <h4 className="text-xl font-bold tracking-[0.2em] mb-3 uppercase text-stone-200">
                    Resepsi
                  </h4>
                  <div className="space-y-1 text-sm md:text-base">
                    <p className="font-medium text-stone-400">Tanggal Acara</p>
                    <p className="font-bold text-xl text-white my-3">
                      Jam Acara
                    </p>
                    <div className="h-[1px] w-12 bg-white/20 mx-auto my-3"></div>
                    <p className="text-stone-400 italic text-sm">
                      Tempat Acara
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Footer RSVP */}
          <footer className="w-full bg-stone-100">
            {/* Container dengan Aspect Ratio Foto Asli 827/687 */}
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "827 / 687" }}
            >
              {/* Foto Background - Full & Terang */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${date})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>

              {/* Konten Teks di Tengah Foto */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  // Gaya Glassmorphism konsisten dengan bagian atas
                  className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20 shadow-xl max-w-lg"
                >
                  {/* Teks Putih dengan Drop Shadow konsisten dengan gaya Nama Mempelai */}
                  <h2 className="text-4xl md:text-6xl font-cursive text-white font-bold drop-shadow-lg mb-6">
                    Terima Kasih
                  </h2>

                  <p className="text-white font-medium italic mb-8 text-sm md:text-lg leading-relaxed drop-shadow-md opacity-90">
                    "Kehadiran dan doa restu Bapak/Ibu/Saudara/i merupakan
                    kebahagiaan bagi kami."
                  </p>

                  <a
                    href="https://wa.me/6289636758016?text=Halo Nama mempelai, saya akan datang ke pernikahan kalian!"
                    className="inline-flex items-center gap-3 bg-white text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-stone-100 transition-all shadow-lg active:scale-95 text-sm md:text-base"
                  >
                    <FaWhatsapp className="text-xl text-green-600" />
                    Konfirmasi Kehadiran
                  </a>

                  <div className="mt-12 md:mt-16 text-[9px] md:text-[10px] text-stone-100 uppercase tracking-[0.4em] font-bold opacity-70">
                    Created with ❤️ by Dicky
                  </div>
                </motion.div>
              </div>
            </div>
          </footer>
        </motion.main>
      )}
    </div>
  );
};

export default App;
