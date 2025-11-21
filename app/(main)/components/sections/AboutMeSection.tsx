import { GreenText } from "../GreenText";

export function AboutMeSection() {
  return (
    <section className="container py-16 md:py-20">
      {/* Header Section with Gradient Background */}
      <div className="relative mb-12 md:mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-calm/5 rounded-3xl blur-3xl"></div>
        <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center justify-between p-8 md:p-10 rounded-2xl border border-accent/10 bg-background/80 backdrop-blur-sm">
          <div className="flex-1 space-y-2 md:space-y-3">
            <h2 className="text-4xl/[48px] md:text-5xl/[60px] tracking-[-1.5px] font-bold">
              Siapa <GreenText>Saya</GreenText>?
            </h2>
            <p className="text-base/[24px] md:text-lg/[28px] tracking-[-0.4px] text-foreground/80">
              Sedikit tentang saya di dunia web dan hal-hal yang bikin saya betah ngulik.
            </p>
          </div>
          <a
            href="https://drive.usercontent.google.com/u/0/uc?id=1MvSPb6mB1oKSev2R-l9FDJ4F61M3Ijw0&export=download"
            rel="noopener noreferrer"
            className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-hover active:bg-accent-active text-white font-bold text-sm tracking-[-0.25px] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Unduh CV
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Timeline Journey Cards */}
      <div className="space-y-6 md:space-y-8">
        {/* Phase 1: High School - Tech Curiosity */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-calm/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
          <div className="relative flex gap-4 md:gap-6 p-6 md:p-8 rounded-xl border border-foreground/10 bg-background hover:border-accent/30 transition-all duration-300">
            <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/20">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wide uppercase rounded-full bg-accent/10 text-accent border border-accent/20">
                SMA • Awal Rasa Ingin Tahu
              </div>
              <p className="text-base/[28px] tracking-[-0.35px]">
                Saya tidak langsung datang dari dunia teknologi, tapi rasa ingin tahu saya ke arah sana sudah tumbuh sejak lama. Waktu SMA, saya senang <span className="font-bold text-accent px-1.5 py-0.5 rounded bg-accent/5">install ulang Windows</span> dan ngoprek komputer teman — sekadar penasaran bagaimana semuanya bisa bekerja.
              </p>
            </div>
          </div>
        </div>

        {/* Phase 2: College - Language & Structure */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-calm/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
          <div className="relative flex gap-4 md:gap-6 p-6 md:p-8 rounded-xl border border-foreground/10 bg-background hover:border-calm/30 transition-all duration-300">
            <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-calm/10 to-calm/5 flex items-center justify-center border border-calm/20">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-calm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wide uppercase rounded-full bg-calm/10 text-calm border border-calm/20">
                Kuliah • Bahasa & Desain
              </div>
              <p className="text-base/[28px] tracking-[-0.35px]">
                Lalu saya justru melangkah ke jalur yang sama sekali berbeda: kuliah di <span className="font-bold text-calm px-1.5 py-0.5 rounded bg-calm/5">Pendidikan Bahasa Arab (PBA)</span>. Di sana, saya belajar tentang struktur bahasa dan cara menyampaikan makna — sesuatu yang, tanpa saya sadari, punya banyak kesamaan dengan dunia pemrograman. Di sela-sela kuliah, ketertarikan saya pada desain dan video grafis makin kuat, sampai akhirnya saya meraih juara pertama lomba{" "}
                <a
                  href="https://youtu.be/LhPnxK-lPE8?si=2w-MaGbgcO6sfg7L"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-text-calm hover:text-calm animate-hover inline-flex items-center gap-1 underline decoration-calm/30 hover:decoration-calm"
                >
                  video iklan berbahasa Arab
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>.
              </p>
            </div>
          </div>
        </div>

        {/* Phase 3: Bootcamp - The Turning Point */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-calm/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
          <div className="relative flex gap-4 md:gap-6 p-6 md:p-8 rounded-xl border border-foreground/10 bg-background hover:border-accent/30 transition-all duration-300">
            <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-accent/10 to-calm/10 flex items-center justify-center border border-accent/20">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wide uppercase rounded-full bg-gradient-to-r from-accent/10 to-calm/10 text-accent border border-accent/20">
                Bootcamp • Titik Balik
              </div>
              <p className="text-base/[28px] tracking-[-0.35px]">
                Dari situ, rasa ingin tahu saya berubah arah: bagaimana kalau visual dan logika digabung? Pertanyaan itu membawa saya ke bootcamp Fullstack Web Arkademy (sekarang menjadi <span className="font-bold text-accent px-1.5 py-0.5 rounded bg-accent/5">Pijar Camp</span> dan <span className="font-bold text-accent px-1.5 py-0.5 rounded bg-accent/5">Fazztrack</span>), dan sejak itu saya menekuni dunia frontend development.
              </p>
            </div>
          </div>
        </div>

        {/* Phase 4: Current - Professional Frontend Developer */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-calm/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
          <div className="relative flex gap-4 md:gap-6 p-6 md:p-8 rounded-xl border border-foreground/10 bg-background hover:border-calm/30 transition-all duration-300">
            <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-calm/10 to-accent/10 flex items-center justify-center border border-calm/20">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-calm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wide uppercase rounded-full bg-calm/10 text-calm border border-calm/20">
                Sekarang • Frontend Developer
              </div>
              <p className="text-base/[28px] tracking-[-0.35px]">
                Sekarang saya bekerja sebagai <span className="font-bold text-calm px-1.5 py-0.5 rounded bg-calm/5">Frontend Developer di Kulina</span>, sambil terus bereksperimen dengan desain, animasi, dan hal-hal visual di waktu luang.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Statement with Accent */}
        <div className="relative mt-8 md:mt-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-calm/5 to-accent/5 rounded-2xl blur-xl"></div>
          <div className="relative p-8 md:p-10 rounded-xl border border-accent/20 bg-gradient-to-br from-accent/5 via-transparent to-calm/5">
            <p className="text-lg/[32px] md:text-xl/[36px] tracking-[-0.5px] font-medium text-center">
              Bagi saya, web adalah tempat di mana{" "}
              <span className="font-bold text-accent">logika</span> dan{" "}
              <span className="font-bold text-calm">rasa</span> bisa bertemu — dan di sanalah saya terus ingin tumbuh.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
