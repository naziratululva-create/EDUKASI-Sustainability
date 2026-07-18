import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Check, Trash2, Plus, Sparkles, History, ShoppingBag, Leaf, HelpCircle, Trophy } from "lucide-react";
import { DailyLogItem } from "../types";

// Predefined eco actions to complete
const ECO_HABITS = [
  { name: "Membawa Tumbler Pribadi", points: 15, category: "general" as const, desc: "Menghindari botol minum sekali pakai." },
  { name: "Mengompos Sampah Dapur", points: 25, category: "kitchen" as const, desc: "Mengubah sisa organik menjadi pupuk nutrisi." },
  { name: "Belanja Dengan Tas Kain", points: 15, category: "shopping" as const, desc: "Menolak kantong plastik kresek di kasir." },
  { name: "Membawa Kotak Bekal Sendiri", points: 20, category: "kitchen" as const, desc: "Menolak pembungkus kertas minyak atau styrofoam." },
  { name: "Menolak Sedotan & Alat Sekali Pakai", points: 10, category: "shopping" as const, desc: "Menyertakan pesan khusus di aplikasi pesan makanan." },
  { name: "Menggunakan Sabun/Sampo Batang", points: 20, category: "bathroom" as const, desc: "Mengurangi sampah botol plastik tebal di bilik mandi." },
];

export default function DailyWasteTracker() {
  const [logs, setLogs] = useState<DailyLogItem[]>([]);
  const [customAction, setCustomAction] = useState("");
  const [customPoints, setCustomPoints] = useState(10);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Load logs on mount
  useEffect(() => {
    const saved = localStorage.getItem("zero_waste_logs_history");
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse logs", e);
      }
    }
  }, []);

  // Save logs
  const saveLogs = (updatedLogs: DailyLogItem[]) => {
    setLogs(updatedLogs);
    localStorage.setItem("zero_waste_logs_history", JSON.stringify(updatedLogs));
  };

  // Add Log Item
  const handleLogAction = (name: string, points: number, category: "kitchen" | "bathroom" | "shopping" | "general") => {
    const newLog: DailyLogItem = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString().split("T")[0],
      actionName: name,
      ecoPoints: points,
      category,
    };
    const updated = [newLog, ...logs];
    saveLogs(updated);

    // Show instant celebration
    setSuccessMsg(`Hebat! +${points} Eco Points berhasil dicatat.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Custom Action Submit
  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customAction.trim()) return;
    handleLogAction(customAction, customPoints, "general");
    setCustomAction("");
  };

  // Delete single log
  const handleDeleteLog = (id: string) => {
    const filtered = logs.filter((l) => l.id !== id);
    saveLogs(filtered);
  };

  // Clear all logs
  const handleClearAll = () => {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh riwayat poin aksi Anda?")) {
      saveLogs([]);
    }
  };

  // Calculate stats
  const totalPoints = logs.reduce((sum, log) => sum + log.ecoPoints, 0);
  const totalActions = logs.length;

  // Determine user eco milestone
  const getMilestone = (points: number) => {
    if (points === 0) return { title: "Pemerhati Lingkungan", next: 50, percent: 0, badge: "🌱" };
    if (points < 50) return { title: "Pemula Lestari", next: 50, percent: (points / 50) * 100, badge: "🌿" };
    if (points < 150) return { title: "Pejuang Kompos", next: 150, percent: (points / 150) * 100, badge: "🍀" };
    if (points < 300) return { title: "Pahlawan Minim Sampah", next: 300, percent: (points / 300) * 100, badge: "🌳" };
    return { title: "Penjaga Kelestarian Bumi", next: 1000, percent: 100, badge: "👑" };
  };

  const milestone = getMilestone(totalPoints);

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 md:p-8" id="daily-waste-tracker-card">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <span className="text-emerald-700 bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider font-display inline-flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5" /> Jurnal Aksi Lestari
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mt-2 font-display tracking-tight">
          Catat Komitmen & Raih Eco Points!
        </h3>
        <p className="text-stone-500 text-sm mt-2">
          Setiap tindakan kecil memiliki kekuatan nyata. Centang kebiasaan hijau yang Anda lakukan hari ini untuk meningkatkan skor Eco Points Anda secara mandiri di browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Habits Checklist */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-stone-100">
            <h4 className="text-stone-800 font-semibold text-sm font-display flex items-center gap-1.5">
              <Leaf className="w-4.5 h-4.5 text-emerald-700" />
              Pilih Tindakan Hijau Hari Ini
            </h4>
            <span className="text-[10px] text-stone-400 font-mono">Klik tindakan untuk mencatat</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {ECO_HABITS.map((habit, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleLogAction(habit.name, habit.points, habit.category)}
                className="p-4 rounded-2xl border border-stone-150 bg-stone-50/50 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all text-left flex flex-col justify-between h-32 group cursor-pointer"
              >
                <div>
                  <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
                    +{habit.points} Eco Points
                  </span>
                  <h5 className="font-bold text-stone-950 text-xs mt-1 group-hover:text-emerald-950">
                    {habit.name}
                  </h5>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    {habit.desc}
                  </p>
                </div>

                <div className="self-end text-xs font-bold text-emerald-800 flex items-center gap-1 bg-white border border-stone-200 px-2.5 py-1 rounded-lg group-hover:bg-emerald-700 group-hover:text-white group-hover:border-emerald-700 transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Catat
                </div>
              </button>
            ))}
          </div>

          {/* Success Notification Bar */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="bg-emerald-800 text-white text-xs font-semibold p-3.5 rounded-xl flex items-center gap-2 justify-center"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                {successMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom Action form */}
          <form onSubmit={handleCustomSubmit} className="bg-stone-50 border border-stone-100 rounded-2xl p-4 space-y-3">
            <h5 className="text-xs font-semibold text-stone-700 font-display">
              Punya tindakan hijau lainnya? Catat kustom disini:
            </h5>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                required
                placeholder="Misal: Membersihkan sampah di pantai, ikut ecobricks..."
                value={customAction}
                onChange={(e) => setCustomAction(e.target.value)}
                className="flex-1 px-4 py-2 text-xs rounded-xl border border-stone-200 bg-white"
              />
              <div className="flex gap-1.5 shrink-0">
                <select
                  value={customPoints}
                  onChange={(e) => setCustomPoints(Number(e.target.value))}
                  className="px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white"
                >
                  <option value={10}>+10 Poin</option>
                  <option value={20}>+20 Poin</option>
                  <option value={35}>+35 Poin</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Tambah
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right column: Scoreboard, Milestones and logs history */}
        <div className="lg:col-span-5 bg-stone-50 border border-stone-100 rounded-3xl p-6 space-y-6">
          {/* Main Score stats */}
          <div className="text-center p-4 bg-white rounded-2xl border border-stone-100 shadow-xs relative overflow-hidden">
            <div className="absolute top-2 right-2 text-2xl filter drop-shadow-xs">{milestone.badge}</div>

            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">
              Level Keberlanjutan
            </span>
            <h4 className="text-xl font-black text-emerald-950 font-display mt-0.5">
              {milestone.title}
            </h4>

            <div className="my-3">
              <span className="text-5xl font-black text-stone-950 font-mono tracking-tight">{totalPoints}</span>
              <span className="text-stone-400 text-xs font-bold font-mono ml-1">Pts</span>
            </div>

            {/* Custom progress bar */}
            <div className="space-y-1">
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div
                  className="bg-emerald-700 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${milestone.percent}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-stone-400 font-mono font-medium">
                <span>{totalPoints} / {milestone.next} Pts</span>
                <span>Progres Tingkatan</span>
              </div>
            </div>
          </div>

          {/* Historical Log list */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h5 className="text-stone-800 font-bold text-xs font-display flex items-center gap-1.5">
                <History className="w-4 h-4 text-stone-600" />
                Catatan Aktivitas Terkini ({totalActions})
              </h5>
              {logs.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-[10px] font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-0.5 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Hapus Semua
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {logs.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-stone-400 border border-dashed border-stone-200 rounded-xl"
                  >
                    <HelpCircle className="w-6 h-6 mx-auto text-stone-300 mb-1" />
                    <p className="text-[11px]">Belum ada aksi yang dicatat. Mulai lestarikan bumi!</p>
                  </motion.div>
                ) : (
                  logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="p-3 bg-white rounded-xl border border-stone-100 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-600" />
                        <div>
                          <p className="font-bold text-stone-900 leading-tight">{log.actionName}</p>
                          <p className="text-[10px] text-stone-400 font-mono mt-0.5">{log.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-800 font-mono text-xs bg-emerald-50 px-2 py-0.5 rounded-md">
                          +{log.ecoPoints}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteLog(log.id)}
                          className="text-stone-300 hover:text-stone-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
