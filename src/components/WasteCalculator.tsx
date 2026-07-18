import { useState } from "react";
import { motion } from "motion/react";
import { TreePine, ShoppingBag, Flame, Trash2, ShieldAlert, CheckCircle } from "lucide-react";

export default function WasteCalculator() {
  const [bottlesPerDay, setBottlesPerDay] = useState(2);
  const [bagsPerWeek, setBagsPerWeek] = useState(8);
  const [takeoutPerWeek, setTakeoutPerWeek] = useState(5);
  const [foodWastePerDay, setFoodWastePerDay] = useState(0.5); // kg

  // Mathematical Eco-Conversions (scientific averages)
  // - 1 Plastic bottle: ~25g plastic, 80g CO2 equivalent
  // - 1 Plastic bag: ~8g plastic, 33g CO2 equivalent
  // - 1 Takeout container/cup: ~15g plastic, 50g CO2 equivalent
  // - 1 kg food waste: ~2500g CO2 equivalent (methane in landfill)

  const annualBottles = bottlesPerDay * 365;
  const annualBags = bagsPerWeek * 52;
  const annualTakeout = takeoutPerWeek * 52;
  const annualFoodWaste = foodWastePerDay * 365;

  // Mass in Kilograms
  const totalPlasticKg = Number(
    ((annualBottles * 25 + annualBags * 8 + annualTakeout * 15) / 1000).toFixed(1)
  );
  
  // CO2 in Kilograms
  const totalCo2Kg = Number(
    ((annualBottles * 80 + annualBags * 33 + annualTakeout * 50 + annualFoodWaste * 2500) / 1000).toFixed(1)
  );

  // Offset metric: 1 mature tree absorbs ~22kg CO2 per year
  const offsetTrees = Number((totalCo2Kg / 22).toFixed(1));

  // Determine threat level badge
  const getBadge = (kg: number) => {
    if (kg < 15) return { text: "Minim Jejak (Bagus!)", color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
    if (kg < 40) return { text: "Jejak Sedang", color: "bg-amber-100 text-amber-800 border-amber-200" };
    return { text: "Jejak Tinggi (Peringatan)", color: "bg-rose-100 text-rose-800 border-rose-200" };
  };

  const threatBadge = getBadge(totalPlasticKg);

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 md:p-8" id="waste-calculator-card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-emerald-700 bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider font-display">
            Simulasi Jejak Lingkungan
          </span>
          <h3 className="text-2xl font-bold text-stone-900 mt-2 font-display tracking-tight">
            Kalkulator Sampah Rumah Tangga
          </h3>
          <p className="text-stone-500 text-sm mt-1">
            Hitung perkiraan timbulan sampah tahunan Anda dan lihat dampak nyatanya terhadap bumi.
          </p>
        </div>
        <div className={`self-start md:self-center px-4 py-2 rounded-2xl border text-sm font-semibold flex items-center gap-1.5 ${threatBadge.color}`}>
          <ShieldAlert className="w-4.5 h-4.5" />
          {threatBadge.text}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Input */}
        <div className="lg:col-span-7 space-y-6">
          {/* Bottles */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-stone-700 font-medium flex items-center gap-2">
                <span className="text-sky-500 font-bold font-mono">🥤</span> Botol Plastik Air Minum
              </label>
              <span className="text-stone-900 font-semibold font-mono">{bottlesPerDay} botol / hari</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={bottlesPerDay}
              onChange={(e) => setBottlesPerDay(Number(e.target.value))}
              className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <p className="text-[11px] text-stone-400">Rata-rata nasional: 1-2 botol kemasan sekali pakai per hari.</p>
          </div>

          {/* Bags */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-stone-700 font-medium flex items-center gap-2">
                <span className="text-emerald-500 font-bold font-mono">🛍️</span> Kantong Plastik Belanja
              </label>
              <span className="text-stone-900 font-semibold font-mono">{bagsPerWeek} kantong / minggu</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={bagsPerWeek}
              onChange={(e) => setBagsPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <p className="text-[11px] text-stone-400">Satu keluarga rata-rata memakai lebih dari 10 kantong seminggu.</p>
          </div>

          {/* Takeout */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-stone-700 font-medium flex items-center gap-2">
                <span className="text-amber-500 font-bold font-mono">🍱</span> Wadah Makanan & Gelas Kopi
              </label>
              <span className="text-stone-900 font-semibold font-mono">{takeoutPerWeek} wadah / minggu</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={takeoutPerWeek}
              onChange={(e) => setTakeoutPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <p className="text-[11px] text-stone-400">Termasuk styrofoam, sedotan, cup kopi, dan sendok sekali pakai.</p>
          </div>

          {/* Food Waste */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-stone-700 font-medium flex items-center gap-2">
                <span className="text-orange-500 font-bold font-mono">🍏</span> Sisa Makanan Terbuang
              </label>
              <span className="text-stone-900 font-semibold font-mono">{foodWastePerDay} kg / hari</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={foodWastePerDay}
              onChange={(e) => setFoodWastePerDay(Number(e.target.value))}
              className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <p className="text-[11px] text-stone-400">Indonesia membuang sekitar 0.7 kg sampah organik per orang setiap hari.</p>
          </div>
        </div>

        {/* Impact Dashboard */}
        <div className="lg:col-span-5 bg-stone-50 border border-stone-100 rounded-2xl p-6 flex flex-col justify-between h-full">
          <div>
            <h4 className="text-stone-800 font-semibold text-base mb-4 flex items-center gap-2 font-display border-b border-stone-200 pb-2">
              <Trash2 className="w-5 h-5 text-stone-600" />
              Estimasi Dampak Tahunan Anda
            </h4>

            <div className="space-y-4">
              {/* Stat 1 */}
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-700 mt-1">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-black text-stone-900 font-mono tracking-tight">{totalPlasticKg} <span className="text-xs font-normal text-stone-500">kg</span></div>
                  <p className="text-xs text-stone-500 font-medium leading-tight">Total Sampah Plastik Sekali Pakai</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">Setara dengan {annualBottles + annualBags + annualTakeout} lembar/buah plastik.</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-start gap-4">
                <div className="bg-rose-100 p-2.5 rounded-xl text-rose-700 mt-1">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-black text-stone-900 font-mono tracking-tight">{totalCo2Kg} <span className="text-xs font-normal text-stone-500">kg CO₂e</span></div>
                  <p className="text-xs text-stone-500 font-medium leading-tight">Emisi Gas Rumah Kaca yang Dihasilkan</p>
                  <p className="text-[11px] text-rose-700 mt-0.5">Sama dengan berkendara mobil sejauh {(totalCo2Kg * 4).toFixed(0)} km.</p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-2.5 rounded-xl text-amber-700 mt-1">
                  <TreePine className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-black text-stone-900 font-mono tracking-tight">{offsetTrees} <span className="text-xs font-normal text-stone-500">pohon</span></div>
                  <p className="text-xs text-stone-500 font-medium leading-tight">Pohon Dewasa yang Dibutuhkan untuk Menyerap Emisi Anda</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">Dibutuhkan waktu satu tahun penuh bagi pohon ini untuk menyerap CO₂ Anda.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200">
            <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl flex items-start gap-2.5 text-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Tahukah Anda?</span>
                Dengan mengurangi botol air kemasan & membawa tas belanja kain sendiri, Anda sudah bisa memotong **70%** dari total sampah plastik tahunan Anda!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
