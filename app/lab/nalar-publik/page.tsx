"use client";

import { Merriweather, Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function NalarPublikPage() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"descriptive" | "prescriptive">(
    "descriptive"
  );
  const [simulation, setSimulation] = useState({
    received: 100,
    economy: "good",
  });
  const [simulationResult, setSimulationResult] = useState<{
    expectation: number;
    consequence: string;
    riskColor: string;
  } | null>(null);
  const [activeDecay, setActiveDecay] = useState<string | null>(null);

  const cultureChartRef = useRef<HTMLCanvasElement>(null);
  const disasterChartRef = useRef<HTMLCanvasElement>(null);
  const cultureChartInstance = useRef<any>(null);
  const disasterChartInstance = useRef<any>(null);
  const [isChartReady, setIsChartReady] = useState(false);

  // Scroll Navigation Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "intro",
        "etika",
        "budaya",
        "negara",
        "kasus",
        "solusi",
      ];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Logic from original code: top <= 150 && bottom >= 150
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break; // Found the top-most active section
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  // Cultural Simulation Logic
  const calculatePressure = () => {
    const receivedVal = simulation.received * 1000;
    let expectation = receivedVal;
    if (receivedVal < 200000) expectation += 50000;
    else expectation += 100000;

    let consequence = "";
    let riskColor = "text-stone-800";

    if (simulation.economy === "bad") {
      consequence =
        "Tekanan Psikologis Berat. Risiko berutang demi gengsi, atau tidak hadir dan dikucilkan (dianggap 'lupa kulit').";
      riskColor = "text-rose-700";
    } else {
      consequence =
        "Beban Sosial Standar. Anda 'selamat' kali ini, tapi siklus transaksi berlanjut ke undangan berikutnya.";
      riskColor = "text-orange-700";
    }

    setSimulationResult({
      expectation,
      consequence,
      riskColor,
    });
  };

  // Charts Initialization
  useEffect(() => {
    if (
      isChartReady &&
      typeof window !== "undefined" &&
      (window as any).Chart
    ) {
      const Chart = (window as any).Chart;

      // Clean up previous instances
      if (cultureChartInstance.current) cultureChartInstance.current.destroy();
      if (disasterChartInstance.current)
        disasterChartInstance.current.destroy();

      // Chart 1: Culture
      if (cultureChartRef.current) {
        const ctxCulture = cultureChartRef.current.getContext("2d");
        if (ctxCulture) {
          cultureChartInstance.current = new Chart(ctxCulture, {
            type: "line",
            data: {
              labels: [
                "Nikah",
                "Aqiqah",
                "Sunatan",
                "Pesta 1",
                "Pesta 2",
                "Pesta 3",
              ],
              datasets: [
                {
                  label: "Akumulasi Beban Sosial (Rp)",
                  data: [100000, 250000, 450000, 800000, 1500000, 2500000],
                  borderColor: "#be123c",
                  backgroundColor: "rgba(190, 18, 60, 0.1)",
                  fill: true,
                  tension: 0.4,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: function (context: any) {
                      return (
                        "Beban: Rp " + context.parsed.y.toLocaleString("id-ID")
                      );
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: { color: "#f5f5f4" },
                },
                x: {
                  grid: { display: false },
                },
              },
            },
          });
        }
      }

      // Chart 2: Disaster
      if (disasterChartRef.current) {
        const ctxDisaster = disasterChartRef.current.getContext("2d");
        if (ctxDisaster) {
          disasterChartInstance.current = new Chart(ctxDisaster, {
            type: "bar",
            data: {
              labels: [
                "Jumlah Korban",
                "Kerusakan Area",
                "Desakan Publik",
                "Respons Pemerintah",
              ],
              datasets: [
                {
                  label: "Skala Realita (Kriteria Bencana Nasional)",
                  data: [90, 85, 95, 0],
                  backgroundColor: "#57534e",
                  borderRadius: 4,
                },
                {
                  label: "Status Formal (Bencana Daerah)",
                  data: [20, 20, 20, 100],
                  backgroundColor: "#be123c",
                  borderRadius: 4,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: "y",
              plugins: {
                legend: { position: "bottom" },
                tooltip: {
                  callbacks: {
                    afterBody: function (context: any) {
                      if (context[0].dataIndex === 3) {
                        return "\nAlasan: Menghindari investigasi internasional\nyang dapat mengungkap illegal logging.";
                      }
                    },
                  },
                },
              },
              scales: {
                x: {
                  max: 100,
                  ticks: { display: false },
                  grid: { display: false },
                },
              },
            },
          });
        }
      }
    }
  }, [isChartReady]);

  // Content Data for Views
  const contentData = {
    descriptive: {
      title: "Makna Deskriptif (Etika Murni)",
      text: "Imam Syafi'i menjelaskan <strong>EFEK PSIKOLOGIS</strong>. Bahwa kebaikan yang tulus secara alami akan membuat hati penerima merasa segan atau hormat. Ini adalah observasi tentang sifat manusia, bukan perintah.",
      quote:
        '"Hati manusia secara alami condong mencintai siapa yang berbuat baik kepadanya." — Ini fakta alamiah, bukan kontrak dagang.',
      colorClass: "text-emerald-800",
      bgClass: "bg-emerald-50",
    },
    prescriptive: {
      title: "Makna Preskriptif (Salah Kaprah)",
      text: 'Masyarakat menafsirkannya sebagai <strong>PERINTAH WAJIB</strong>. "Saya beri kamu X, maka kamu WAJIB balas Y." Ini mengubah moralitas menjadi transaksi. Sakralisasi ulama membuat tafsir ini dianggap hukum Tuhan yang tak boleh dibantah.',
      quote:
        '"Kamu harus balas budi! Kalau tidak, kamu tidak tahu diuntung!" — Ini adalah tekanan sosial, bukan etika.',
      colorClass: "text-rose-800",
      bgClass: "bg-rose-50",
    },
  };

  const currentView = contentData[viewMode];

  return (
    <div
      className={`min-h-screen bg-[#FAFAF9] text-stone-900 ${inter.variable} ${merriweather.variable} font-sans`}
    >
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        onLoad={() => setIsChartReady(true)}
        strategy="afterInteractive"
      />

      <style jsx global>{`
        /* Custom styles from the original HTML */
        .serif {
          font-family: var(--font-merriweather), serif;
        }
        .chart-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          height: 300px;
          max-height: 400px;
        }
        @media (min-width: 768px) {
          .chart-container {
            height: 350px;
          }
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #e7e5e4;
        }
        ::-webkit-scrollbar-thumb {
          background: #a8a29e;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #78716c;
        }
        .active-nav {
          border-bottom: 2px solid #be123c;
          color: #be123c;
          font-weight: 600;
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#FAFAF9]/95 backdrop-blur-sm border-b border-stone-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-stone-800 serif">
                Nalar Publik
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                { id: "intro", label: "Mukadimah" },
                { id: "etika", label: "Etika & Sakralisasi" },
                { id: "budaya", label: "Budaya Transaksi" },
                { id: "negara", label: "Kerusakan Epistemik" },
                { id: "kasus", label: "Kasus Sumatra" },
                { id: "solusi", label: "Solusi" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link text-stone-500 hover:text-stone-900 px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id ? "active-nav" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-stone-500 hover:text-stone-900 focus:outline-none"
              >
                <span className="text-2xl">☰</span>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-stone-50 border-t border-stone-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                { id: "intro", label: "Mukadimah" },
                { id: "etika", label: "Etika" },
                { id: "budaya", label: "Budaya" },
                { id: "negara", label: "Negara" },
                { id: "kasus", label: "Kasus" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-20">
        {/* SECTION 1: INTRO (Hero) */}
        <section
          id="intro"
          className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 mb-16 relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto z-10">
            <div className="mb-6 inline-block px-4 py-1 rounded-full bg-rose-100 text-rose-800 text-sm font-semibold tracking-wide">
              ANALISIS SOSIAL & ETIKA
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-stone-900 mb-8 leading-tight serif">
              Ketika Kebaikan Menjadi <br />{" "}
              <span className="text-rose-700">Utang yang Membelenggu</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 mb-10 font-light serif italic">
              {'"'}Barangsiapa berbuat baik kepadamu maka dia telah mengikatmu
              dalam kesetiaan.{'"'} <br />
              <span className="text-sm not-italic mt-2 block font-sans text-stone-500">
                — Imam Syafi’i (w. 820 M)
              </span>
            </p>
            <p className="text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto mb-8">
              Sebuah kutipan puitis yang sering disalahpahami sebagai alat tagih
              jasa. Dari meja makan hingga meja pemerintahan, kesalahpahaman ini
              merambat menjadi kerusakan nalar publik (epistemik) yang
              melahirkan korupsi dan bencana struktural.
            </p>
            <button
              onClick={() => scrollToSection("etika")}
              className="bg-stone-900 text-white px-8 py-3 rounded-lg hover:bg-stone-800 transition shadow-lg font-medium cursor-pointer"
            >
              Mulai Eksplorasi
            </button>
          </div>
          {/* Decorative BG */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-stone-100 to-transparent -z-10"></div>
        </section>

        {/* SECTION 2: ETIKA (Deconstruction) */}
        <section
          id="etika"
          className="max-w-5xl mx-auto px-4 mb-24 scroll-mt-24"
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-stone-900 mb-4 serif">
              Membedah Kembali Makna Asli
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Kekeliruan fatal dimulai dari cara kita menerjemahkan pesan ulama.
              Adanya sakralisasi figur seringkali membuat kita gagal membedakan
              antara {"'"}gambaran psikologis{"'"} dan {"'"}perintah wajib{"'"}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Interactive Comparison */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
              <h3 className="text-xl font-bold text-stone-800 mb-4 border-b pb-2">
                Pilih Sudut Pandang
              </h3>
              <div className="flex space-x-2 mb-6 bg-stone-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("descriptive")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    viewMode === "descriptive"
                      ? "bg-white shadow text-emerald-700 ring-1 ring-emerald-200"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  Makna Asli (Deskriptif)
                </button>
                <button
                  onClick={() => setViewMode("prescriptive")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    viewMode === "prescriptive"
                      ? "bg-white shadow text-rose-700 ring-1 ring-rose-200"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  Salah Kaprah (Preskriptif)
                </button>
              </div>

              <div className="min-h-[200px] fade-in">
                <div
                  className={`${currentView.bgClass} p-4 rounded-lg mb-4 h-full flex flex-col justify-between transition-all duration-300`}
                >
                  <div>
                    <h4 className={`font-bold ${currentView.colorClass} mb-2`}>
                      {currentView.title}
                    </h4>
                    <p
                      className="text-stone-700 text-sm leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{ __html: currentView.text }}
                    />
                  </div>
                  <div className="border-t border-stone-200 pt-3 mt-2">
                    <p className="text-xs italic text-stone-500">
                      {currentView.quote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Column */}
            <div className="space-y-6">
              <div className="bg-rose-50 border-l-4 border-rose-700 p-5 rounded-r-lg">
                <h4 className="font-bold text-rose-900 mb-2">
                  Bahaya Sakralisasi Ulama
                </h4>
                <p className="text-sm text-stone-700">
                  {'"'}Ulama-sentris{'"'} membuat kita enggan mengkritik atau
                  menganalisis konteks. Ucapan Imam Syafi{"'"}i{" "}
                  <em>
                    {'"'}Man aḥsana ilayka fa-qad istarraqak{'"'}
                  </em>{" "}
                  (ia telah memperbudakmu) adalah hiperbola sastra tentang rasa
                  malu, bukan hukum syariah yang mewajibkan transaksi balas
                  budi.
                </p>
              </div>
              <div className="bg-emerald-50 border-l-4 border-emerald-700 p-5 rounded-r-lg">
                <h4 className="font-bold text-emerald-900 mb-2">
                  Kunci: Keikhlasan
                </h4>
                <p className="text-sm text-stone-700">
                  Tujuan asli kutipan ini adalah peringatan bagi pemberi:
                  {'"'}Hati-hati, kebaikanmu bisa memperbudak orang lain, maka
                  Ikhlaslah.{'"'} Bukan legitimasi bagi penerima untuk merasa
                  tertekan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: BUDAYA (Cultural Impact) */}
        <section id="budaya" className="bg-white py-16 mb-16 scroll-mt-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-stone-900 mb-4 serif">
                Budaya Transaksi: {'"'}Nanam & Nagih Jasa{'"'}
              </h2>
              <p className="text-stone-600 max-w-3xl">
                Ketika etika individual disalahartikan, ia berubah menjadi
                budaya transaksional. Contoh paling nyata dan dekat dengan kita
                adalah fenomena <strong>Amplop Kondangan</strong>.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Simulation Card */}
              <div className="lg:col-span-1 bg-stone-50 p-6 rounded-xl border border-stone-200 shadow-inner">
                <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">✉️</span> Simulasi Tekanan
                  Sosial
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">
                      Dulu dia memberi Anda:
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      step="50"
                      value={simulation.received}
                      onChange={(e) =>
                        setSimulation({
                          ...simulation,
                          received: parseInt(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                    />
                    <div className="text-right text-sm font-bold text-stone-800">
                      Rp {(simulation.received * 1000).toLocaleString("id-ID")}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">
                      Kondisi Ekonomi Anda Saat Ini:
                    </label>
                    <select
                      value={simulation.economy}
                      onChange={(e) =>
                        setSimulation({
                          ...simulation,
                          economy: e.target.value as "good" | "bad",
                        })
                      }
                      className="w-full p-2 rounded border border-stone-300 bg-white text-sm"
                    >
                      <option value="good">Sedang Baik</option>
                      <option value="bad">Sedang Sulit / Krisis</option>
                    </select>
                  </div>
                  <button
                    onClick={calculatePressure}
                    className="w-full bg-stone-800 text-white py-2 rounded-md hover:bg-stone-700 transition text-sm cursor-pointer"
                  >
                    Hitung Dampak Sosial
                  </button>
                </div>

                {simulationResult && (
                  <div className="mt-6 fade-in border-t border-stone-200 pt-4">
                    <p className="text-xs text-stone-500 mb-1">
                      Ekspektasi Balasan:
                    </p>
                    <div className="text-xl font-bold text-rose-700 mb-2">
                      Rp {simulationResult.expectation.toLocaleString("id-ID")}
                    </div>
                    <p className="text-xs text-stone-500 mb-1">
                      Risiko Jika Gagal:
                    </p>
                    <p
                      className={`text-sm font-medium bg-rose-50 p-2 rounded ${simulationResult.riskColor}`}
                    >
                      {simulationResult.consequence}
                    </p>
                  </div>
                )}
              </div>

              {/* Visualization */}
              <div className="lg:col-span-2">
                <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm h-full flex flex-col">
                  <h4 className="text-sm font-bold text-stone-500 uppercase mb-4 text-center">
                    Grafik Eskalasi Utang Budi
                  </h4>
                  <div className="chart-container">
                    <canvas ref={cultureChartRef}></canvas>
                  </div>
                  <p className="text-xs text-center text-stone-400 mt-2 italic">
                    Ilustrasi: Bagaimana {"'"}Budi{"'"} menumpuk menjadi beban
                    psikologis seiring waktu.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-stone-50 p-4 rounded-lg border-l-4 border-rose-500">
              <p className="text-stone-700 text-sm">
                <strong>Dampak Individu:</strong> Mereka yang menolak atau tidak
                mampu mengikuti arus ini menghadapi{" "}
                <em>pengucilan (isolasi sosial)</em>. Bukan karena mereka jahat,
                tapi karena mereka dianggap merusak sistem {'"'}perbankan sosial
                {'"'}
                informal ini.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: NEGARA (Structural Decay) */}
        <section
          id="negara"
          className="max-w-5xl mx-auto px-4 mb-24 scroll-mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4 serif">
              Kerusakan Epistemik: Saat Negara Berutang Budi
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Masalah memuncak ketika mentalitas {'"'}Jasa{'"'} ini masuk ke
              sistem negara. Kewajiban Konstitusional berubah menjadi Jasa
              Politik. Fakta dan Hukum menjadi tidak relevan, dikalahkan oleh
              transaksi.
            </p>
          </div>

          {/* Flow Diagram Logic */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-stone-200 -z-10 transform -translate-y-1/2"></div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                {
                  id: "decay-1",
                  step: 1,
                  title: "Kewajiban vs Jasa",
                  desc: 'Aparat melihat tugasnya sebagai "pemberian", bukan kewajiban.',
                  overlay:
                    '"Saya melindungi pembalak, maka pembalak harus setor ke saya."',
                  color: "bg-stone-800",
                },
                {
                  id: "decay-2",
                  step: 2,
                  title: "Distorsi Fakta",
                  desc: 'Kebenaran (illegal logging) disembunyikan demi menjaga "hubungan baik".',
                  overlay: "Fakta hukum kalah oleh 'Utang Budi' kolusi.",
                  color: "bg-rose-600",
                },
                {
                  id: "decay-3",
                  step: 3,
                  title: "Kerusakan Epistemik",
                  desc: "Masyarakat bingung membedakan benar/salah. Nalar publik rusak.",
                  overlay: "Bencana dianggap takdir, bukan kelalaian.",
                  color: "bg-stone-800",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm card-hover relative group cursor-pointer"
                  onClick={() =>
                    setActiveDecay(activeDecay === item.id ? null : item.id)
                  }
                >
                  <div
                    className={`w-12 h-12 ${item.color} text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold z-10 relative`}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-stone-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                  {/* Detail Overlay */}
                  {activeDecay === item.id && (
                    <div className="absolute top-0 left-0 w-full h-full bg-stone-900 text-white p-4 rounded-xl flex items-center justify-center text-sm z-20 fade-in">
                      {item.overlay}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-stone-400 mt-4">
              (Klik kartu untuk melihat logika internal)
            </p>
          </div>
        </section>

        {/* SECTION 5: KASUS (Sumatra Case Study) */}
        <section
          id="kasus"
          className="bg-stone-900 text-stone-100 py-20 mb-16 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded mb-4">
                  STUDI KASUS
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 serif leading-tight">
                  Tragedi Sumatra: <br />
                  Bencana yang {'"'}Dikecilkan{'"'}
                </h2>
                <p className="text-stone-300 mb-6 leading-relaxed">
                  Banjir bandang dan longsor di Sumatra bukan sekadar bencana
                  alam. Ini adalah{" "}
                  <strong>utang yang harus dibayar rakyat</strong> akibat
                  kelalaian negara menindak pembalakan liar.
                </p>
                <p className="text-stone-300 mb-6 leading-relaxed">
                  Meskipun skalanya masif dan lintas provinsi, status{" "}
                  <strong>Bencana Nasional</strong> tak kunjung turun. Publik
                  curiga: Apakah ini ketakutan akan investigasi internasional
                  yang bisa mengungkap {'"'}utang-utang{'"'} kolusi di balik
                  deforestasi?
                </p>
                <ul className="space-y-3 text-sm text-stone-400">
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2">⚠️</span> Temuan kayu
                    gelondongan berbekas gergaji (illegal logging).
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2">⚠️</span> Desakan pakar
                    & publik diabaikan.
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2">⚠️</span> Penolakan
                    status nasional demi menghindari sorotan.
                  </li>
                </ul>
              </div>

              {/* Data Viz: The Discrepancy */}
              <div className="bg-stone-800 p-6 rounded-xl border border-stone-700">
                <h3 className="text-lg font-bold text-white mb-2 text-center">
                  Kesenjangan Status Bencana
                </h3>
                <p className="text-xs text-stone-400 text-center mb-6">
                  Perbandingan Kriteria vs Respons Pemerintah
                </p>
                <div className="chart-container">
                  <canvas ref={disasterChartRef}></canvas>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: SOLUSI */}
        <section
          id="solusi"
          className="max-w-4xl mx-auto px-4 mb-20 scroll-mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4 serif">
              Jalan Pulang: Integritas & Profesionalisme
            </h2>
            <p className="text-stone-600">
              Untuk memulihkan nalar publik, kita harus memisahkan kembali
              antara Kewajiban dan Jasa. Solusi dimulai dari individu hingga
              negara.
            </p>
          </div>

          <div className="space-y-4">
            {/* Checklist Items */}
            {[
              {
                id: "sol-1",
                title: "Negara: Tuntut Kewajiban Mutlak",
                text: "Pelayanan publik dan penegakan hukum adalah kewajiban konstitusional, bukan 'kebaikan' pejabat yang harus dibalas dengan suara atau diam.",
              },
              {
                id: "sol-2",
                title: "Individu: Profesionalisme Kerja",
                text: "Lakukan pekerjaan sesuai prosedur. Jangan terima 'hadiah' yang mengikat keputusan profesional. Integritas berarti menolak intervensi utang budi.",
              },
              {
                id: "sol-3",
                title: "Etika: Kembali ke Ikhlas",
                text: "Memahami bahwa memberi adalah hadiah tanpa ekspektasi, dan menerima bukan berarti terikat budak. Hancurkan rantai transaksional di level personal.",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-start p-4 bg-white rounded-lg shadow-sm border border-stone-200"
              >
                <input
                  type="checkbox"
                  id={item.id}
                  className="mt-1 mr-4 h-5 w-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor={item.id} className="cursor-pointer">
                  <strong className="block text-stone-900 text-lg mb-1">
                    {item.title}
                  </strong>
                  <span className="text-stone-600 text-sm">{item.text}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center p-6 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-emerald-800 font-medium italic">
              {'"'}Jika kita bisa melakukan ini, kita akan mengurai rantai utang
              sosial yang membelenggu dan memulihkan nalar publik yang
              mendambakan keadilan.{'"'}
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="font-bold text-stone-200 mb-2">Nalar Publik</p>
            <p>
              Analisis Interaktif berdasarkan artikel {'"'}Mengupas Makna Utang
              Budi dalam Etika dan Budaya Indonesia{'"'}
            </p>
          </div>
          <div className="text-right">
            <p>
              Sumber Data:{" "}
              <a
                href="https://ugm.ac.id/id/berita/bencana-banjir-bandang-sumatra-pakar-ugm-sebut-akibat-kerusakan-ekosistem-hutan-di-hulu-das/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-emerald-400"
              >
                UGM
              </a>
              ,{" "}
              <a
                href="https://kbanews.com/hot-news/pemerintah-lamban-tangani-banjir-sumatera-krisis-manajemen-bencana-di-era-prabowo/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-emerald-400"
              >
                KBA News
              </a>
              ,{" "}
              <a
                href="https://umsida.ac.id/status-bencana-nasional-banjir-aceh-sumatera/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-emerald-400"
              >
                Umsida
              </a>
              .
            </p>
            <p className="mt-2 text-stone-600">
              &copy; 2025 Rahmat Hidayatullah.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
