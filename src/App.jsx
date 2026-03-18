import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  FaHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMusic,
  FaWhatsapp,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaUserFriends,
  FaBuilding,
  FaImages,
  FaGift,
  FaCommentDots,
  FaQrcode,
  FaTimes,
} from "react-icons/fa";
import backsound from "./assets/musik/Janji Suci.mp3";

const assets = {
  bgFloral:
    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1920&auto=format&fit=cover",
  bgCover:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1920&auto=format&fit=cover",
  fotoPria:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=cover",
  fotoWanita:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=cover",
  backsound: backsound,
};

// --- COMPONENTS ---
const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    Hari: 0,
    Jam: 0,
    Menit: 0,
    Detik: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          Hari: Math.floor(distance / (1000 * 60 * 60 * 24)),
          Jam: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          Menit: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          Detik: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 mt-6">
      {Object.entries(timeLeft).map(([label, value]) => (
        <motion.div
          key={label}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.2,
          }}
          className="text-center"
        >
          <div className="bg-white/30 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-lg text-lg font-bold border border-white/40 text-stone-800">
            {value}
          </div>
          <p className="text-[10px] uppercase mt-1 opacity-70 tracking-widest text-stone-600">
            {label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

const GlassCard = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`bg-white/40 backdrop-blur-sm border border-white/60 shadow-xl rounded-[40px] p-8 md:p-12 ${className}`}
  >
    {children}
  </motion.div>
);

// Season Navigation Component
const SeasonNav = ({ activeSeason, setActiveSeason, scrollToSection }) => {
  const menuItems = [
    { id: 1, name: "Profil", icon: FaUserFriends, section: "profil" },
    { id: 2, name: "Acara", icon: FaBuilding, section: "acara" },
    { id: 3, name: "Galeri", icon: FaImages, section: "galeri" },
    { id: 4, name: "RSVP", icon: FaGift, section: "rsvp" },
    { id: 5, name: "Ucapan", icon: FaCommentDots, section: "ucapan" },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-lg border-t border-white/40 shadow-2xl"
    >
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.section)}
              className={`p-3 rounded-2xl transition-all duration-500 ${
                activeSeason === item.id
                  ? "bg-[#D4AF37] text-white scale-110 shadow-lg"
                  : "text-stone-600 hover:text-[#D4AF37] hover:bg-white/40"
              }`}
            >
              <item.icon size={24} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Pulsing Button Component (lebih lambat dari buka undangan)
const PulsingButton = ({ children, onClick, className = "", icon: Icon }) => {
  return (
    <motion.button
      onClick={onClick}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
      }}
      className={className}
    >
      {Icon && <Icon className="inline-block mr-2" />}
      {children}
    </motion.button>
  );
};

// Particle Effect Component untuk Cover
const CoverParticleEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0,
            scale: 0.5 + Math.random() * 0.8,
          }}
          animate={{
            y: window.innerHeight + 100,
            x: `calc(${Math.random() * 100}vw + ${Math.random() * 100}px)`,
            rotate: 360,
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          {i % 3 === 0 ? "🌸" : i % 3 === 1 ? "🌺" : "🌸"}
        </motion.div>
      ))}
    </div>
  );
};

// QR Code Modal Component
const QRCodeModal = ({ guestName, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="bg-white/20 backdrop-blur-xl p-6 rounded-[40px] border border-white/40 shadow-2xl max-w-xs w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-bold text-lg">Check In</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl mb-4">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CheckIn-${guestName}-${new Date().toISOString()}`}
            alt="QR Check In"
            className="w-full h-auto"
          />
        </div>

        <p className="text-white text-center text-sm mb-2">
          Nama: <span className="font-bold">{guestName}</span>
        </p>
        <p className="text-white/70 text-center text-xs">
          Scan QR code untuk check in
        </p>
      </motion.div>
    </motion.div>
  );
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [wishName, setWishName] = useState("");
  const [wishMessage, setWishMessage] = useState("");
  const [activeSeason, setActiveSeason] = useState(1);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showCoverEffect, setShowCoverEffect] = useState(true);
  const [allWishes, setAllWishes] = useState(() => {
    const saved = localStorage.getItem("wedding_wishes");
    return saved ? JSON.parse(saved) : [];
  });

  // Refs for scrolling
  const profilRef = useRef(null);
  const acaraRef = useRef(null);
  const galeriRef = useRef(null);
  const rsvpRef = useRef(null);
  const ucapanRef = useRef(null);

  const scrollToSection = (section) => {
    const refs = {
      profil: profilRef,
      acara: acaraRef,
      galeri: galeriRef,
      rsvp: rsvpRef,
      ucapan: ucapanRef,
    };

    const sectionIds = {
      profil: 1,
      acara: 2,
      galeri: 3,
      rsvp: 4,
      ucapan: 5,
    };

    setActiveSeason(sectionIds[section]);
    refs[section].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Intersection Observer untuk update active season berdasarkan scroll
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section");
          const sectionMap = {
            profil: 1,
            acara: 2,
            galeri: 3,
            rsvp: 4,
            ucapan: 5,
          };
          setActiveSeason(sectionMap[sectionId] || 1);
        }
      });
    }, options);

    const sections = [profilRef, acaraRef, galeriRef, rsvpRef, ucapanRef];
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [isOpen]);

  const handleSendWish = (e) => {
    e.preventDefault();
    if (wishName && wishMessage) {
      const now = new Date();
      const optionsDate = { day: "numeric", month: "long", year: "numeric" };
      const optionsTime = { hour: "2-digit", minute: "2-digit" };

      const newWish = {
        name: wishName,
        message: wishMessage,
        time: `${now.toLocaleDateString(
          "id-ID",
          optionsDate
        )} • ${now.toLocaleTimeString("id-ID", optionsTime)}`,
      };

      const updatedWishes = [newWish, ...allWishes];
      setAllWishes(updatedWishes);
      localStorage.setItem("wedding_wishes", JSON.stringify(updatedWishes));
      setWishName("");
      setWishMessage("");
    }
  };

  const handleDeleteWish = (indexToDelete) => {
    const updatedWishes = allWishes.filter(
      (_, index) => index !== indexToDelete
    );
    setAllWishes(updatedWishes);
    localStorage.setItem("wedding_wishes", JSON.stringify(updatedWishes));
  };

  const galleryImages = [
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800",
    "https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?q=80&w=800",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800",
  ];

  const audioRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to");
    if (name) {
      setGuestName(decodeURIComponent(name).replace(/\+/g, " "));
    }
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setShowCoverEffect(false);
    setIsPlaying(true);

    // Confetti yang lebih meriah
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: [
        "#D4AF37",
        "#ffffff",
        "#c81919",
        "#4CAF50",
        "#FF69B4",
        "#4169E1",
      ],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Confetti tambahan dari samping
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 },
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 },
      });
    }, 200);

    setTimeout(() => audioRef.current?.play(), 500);
  };

  return (
    <div className="min-h-screen text-stone-800 font-serif overflow-x-hidden relative bg-stone-100">
      <audio ref={audioRef} loop src={assets.backsound} />

      {/* Background Floral */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${assets.bgFloral})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-white/10"></div>
        </motion.div>
      )}

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRCode && (
          <QRCodeModal
            guestName={guestName}
            onClose={() => setShowQRCode(false)}
          />
        )}
      </AnimatePresence>

      {/* Cover Section */}
      <AnimatePresence>
        {!isOpen && (
          <motion.section
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col md:flex-row bg-gradient-to-br from-pink-400 via-pink-300 to-pink-200 overflow-hidden"
          >
            <div className="absolute inset-0 md:relative md:w-7/12 h-full">
              <img
                src={assets.bgCover}
                className="w-full h-full object-cover opacity-60 md:opacity-100"
                alt="Cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-pink-600/50 via-transparent to-transparent"></div>
            </div>
            <CoverParticleEffect />
            <div className="relative w-full md:w-5/12 h-full flex flex-col items-center justify-center p-8 text-center z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="tracking-[0.5em] text-[10px] mb-4 text-red-600 uppercase font-bold"
                >
                  Wedding Invitation
                </motion.p>
                <motion.h1
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.6,
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                  }}
                  className="text-6xl md:text-7xl font-cursive mb-6 text-black"
                >
                  Dicky & Kakak
                </motion.h1>
                <div className="mb-8">
                  <p className="text-xs opacity-60 mb-2 text-black">
                    Kepada Yth. Bapak/Ibu/Saudara/i
                  </p>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-2xl font-bold italic text-red-600"
                  >
                    {guestName}
                  </motion.h2>
                </div>
                <motion.button
                  onClick={handleOpen}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 mx-auto uppercase text-xs tracking-widest hover:bg-red-700 transition-colors"
                >
                  <FaHeart className="text-white" /> Buka Undangan
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {isOpen && (
        <main className="relative z-20 pt-16 pb-20 px-4 space-y-12">
          {/* Section 1: PENYAMBUTAN */}
          <section
            ref={profilRef}
            data-section="profil"
            className="max-w-4xl mx-auto scroll-mt-20"
          >
            <GlassCard className="text-center !pt-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
              >
                <FaHeart className="mx-auto text-3xl text-[#c81919] mb-6 animate-pulse" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-sm tracking-[0.4em] uppercase mb-8 font-bold text-black opacity-80"
              >
                Undangan Pernikahan
              </motion.p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-12 mb-12">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="text-6xl md:text-7xl font-cursive text-black"
                >
                  Dicky
                </motion.h1>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                  className="text-5xl font-cursive text-black opacity-30 my-2"
                >
                  &
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-6xl md:text-7xl font-cursive text-black"
                >
                  Kakak
                </motion.h1>
              </div>
              <div className="border-t border-b border-stone-400/50 py-8 my-8">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-sm tracking-[0.2em] mb-2 font-bold uppercase text-black"
                >
                  Senin, 17 Agustus 2026
                </motion.p>
                <Countdown targetDate="2026-08-17T08:00:00" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-black italic"
              >
                <p className="text-xs uppercase tracking-widest mb-1 font-bold opacity-60">
                  Spesial untuk:
                </p>
                <p className="text-2xl font-bold not-italic text-black">
                  {guestName}
                </p>
              </motion.div>
            </GlassCard>
          </section>

          {/* Section 2: AR-RUM */}
          <section className="max-w-4xl mx-auto">
            <GlassCard className="text-center space-y-6">
              <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-2xl md:text-3xl font-serif leading-relaxed text-black font-semibold"
                dir="rtl"
              >
                وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ
                اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ
                مَّوَدَّةً وَّرَحْمَةً ۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ
                يَّتَفَكَّرُوْنَ
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-sm italic text-stone-900 leading-relaxed px-4 font-medium"
              >
                "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
                pasangan-pasangan untukmu dari jenismu sendiri..."
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xs font-bold tracking-widest text-black uppercase opacity-60"
              >
                — QS. Ar-Rum: 21 —
              </motion.p>
            </GlassCard>
          </section>

          {/* Section 3: PROFIL */}
          <section className="max-w-4xl mx-auto">
            <GlassCard className="text-center space-y-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-4xl font-cursive text-black"
              >
                Assalamu’alaikum Wr. Wb.
              </motion.h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
                  className="text-center"
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    src={assets.fotoPria}
                    className="w-36 h-36 rounded-full border-4 border-white shadow-2xl mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-4xl font-cursive text-black">
                    Dicky Assidiq
                  </h3>
                  <p className="text-xs mt-3 font-bold text-black uppercase tracking-widest">
                    Putra dari:
                  </p>
                  <p className="text-sm font-medium text-stone-900">
                    Bpk. Indra & Ibu Nur
                  </p>
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                  className="text-5xl font-cursive text-black opacity-30"
                >
                  &
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
                  className="text-center"
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    src={assets.fotoWanita}
                    className="w-36 h-36 rounded-full border-4 border-white shadow-2xl mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-4xl font-cursive text-black">Kakak</h3>
                  <p className="text-xs mt-3 font-bold text-black uppercase tracking-widest">
                    Putri dari:
                  </p>
                  <p className="text-sm font-medium text-stone-900">
                    Bpk. Yusuf & Ibu Maria
                  </p>
                </motion.div>
              </div>
            </GlassCard>
          </section>

          {/* Section 4: ACARA */}
          <section
            ref={acaraRef}
            data-section="acara"
            className="max-w-4xl mx-auto scroll-mt-20"
          >
            <GlassCard className="text-center space-y-10">
              <div className="space-y-4">
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                >
                  <FaCalendarAlt className="mx-auto text-3xl text-black opacity-60 mb-2" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-cursive text-black"
                >
                  Rangkaian Acara
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-sm font-bold tracking-[0.2em] text-stone-600 uppercase"
                >
                  Senin, 17 Agustus 2026
                </motion.p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/40 border border-white/60 p-6 rounded-[30px] shadow-sm"
                >
                  <h4 className="text-2xl font-cursive text-black mb-4">
                    Akad Nikah
                  </h4>
                  <div className="space-y-1 text-sm text-stone-800">
                    <p className="font-bold">08:00 - 10:00 WIB</p>
                    <p>Gedung Graha Medika</p>
                    <p className="opacity-70">
                      Jl. Raya Gresik No. 123, Jawa Timur
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/40 border border-white/60 p-6 rounded-[30px] shadow-sm"
                >
                  <h4 className="text-2xl font-cursive text-black mb-4">
                    Resepsi
                  </h4>
                  <div className="space-y-1 text-sm text-stone-800">
                    <p className="font-bold">11:00 WIB - Selesai</p>
                    <p>Gedung Graha Medika</p>
                    <p className="opacity-70">
                      Jl. Raya Gresik No. 123, Jawa Timur
                    </p>
                  </div>
                </motion.div>
              </div>

              <PulsingButton
                onClick={() => window.open("https://maps.google.com", "_blank")}
                className="bg-black text-white px-10 py-3 rounded-full font-bold shadow-xl flex items-center gap-3 mx-auto uppercase text-xs tracking-widest hover:bg-stone-800 transition-colors"
                icon={FaMapMarkerAlt}
              >
                Lihat Lokasi
              </PulsingButton>
            </GlassCard>
          </section>

          {/* Section 5: GALERI & LIVE STREAMING */}
          <section
            ref={galeriRef}
            data-section="galeri"
            className="max-w-4xl mx-auto scroll-mt-20"
          >
            <GlassCard className="text-center space-y-10">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-cursive text-black mb-2"
                >
                  Galeri Bahagia
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-xs tracking-widest text-stone-600 uppercase font-bold"
                >
                  Momen Indah Kami
                </motion.p>
              </div>

              <div className="relative w-full overflow-hidden">
                <div
                  id="gallery-slider"
                  className="flex overflow-x-auto gap-4 px-10 scroll-smooth py-2 no-scrollbar"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <style>{`
                    #gallery-slider::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>

                  {galleryImages.map((img, index) => (
                    <motion.img
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      src={img}
                      onClick={() => setSelectedPhoto(index)}
                      className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl cursor-pointer transition-all duration-300 flex-shrink-0 border-2 ${
                        selectedPhoto === index
                          ? "border-black scale-105 shadow-md"
                          : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                      alt={`Thumb ${index}`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative group aspect-[4/5] md:aspect-video rounded-[30px] overflow-hidden border-8 border-white shadow-2xl">
                <motion.img
                  key={selectedPhoto}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={galleryImages[selectedPhoto]}
                  className="w-full h-full object-cover"
                  alt="Foto Utama"
                />

                <button
                  onClick={() => {
                    const newIndex =
                      selectedPhoto > 0
                        ? selectedPhoto - 1
                        : galleryImages.length - 1;
                    setSelectedPhoto(newIndex);
                    document
                      .getElementById("gallery-slider")
                      .scrollBy({ left: -100, behavior: "smooth" });
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full text-black hover:bg-black hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100 hidden md:flex"
                >
                  <FaChevronLeft size={18} />
                </button>

                <button
                  onClick={() => {
                    const newIndex =
                      selectedPhoto < galleryImages.length - 1
                        ? selectedPhoto + 1
                        : 0;
                    setSelectedPhoto(newIndex);
                    document
                      .getElementById("gallery-slider")
                      .scrollBy({ left: 100, behavior: "smooth" });
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full text-black hover:bg-black hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100 hidden md:flex"
                >
                  <FaChevronRight size={18} />
                </button>

                <div className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2">
                  <button
                    onClick={() => {
                      const newIndex =
                        selectedPhoto > 0
                          ? selectedPhoto - 1
                          : galleryImages.length - 1;
                      setSelectedPhoto(newIndex);
                      document
                        .getElementById("gallery-slider")
                        .scrollBy({ left: -80, behavior: "smooth" });
                    }}
                    className="bg-white/60 p-2 rounded-full backdrop-blur-sm"
                  >
                    <FaChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => {
                      const newIndex =
                        selectedPhoto < galleryImages.length - 1
                          ? selectedPhoto + 1
                          : 0;
                      setSelectedPhoto(newIndex);
                      document
                        .getElementById("gallery-slider")
                        .scrollBy({ left: 80, behavior: "smooth" });
                    }}
                    className="bg-white/60 p-2 rounded-full backdrop-blur-sm"
                  >
                    <FaChevronRight size={14} />
                  </button>
                </div>
              </div>

              <hr className="border-stone-300" />

              <div className="space-y-6">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase"
                >
                  Live Streaming
                </motion.div>
                <h3 className="text-2xl font-cursive text-black">
                  Saksikan Momen Suci Kami
                </h3>
                <div className="aspect-video rounded-[30px] overflow-hidden shadow-2xl border-4 border-white bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* Section 6: RSVP & DIGITAL GIFT */}
          <section
            ref={rsvpRef}
            data-section="rsvp"
            className="max-w-4xl mx-auto scroll-mt-20"
          >
            <GlassCard className="text-center space-y-12">
              <div className="space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 150 }}
                  className="inline-flex items-center gap-2 bg-stone-100 text-stone-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                >
                  Reservation
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-cursive text-black"
                >
                  Konfirmasi Kehadiran
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-sm text-stone-600 max-w-md mx-auto"
                >
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                  Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
                </motion.p>
                <PulsingButton
                  onClick={() =>
                    window.open(
                      `https://wa.me/6289636758016?text=Halo%20Dicky,%20Saya%20ingin%20konfirmasi%20kehadiran%20di%20acara%20pernikahan%20anda.%0A%0ANama:%20%0AJumlah%20Hadir:%20`,
                      "_blank"
                    )
                  }
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all"
                  icon={FaWhatsapp}
                >
                  Konfirmasi via WhatsApp
                </PulsingButton>
              </div>

              <hr className="border-stone-200 w-1/2 mx-auto" />

              <div className="space-y-8">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-cursive text-black mb-2"
                  >
                    Kado Digital
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xs tracking-widest text-stone-500 uppercase font-bold"
                  >
                    Love Gift
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/50 p-6 rounded-[25px] border border-stone-200 shadow-sm space-y-4"
                  >
                    <div className="h-8 flex items-center justify-center italic font-serif font-black text-blue-700 text-2xl">
                      DANA
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-stone-500 uppercase font-bold tracking-tighter">
                        Nomor Dana
                      </p>
                      <p className="text-xl font-mono font-bold text-blue-600">
                        089636758016
                      </p>
                      <p className="text-sm font-medium text-stone-700">
                        a.n Dicky
                      </p>
                    </div>
                    <div className="bg-white p-2 inline-block rounded-xl border border-stone-100 shadow-inner">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=089636758016`}
                        alt="QR Dana"
                        className="w-32 h-32"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/50 p-6 rounded-[25px] border border-stone-200 shadow-sm space-y-4"
                  >
                    <div className="h-8 flex items-center justify-center italic font-serif font-black text-emerald-700 text-2xl">
                      BSI
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-stone-500 uppercase font-bold tracking-tighter">
                        Nomor Rekening
                      </p>
                      <p className="text-xl font-mono font-bold text-emerald-700 underline decoration-dotted">
                        7123456789
                      </p>
                      <p className="text-sm font-medium text-stone-700">
                        a.n Dicky
                      </p>
                    </div>
                    <div className="bg-white p-2 inline-block rounded-xl border border-stone-100 shadow-inner">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=7123456789`}
                        alt="QR BSI"
                        className="w-32 h-32"
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-[10px] text-black font-medium italic"
                >
                  *Terima kasih atas doa restu dan tanda kasih
                  Bapak/Ibu/Saudara/i sekalian.
                </motion.p>
              </div>
            </GlassCard>
          </section>

          {/* Section 7: UCAPAN & DOA */}
          <section
            ref={ucapanRef}
            data-section="ucapan"
            className="max-w-4xl mx-auto scroll-mt-20"
          >
            <GlassCard className="space-y-10">
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-cursive text-black mb-2"
                >
                  Ucapan & Doa
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-xs tracking-widest text-stone-500 uppercase font-bold"
                >
                  Berikan Doa Restu Anda
                </motion.p>
              </div>

              <form onSubmit={handleSendWish} className="space-y-4">
                <motion.input
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  type="text"
                  placeholder="Nama Anda"
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl bg-white/50 border border-stone-200 focus:outline-none focus:border-stone-400 text-sm"
                  required
                />
                <motion.textarea
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  placeholder="Berikan ucapan dan doa restu..."
                  value={wishMessage}
                  onChange={(e) => setWishMessage(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl bg-white/50 border border-stone-200 focus:outline-none focus:border-stone-400 text-sm h-32"
                  required
                ></motion.textarea>
                <PulsingButton
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-full font-bold shadow-lg hover:bg-stone-800 transition-all text-xs uppercase tracking-widest"
                >
                  Kirim Ucapan
                </PulsingButton>
              </form>

              <div className="max-h-[280px] overflow-y-auto pr-2 space-y-4 no-scrollbar scroll-smooth">
                <style>{`
                  .no-scrollbar::-webkit-scrollbar { display: none; }
                `}</style>

                {allWishes.length === 0 ? (
                  <p className="text-center text-stone-400 italic text-sm">
                    Belum ada ucapan...
                  </p>
                ) : (
                  allWishes.map((wish, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      key={index}
                      className="p-5 rounded-2xl bg-white/60 border border-white shadow-sm text-left relative group"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1 pr-8">
                        <div>
                          <h4 className="font-bold text-black text-sm">
                            {wish.name}
                          </h4>
                          <span className="text-[9px] text-stone-400 uppercase tracking-tighter">
                            {wish.time}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteWish(index)}
                          className="absolute top-4 right-4 text-stone-300 hover:text-red-500 transition-colors p-2"
                          title="Hapus ucapan"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>

                      <p className="text-sm text-stone-700 italic leading-relaxed">
                        "{wish.message}"
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </GlassCard>
          </section>

          {/* Section 8: UCAPAN TERIMA KASIH */}
          <section className="max-w-4xl mx-auto px-4">
            <GlassCard className="p-0 overflow-hidden rounded-[40px] shadow-2xl border border-white/60 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
                <div className="relative h-64 md:h-auto min-h-[350px]">
                  <motion.img
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=cover"
                    alt="Mempelai"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 md:to-transparent"></div>
                </div>

                <div className="bg-white p-10 md:p-16 text-center space-y-6 flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <FaHeart className="text-3xl text-[#c81919] mb-2" />
                  </motion.div>

                  <div className="space-y-2">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-[10px] uppercase tracking-[0.5em] font-bold text-stone-400"
                    >
                      Final Greeting
                    </motion.p>
                    <motion.h2
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-5xl font-cursive text-black italic"
                    >
                      Terima Kasih
                    </motion.h2>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-sm text-stone-700 leading-relaxed font-medium max-w-sm"
                  >
                    Atas kehadiran, doa restu, dan tanda kasih dari
                    Bapak/Ibu/Saudara/i sekalian, kami sekeluarga mengucapkan
                    terima kasih yang tak terhingga.
                  </motion.p>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="w-16 h-[1px] bg-stone-200"
                  ></motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-xs text-stone-500 italic px-4"
                  >
                    "Semoga Allah memberkahi kalian dan melimpahkan berkah atas
                    kalian serta menghimpun kalian berdua dalam kebaikan."
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="pt-8"
                  >
                    <p className="text-3xl font-cursive text-black">
                      Dicky & Kakak
                    </p>
                  </motion.div>
                </div>
              </div>
            </GlassCard>
          </section>

          <footer className="text-center py-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] tracking-[0.5em] uppercase text-black font-bold opacity-40"
            >
              Handcrafted by Dickyasyy
            </motion.p>
          </footer>
        </main>
      )}

      {/* Season Navigation */}
      {isOpen && (
        <SeasonNav
          activeSeason={activeSeason}
          setActiveSeason={setActiveSeason}
          scrollToSection={scrollToSection}
        />
      )}

      {/* Musik Toggle & QR Code Button */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2">
          {/* QR Code Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={() => setShowQRCode(true)}
            className="w-10 h-10 bg-white/20 backdrop-blur-md shadow-2xl rounded-full flex items-center justify-center text-[#D4AF37] border border-white/40 hover:bg-white/30 transition-all"
          >
            <FaQrcode size={16} />
          </motion.button>

          {/* Tombol Musik */}
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              isPlaying ? audioRef.current.pause() : audioRef.current.play();
            }}
            className="w-12 h-12 bg-white/20 backdrop-blur-md shadow-2xl rounded-full flex items-center justify-center text-[#D4AF37] border border-white/40 hover:bg-white/30 transition-all"
          >
            <FaMusic className={isPlaying ? "animate-spin-slow" : ""} />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
