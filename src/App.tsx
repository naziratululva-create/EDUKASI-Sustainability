import { useState } from "react";
import { motion } from "motion/react";
import { Leaf, ShieldAlert, Sparkles, AlertCircle, Compass, Recycle, Trophy, HelpCircle, ChevronDown, ArrowDown } from "lucide-react";
import WasteCalculator from "./components/WasteCalculator";
import AlternativesFinder from "./components/AlternativesFinder";
import ActionPlanGenerator from "./components/ActionPlanGenerator";
import EducationalHub from "./components/EducationalHub";
import DailyWasteTracker from "./components/DailyWasteTracker";

export default function App() {
  const [activeTab, setActiveTab] = useState<"calc" | "ai" | "plan" | "log">("calc");

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9f6] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-black text-sm">
              🌱
            </div>
            <span className="font-display font-extrabold text-lg text-emerald-950 tracking-tight">
              LestariBumi
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-600">
            <button 
              onClick={() => scrollToSection("educational-hub-card")} 
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Edukasi 5R
            </button>
            <button 
              onClick={() => scrollToSection("waste-calculator-card")} 
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Kalkulator Jejak
            </button>
            <button 
              onClick={() => scrollToSection("alternatives-finder-card")} 
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Alternatif AI
            </button>
            <button 
              onClick={() => scrollToSection("action-plan-card")} 
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Tantangan 7 Hari
            </button>
            <button 
              onClick={() => scrollToSection("daily-waste-tracker-card")} 
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Catat Aksi
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100 font-mono">
              <Trophy className="w-3.5 h-3.5" /> Client Sandbox
            </span>
            <button
              onClick={() => scrollToSection("daily-waste-tracker-card")}
              className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800 transition-colors cursor-pointer shadow-xs"
            >
              Mulai Komitmen
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Campaign Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 to-teal-950 text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative absolute layouts */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-bold font-display uppercase tracking-wider"
          >
            <Leaf className="w-3.5 h-3.5" /> Kampanye Hidup Minim Sampah (Zero Waste)
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-6xl font-black font-display tracking-tight leading-tight max-w-4xl mx-auto"
          >
            Bersama Menuju <span className="text-emerald-400">Zero Waste Lifestyle</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-stone-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Indonesia memproduksi lebih dari 11.6 juta ton sampah plastik per tahun. Melalui asisten AI cerdas dan simulasi jejak anorganik mandiri ini, mari bersatu menolak plastik sekali pakai, merancang alternatif terukur, dan melog aksi hijau nyata kita demi lestarinya bumi nusantara.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3.5 pt-4"
          >
            <button
              onClick={() => scrollToSection("waste-calculator-card")}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              Kalkulator Jejak <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("alternatives-finder-card")}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors flex items-center gap-2 border border-white/15 cursor-pointer"
            >
              Konsultasi AI Cerdas <Sparkles className="w-4 h-4 text-emerald-300" />
            </button>
          </motion.div>

          {/* Key campaign statistics dashboard */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-black text-emerald-400 font-mono">11.6jt <span className="text-xs">Ton</span></div>
              <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-1">Sampah Plastik Tahunan RI</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-black text-amber-400 font-mono">91%</div>
              <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-1">Plastik Tidak Didaur Ulang</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-black text-rose-400 font-mono">450 <span className="text-xs">Thn</span></div>
              <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-1">Siklus Urai Botol Plastik</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-black text-emerald-400 font-mono">100%</div>
              <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-1">Dampak Perubahan dari Diri</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Warning Banner regarding AI Studio configuration if needed */}
        <div className="bg-amber-50 border border-amber-150 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 max-w-4xl mx-auto">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">💡 Panduan Integrasi Google AI Studio</span>
            Halaman web ini ditenagai asisten asinkron Gemini 3.5 Flash pada backend. Pastikan Anda telah mengonfigurasi **GEMINI_API_KEY** di tab **Settings &gt; Secrets** di sudut kiri bawah jika tombol interaktif AI tidak berespons.
          </div>
        </div>

        {/* Section 1: Educational Hub */}
        <section className="space-y-4">
          <EducationalHub />
        </section>

        {/* Section 2: Personal Waste Calculator */}
        <section className="space-y-4">
          <WasteCalculator />
        </section>

        {/* Section 3: AI Alternatives Finder */}
        <section className="space-y-4">
          <AlternativesFinder />
        </section>

        {/* Section 4: AI 7-Day Challenge Planner */}
        <section className="space-y-4">
          <ActionPlanGenerator />
        </section>

        {/* Section 5: Daily Commitment Log & Points Tracker */}
        <section className="space-y-4">
          <DailyWasteTracker />
        </section>

      </main>

      {/* 4. Footer */}
      <footer className="bg-stone-900 text-white border-t border-stone-800 py-12 mt-16" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              🌱
            </div>
            <span className="font-display font-bold text-sm tracking-wide">
              LestariBumi Campaign
            </span>
          </div>
          <p className="text-stone-500 text-xs max-w-xl mx-auto leading-relaxed">
            Dibuat menggunakan asisten AI pengembang web canggih Google AI Studio. Kampanye ini dirancang untuk mendidik, melatih, dan menyatukan tekad individu demi kelestarian alam hayati tanpa timbunan limbah sekali pakai.
          </p>
          <div className="text-stone-600 text-[10px] font-mono pt-4 border-t border-stone-800/80">
            © 2026 LestariBumi • Sayangi Hutan, Sungai, dan Laut Nusantara
          </div>
        </div>
      </footer>
    </div>
  );
}
