import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, CheckSquare, Award, AlertCircle, ChevronDown, ChevronUp, Check, ShieldCheck } from "lucide-react";
import { ActionPlanResponse, ActionPlanDay } from "../types";

export default function ActionPlanGenerator() {
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [kitchen, setKitchen] = useState(true);
  const [bathroom, setBathroom] = useState(false);
  const [shopping, setShopping] = useState(true);
  const [work, setWork] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<ActionPlanResponse | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setPlan(null);
    setCompletedDays([]);

    const focusAreas = [];
    if (kitchen) focusAreas.push("Dapur");
    if (bathroom) focusAreas.push("Kamar Mandi");
    if (shopping) focusAreas.push("Belanja Harian");
    if (work) focusAreas.push("Tempat Kerja / Sekolah");

    try {
      const response = await fetch("/api/action-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, focusAreas }),
      });

      if (!response.ok) {
        throw new Error("Gagal memanggil server AI. Silakan periksa kunci API Anda.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setPlan(data);
      if (data.days && data.days.length > 0) {
        setExpandedDay(data.days[0].dayNumber);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Gagal membuat rencana aksi.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDayCompleted = (dayNum: number) => {
    setCompletedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const toggleExpandDay = (dayNum: number) => {
    setExpandedDay((prev) => (prev === dayNum ? null : dayNum));
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 md:p-8" id="action-plan-card">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <span className="text-emerald-700 bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider font-display inline-flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" /> Personalisasi Gaya Hidup
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mt-2 font-display tracking-tight">
          Generator Tantangan Minim Sampah 7 Hari
        </h3>
        <p className="text-stone-500 text-sm mt-2">
          Pilih kesiapan diri dan area fokus rumah Anda. AI akan merancang 7 misi harian yang relevan, menantang, serta berdampak langsung.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Setup Parameters Panel */}
        <div className="lg:col-span-4 bg-stone-50 border border-stone-100 rounded-2xl p-5 space-y-6">
          <h4 className="text-stone-800 font-semibold text-sm font-display pb-2 border-b border-stone-200">
            Atur Parameter Tantangan
          </h4>

          {/* Difficulty Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-600 block uppercase tracking-wider font-mono">
              Tingkat Kemampuan
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-stone-200/50 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setLevel("beginner")}
                className={`py-2 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                  level === "beginner" ? "bg-emerald-700 text-white shadow-sm" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Pemula
              </button>
              <button
                type="button"
                onClick={() => setLevel("intermediate")}
                className={`py-2 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                  level === "intermediate" ? "bg-emerald-700 text-white shadow-sm" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Menengah
              </button>
              <button
                type="button"
                onClick={() => setLevel("advanced")}
                className={`py-2 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                  level === "advanced" ? "bg-emerald-700 text-white shadow-sm" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Ahli
              </button>
            </div>
          </div>

          {/* Focus Area Multi-Checklist */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-stone-600 block uppercase tracking-wider font-mono">
              Area Fokus Kampanye
            </label>

            <div className="space-y-2.5">
              <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kitchen}
                  onChange={(e) => setKitchen(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4 accent-emerald-700"
                />
                <span>🍳 Dapur (Kompos, sisa makanan)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bathroom}
                  onChange={(e) => setBathroom(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4 accent-emerald-700"
                />
                <span>🧼 Kamar Mandi (Plastik sabun, sikat gigi)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shopping}
                  onChange={(e) => setShopping(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4 accent-emerald-700"
                />
                <span>🛍️ Belanja Harian (Tas belanja, kemasan)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={work}
                  onChange={(e) => setWork(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4 accent-emerald-700"
                />
                <span>💻 Kantor / Sekolah (Botol air, tumbler)</span>
              </label>
            </div>
          </div>

          <button
            type="button"
            disabled={loading || (!kitchen && !bathroom && !shopping && !work)}
            onClick={handleGenerate}
            className="w-full py-3 px-4 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Menyusun Rencana..." : "Buat Tantangan 7 Hari"}
          </button>
        </div>

        {/* Challenge Board Panel */}
        <div className="lg:col-span-8 space-y-4 min-h-[300px]">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full py-16 text-center"
                key="plan-loading"
              >
                <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-700 rounded-full animate-spin mb-3" />
                <p className="text-emerald-800 font-medium text-sm font-display animate-pulse">
                  AI sedang menyusun tantangan {level} harian Anda...
                </p>
                <p className="text-stone-400 text-xs mt-1">Menggunakan parameter ramah lingkungan berbasis sains.</p>
              </motion.div>
            )}

            {error && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-rose-50 border border-rose-100 text-rose-800 p-4 rounded-2xl flex items-start gap-3 text-sm"
                key="plan-error"
              >
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Koneksi AI Terputus</p>
                  <p className="text-xs text-rose-700 mt-1">
                    Silakan pastikan Anda telah menyetel **GEMINI_API_KEY** di tab **Settings &gt; Secrets** untuk menggunakan AI Coach ini.
                  </p>
                </div>
              </motion.div>
            )}

            {plan && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
                key="plan-board"
              >
                {/* Header Information */}
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm font-display">
                    <ShieldCheck className="w-5 h-5" />
                    {plan.title || "Tantangan 7 Hari Kehidupan Berkelanjutan"}
                  </div>
                  <p className="text-stone-600 text-xs mt-1 leading-relaxed">{plan.summary}</p>

                  {/* Achievements and progress */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-emerald-100/70">
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-medium text-stone-500">Progres Tantangan:</div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                          <div
                            key={num}
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold font-mono border transition-all ${
                              completedDays.includes(num)
                                ? "bg-emerald-700 text-white border-emerald-700"
                                : "bg-white text-stone-400 border-stone-200"
                            }`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs font-bold text-emerald-800 bg-white border border-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      {completedDays.length} / 7 Selesai
                    </div>
                  </div>
                </div>

                {/* Day Accordion List */}
                <div className="space-y-2">
                  {plan.days.map((day) => {
                    const isCompleted = completedDays.includes(day.dayNumber);
                    const isExpanded = expandedDay === day.dayNumber;

                    return (
                      <div
                        key={day.dayNumber}
                        className={`border rounded-2xl transition-all ${
                          isCompleted
                            ? "border-emerald-100 bg-emerald-50/20"
                            : isExpanded
                            ? "border-emerald-700 shadow-xs"
                            : "border-stone-150 bg-white hover:border-stone-300"
                        }`}
                      >
                        {/* Day Title Bar */}
                        <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleExpandDay(day.dayNumber)}>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDayCompleted(day.dayNumber);
                              }}
                              className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all border ${
                                isCompleted
                                  ? "bg-emerald-700 text-white border-emerald-700"
                                  : "bg-stone-50 border-stone-300 hover:border-emerald-500"
                              } cursor-pointer`}
                            >
                              {isCompleted && <Check className="w-4 h-4" />}
                            </button>

                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-mono">
                                HARI {day.dayNumber}
                              </span>
                              <h5 className={`font-bold text-sm tracking-tight ${isCompleted ? "text-stone-400 line-through" : "text-stone-900"}`}>
                                {day.dayTitle}
                              </h5>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">
                              🌱 {day.plasticSavedEst}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-stone-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-stone-400" />
                            )}
                          </div>
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 pt-1 border-t border-stone-100 text-xs space-y-2.5">
                                <div className="text-stone-700 font-medium bg-stone-50 p-3 rounded-xl">
                                  <span className="font-bold text-stone-900 block mb-1 font-display">
                                    🎯 Tindakan Hari Ini:
                                  </span>
                                  {day.challenge}
                                </div>
                                <div className="text-stone-500 leading-relaxed pl-1">
                                  <span className="font-bold text-stone-700 block mb-0.5 font-display">
                                    Mengapa ini penting?
                                  </span>
                                  {day.whyItMatters}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {!plan && !loading && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-dashed border-stone-200 rounded-3xl p-12 text-center text-stone-400 flex flex-col items-center justify-center h-full"
                key="plan-placeholder"
              >
                <CheckSquare className="w-10 h-10 text-stone-300 mb-3" />
                <h5 className="font-semibold text-stone-700 text-sm font-display mb-1">Rencana Aksi Belum Tersedia</h5>
                <p className="text-xs max-w-sm mx-auto">
                  Atur kesiapan parameter Anda di panel sebelah kiri lalu tekan tombol **"Buat Tantangan 7 Hari"** untuk mendapatkan materi edukasi personal Anda.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
