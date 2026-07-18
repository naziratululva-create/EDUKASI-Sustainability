import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Leaf, Info, AlertCircle, Check, HelpCircle } from "lucide-react";
import { AlternativeResponse } from "../types";

const PRESETS = [
  "Botol Plastik Sekali Pakai",
  "Spons Cuci Piring",
  "Tisu Dapur",
  "Kantong Belanja Kresek",
  "Wadah Makanan Styrofoam",
];

export default function AlternativesFinder() {
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AlternativeResponse | null>(null);
  const [loadingState, setLoadingState] = useState(0);

  const loadingMessages = [
    "Menganalisis rantai produksi...",
    "Mengevaluasi jejak mikroplastik...",
    "Merumuskan opsi bebas sampah terbaik...",
    "Merancang panduan DIY praktis untuk Anda...",
  ];

  const fetchAlternatives = async (queryItem: string) => {
    if (!queryItem.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    // Rotate loading messages
    const interval = setInterval(() => {
      setLoadingState((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);

    try {
      const response = await fetch("/api/alternatives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: queryItem }),
      });

      if (!response.ok) {
        throw new Error("Gagal menghubungi server AI. Silakan periksa kunci API Anda.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      setItem(queryItem);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat menghubungi server AI.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handlePresetClick = (preset: string) => {
    setItem(preset);
    fetchAlternatives(preset);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchAlternatives(item);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 md:p-8" id="alternatives-finder-card">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <span className="text-emerald-700 bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider font-display inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Solusi Cerdas AI
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mt-2 font-display tracking-tight">
          Temukan Alternatif Bebas Sampah
        </h3>
        <p className="text-stone-500 text-sm mt-2">
          Masukkan barang sekali pakai yang sering Anda gunakan, dan biarkan AI kami mencarikan alternatif berkelanjutan yang praktis, ramah lingkungan, serta hemat biaya.
        </p>
      </div>

      {/* Preset Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => handlePresetClick(preset)}
            disabled={loading}
            className="px-3.5 py-2 rounded-full text-xs font-medium border border-stone-200 text-stone-600 bg-stone-50 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
        <div className="relative flex items-center">
          <input
            type="text"
            required
            disabled={loading}
            placeholder="Cari barang (misal: Sikat gigi plastik, kantong kresek, sedotan)..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full px-5 py-4 pr-32 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50/50 text-sm"
          />
          <button
            type="submit"
            disabled={loading || !item.trim()}
            className="absolute right-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-medium text-xs hover:bg-emerald-800 transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {loading ? "Memuat..." : "Tanya AI"}
          </button>
        </div>
      </form>

      {/* States (Loading, Error, Results) */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-12 text-center"
              key="loading"
            >
              <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-700 rounded-full animate-spin mb-4" />
              <p className="text-emerald-800 font-medium text-sm font-display animate-pulse">
                {loadingMessages[loadingState]}
              </p>
              <p className="text-stone-400 text-xs mt-1">Menggunakan model cerdas Gemini 3.5 Flash</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-rose-50 border border-rose-100 text-rose-800 p-4 rounded-2xl flex items-start gap-3 text-sm my-4"
              key="error"
            >
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Kunci API Gemini Diperlukan</p>
                <p className="text-xs text-rose-700 mt-1">
                  Kunci API belum diatur atau salah. Silakan tambahkan **GEMINI_API_KEY** Anda di panel **Settings &gt; Secrets** di antarmuka Google AI Studio agar AI dapat merespons secara dinamis.
                </p>
              </div>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
              key="results"
            >
              {/* Overall Impact Panel */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100/50 rounded-2xl p-5 flex items-start gap-4">
                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-800 shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Dampak Ekologis untuk "{result.originalItem}"</h4>
                  <p className="text-stone-600 text-xs mt-1 leading-relaxed">{result.overallImpact}</p>
                </div>
              </div>

              {/* Grid of alternatives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.alternatives.map((alt, i) => (
                  <div key={i} className="border border-stone-150 rounded-2xl p-5 hover:shadow-sm transition-shadow bg-stone-50/50">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h5 className="font-bold text-stone-900 text-base flex items-center gap-2">
                        <span className="flex items-center justify-center w-5 h-5 bg-emerald-100 text-emerald-800 text-[10px] rounded-full font-mono">
                          {i + 1}
                        </span>
                        {alt.name}
                      </h5>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-white border border-stone-200 text-stone-500 font-mono">
                        Kesulitan: {alt.difficulty}
                      </span>
                    </div>
                    <p className="text-stone-600 text-xs leading-relaxed mb-3">{alt.whyBetter}</p>
                    <div className="bg-white border border-stone-100 rounded-xl p-3 text-xs text-stone-600 flex items-start gap-2">
                      <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-emerald-800 block mb-0.5">Tips Transisi:</span>
                        {alt.tips}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* DIY Option Card */}
              {result.diyOption && (
                <div className="bg-amber-50/70 border border-amber-150 rounded-2xl p-5">
                  <h5 className="font-bold text-amber-900 text-sm flex items-center gap-2 mb-2">
                    <span className="text-base">🛠️</span> Solusi DIY: {result.diyOption.title}
                  </h5>
                  <div className="text-stone-700 text-xs leading-relaxed whitespace-pre-line">
                    {result.diyOption.instructions}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Prompt reminder if no search has run */}
          {!result && !loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-dashed border-stone-200 rounded-2xl p-8 text-center text-stone-400"
              key="placeholder"
            >
              <HelpCircle className="w-8 h-8 mx-auto text-stone-300 mb-2" />
              <p className="text-xs">Belum ada pencarian. Masukkan barang sekali pakai di atas atau klik salah satu preset untuk memulai!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
