import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Info, HelpCircle, Check, Compass, Trash, Trees } from "lucide-react";
import { StaticEduTopic } from "../types";

const TOPICS: StaticEduTopic[] = [
  {
    rName: "Refuse",
    title: "Menolak (Refuse)",
    definition: "Langkah pertama dan terpenting dalam zero waste. Tolak segala bentuk barang sekali pakai yang tidak Anda butuhkan, seperti brosur, sedotan plastik, kantong plastik kresek, atau peralatan makan plastik saat memesan antar makanan online.",
    practicalTips: [
      "Katakan 'Tidak perlu kantong plastik' saat berbelanja ritel",
      "Gunakan penolak sedotan sekali pakai (bawa stainless/bambu sendiri jika butuh)",
      "Tolak sampel promosi gratisan berbahan plastik murah yang mudah rusak",
      "Pilih struk digital dibanding struk kertas termal beracun BPA"
    ],
    impactFact: "Dengan menolak kantong plastik harian, Anda mencegah pelepasan hingga 500 kantong plastik per tahun ke alam bebas.",
    icon: "🚫"
  },
  {
    rName: "Reduce",
    title: "Mengurangi (Reduce)",
    definition: "Kurangi konsumsi barang-barang secara berlebihan. Belilah hanya apa yang benar-benar Anda butuhkan dan kurangi pemakaian produk dengan kemasan berlebih atau tidak bisa didaur ulang.",
    practicalTips: [
      "Beli barang curah (bulk shop) untuk menghindari sampah plastik sachet",
      "Pilih produk berkualitas tinggi yang tahan lama daripada opsi murah yang cepat rusak",
      "Kurangi frekuensi pembelian pakaian (fast fashion) yang merusak air",
      "Rencanakan belanja makanan mingguan agar tidak menghasilkan sampah sisa pangan (food waste)"
    ],
    impactFact: "Industri fesyen menyumbang 10% dari emisi karbon global. Mengurangi beli pakaian baru memotong separuh jejak air pribadi Anda.",
    icon: "📉"
  },
  {
    rName: "Reuse",
    title: "Menggunakan Kembali (Reuse)",
    definition: "Ganti semua barang sekali pakai Anda dengan opsi pakai ulang yang tahan lama. Rawat, perbaiki, dan maksimalkan masa pakai barang yang sudah Anda miliki saat ini.",
    practicalTips: [
      "Bawa tumbler air minum dan kotak makan stainless saat bepergian",
      "Bawa tas kain lipat di dalam kendaraan Anda agar siap kapan saja",
      "Gunakan toples kaca bekas selai untuk wadah penyimpanan bumbu dapur",
      "Donasikan atau tukar tambah pakaian/buku lama Anda yang masih layak"
    ],
    impactFact: "Satu cangkir kopi sekali pakai yang Anda gantikan dengan tumbler pribadi menghemat hingga 3.000 liter air dalam daur hidupnya.",
    icon: "🔄"
  },
  {
    rName: "Recycle",
    title: "Mendaur Ulang (Recycle)",
    definition: "Daur ulang adalah opsi terakhir untuk sampah kering anorganik. Sortir sampah Anda dari rumah (plastik, kertas, kaca, logam) dan serahkan ke bank sampah atau agen daur ulang terpercaya.",
    practicalTips: [
      "Pisahkan sampah plastik bersih, kertas kardus, logam kaleng, dan botol kaca",
      "Bersihkan sisa makanan pada wadah plastik sebelum ditaruh di tempat daur ulang",
      "Kirim sampah kering Anda ke bank sampah lokal atau aplikasi pengepul sampah resmi",
      "Hindari mencampur sampah kering dan basah agar tidak menurunkan nilai daur ulang"
    ],
    impactFact: "Faktanya, hanya sekitar 9% dari total plastik global yang berhasil didaur ulang. Daur ulang saja TIDAK CUKUP tanpa Refuse dan Reduce!",
    icon: "♻️"
  },
  {
    rName: "Rot",
    title: "Membusukkan (Rot)",
    definition: "Kelola sampah organik (sisa makanan, kulit buah, daun kering) dengan membuat kompos di rumah. Mengompos mengembalikan nutrisi ke tanah sekaligus mencegah terbentuknya gas metana beracun di TPA.",
    practicalTips: [
      "Siapkan komposter sederhana di halaman atau gunakan metode Takakura untuk dalam rumah",
      "Campurkan sampah basah (kulit buah, sayur) dengan sampah kering (daun, kardus cokelat, serbuk gergaji)",
      "Hindari memasukkan daging atau minyak berlebih jika komposter Anda belum terlatih",
      "Gunakan hasil kompos untuk memupuk tanaman hias atau kebun sayur mandiri"
    ],
    impactFact: "Lebih dari 50% timbulan sampah rumah tangga di Indonesia adalah sampah organik. Mengompos memotong volume sampah Anda hingga setengahnya!",
    icon: "🍂"
  }
];

export default function EducationalHub() {
  const [activeTab, setActiveTab] = useState<string>("Refuse");

  const currentTopic = TOPICS.find((t) => t.rName === activeTab) || TOPICS[0];

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 md:p-8" id="educational-hub-card">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <span className="text-emerald-700 bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider font-display inline-flex items-center gap-1">
          <Compass className="w-3.5 h-3.5" /> Edukasi Sustainability
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mt-2 font-display tracking-tight">
          Prinsip Utama: Memahami 5 R
        </h3>
        <p className="text-stone-500 text-sm mt-2">
          Gaya hidup minim sampah bukan berarti tidak menghasilkan sampah sama sekali, melainkan upaya sistematis melatih diri meminimalkan jejak konsumsi menggunakan konsep hierarki **5 R**.
        </p>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap justify-center border-b border-stone-200 pb-px mb-8 gap-1 md:gap-2">
        {TOPICS.map((topic) => {
          const isActive = activeTab === topic.rName;
          return (
            <button
              key={topic.rName}
              type="button"
              onClick={() => setActiveTab(topic.rName)}
              className={`px-4 py-3 text-xs md:text-sm font-semibold rounded-t-xl transition-all border-b-2 -mb-px flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? "border-emerald-700 text-emerald-800 bg-emerald-50/50"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              <span className="text-sm font-mono">{topic.icon}</span>
              <span>{topic.rName}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column: Description & Facts */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h4 className="text-xl md:text-2xl font-bold text-stone-900 font-display flex items-center gap-2">
                <span className="text-2xl font-mono">{currentTopic.icon}</span>
                {currentTopic.title}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
                {currentTopic.definition}
              </p>
            </div>

            {/* Impact Fact Callout */}
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5 flex items-start gap-4 mt-4">
              <div className="bg-emerald-100 text-emerald-800 p-2 rounded-xl mt-1 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-stone-900 text-xs uppercase tracking-wider font-mono">Fakta Berdampak</h5>
                <p className="text-emerald-900 text-xs font-semibold mt-1 leading-relaxed">
                  {currentTopic.impactFact}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Tips Checklist */}
          <div className="lg:col-span-5 bg-stone-50 border border-stone-100 rounded-2xl p-6">
            <h5 className="text-stone-800 font-bold text-sm font-display mb-4 flex items-center gap-2 border-b border-stone-200 pb-2">
              <Leaf className="w-4.5 h-4.5 text-emerald-700" />
              Langkah Praktis Setiap Hari
            </h5>

            <ul className="space-y-3.5">
              {currentTopic.practicalTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-stone-700">
                  <div className="bg-emerald-100 text-emerald-800 p-1 rounded-md shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
