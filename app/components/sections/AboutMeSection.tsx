import { GreenText } from "../GreenText";

export function AboutMeSection() {
  return (
    <section className="container flex flex-col md:flex-row gap-10 md:gap-14 py-24">
      <div className="shrink-0 max-w-[400px] md:max-w-[295px] space-y-3 md:space-y-6">
        <div className="space-y-1 md:space-y-3">
          <h2 className="text-3xl/[40px] sm:text-4xl/[44px] tracking-[-1.5px] font-bold">
            Siapa <GreenText>Saya</GreenText>?
          </h2>
          <p className="text-base/[24px] tracking-[-0.4px]">
            Sedikit tentang saya di dunia web dan hal-hal yang bikin saya betah
            ngulik.
          </p>
        </div>
        <a
          href="https://drive.google.com/file/d/1MvSPb6mB1oKSev2R-l9FDJ4F61M3Ijw0/view"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base/[24px] tracking-[-0.35px] font-bold text-accent hover:text-text-accent animate-hover inline-block"
        >
          <u>Unduh CV</u> ↗
        </a>
      </div>
      <div className="w-full">
        <div className="space-y-6 text-base/[24px] tracking-[-0.35px]">
          <p>
            Saya tidak langsung datang dari dunia teknologi, tapi rasa ingin
            tahu saya ke arah sana sudah tumbuh sejak lama. Waktu SMA, saya
            senang <strong>install ulang Windows</strong> dan ngoprek komputer
            teman — sekadar penasaran bagaimana semuanya bisa bekerja.
          </p>
          <p>
            Lalu saya justru melangkah ke jalur yang sama sekali berbeda: kuliah
            di <strong>Pendidikan Bahasa Arab (PBA)</strong>. Di sana, saya
            belajar tentang struktur bahasa dan cara menyampaikan makna —
            sesuatu yang, tanpa saya sadari, punya banyak kesamaan dengan dunia
            pemrograman. Di sela-sela kuliah, ketertarikan saya pada desain dan
            video grafis makin kuat, sampai akhirnya saya meraih juara pertama
            lomba{" "}
            <a
              href="https://youtu.be/LhPnxK-lPE8?si=2w-MaGbgcO6sfg7L"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-accent animate-hover inline-block"
            >
              video iklan berbahasa Arab
            </a>
            .
          </p>
          <p>
            Dari situ, rasa ingin tahu saya berubah arah: bagaimana kalau visual
            dan logika digabung? Pertanyaan itu membawa saya ke bootcamp
            Fullstack Web Arkademy (sekarang menjadi <strong>Pijar Camp</strong>{" "}
            dan <strong>Fazztrack</strong>
            ), dan sejak itu saya menekuni dunia frontend development. Sekarang
            saya bekerja sebagai Frontend Developer di Kulina, sambil terus
            bereksperimen dengan desain, animasi, dan hal-hal visual di waktu
            luang.
          </p>
          <p>
            Bagi saya, web adalah tempat di mana logika dan rasa bisa bertemu —
            dan di sanalah saya terus ingin tumbuh.
          </p>
        </div>
      </div>
    </section>
  );
}
