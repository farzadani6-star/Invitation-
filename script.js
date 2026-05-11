function bukaUndangan() {
  const opening = document.getElementById("opening");

  const overlay = document.querySelector(".overlay");
  const judul = document.querySelector(".judul");
  const sub = document.querySelector(".sub");
  const tombol = document.querySelector(".btn-buka");
  const to = document.querySelector(".to");

  const titleJawa = document.querySelector(".judul-jawa");
  const lines = document.querySelectorAll(".line");
  const countdownBox = document.querySelector(".countdown-box");

  // 🔒 LOCK scroll saat opening
  document.body.classList.add("no-scroll");

  // 🔥 fade semua isi overlay
  if (overlay) overlay.style.opacity = "0";

  // fallback (kalau mau aman)
  if (judul) judul.style.opacity = "0";
  if (sub) sub.style.opacity = "0";
  if (tombol) tombol.style.opacity = "0";
  if (to) to.style.opacity = "0";

  // buka gerbang
  opening.classList.add("open");

  // judul jawa muncul
  setTimeout(() => {
    if (titleJawa) titleJawa.classList.add("show");
  }, 2000);

  // teks muncul satu-satu
  setTimeout(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add("show");
      }, i * 500);
    });
  }, 2800);

  // countdown muncul
  setTimeout(() => {
    if (countdownBox) countdownBox.classList.add("show");
  }, 2800 + (lines.length * 500));

  // 🔓 FINAL: hilangkan opening + play music
  setTimeout(() => {

    opening.style.display = "none";

    document.body.classList.remove("no-scroll");

    const music = document.getElementById("music");
    if (music) {
      music.play().catch(() => {});
    }

  }, 200 + (lines.length * 500) + 800);
}
// =========================
// COUNTDOWN (ANTI ERROR)
// =========================
window.addEventListener("DOMContentLoaded", () => {

  /* =========================
     COUNTDOWN
  ========================= */
  const targetDate = new Date("2026-12-12T09:00:00").getTime();

  function updateCountdown() {
    const hariEl = document.getElementById("hari");
    const jamEl = document.getElementById("jam");
    const menitEl = document.getElementById("menit");
    const detikEl = document.getElementById("detik");

    if (!hariEl || !jamEl || !menitEl || !detikEl) return;

    const now = new Date().getTime();
    const selisih = targetDate - now;

    if (selisih <= 0) {
      hariEl.innerText = 0;
      jamEl.innerText = 0;
      menitEl.innerText = 0;
      detikEl.innerText = 0;
      return;
    }

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih / (1000 * 60 * 60)) % 24);
    const menit = Math.floor((selisih / (1000 * 60)) % 60);
    const detik = Math.floor((selisih / 1000) % 60);

    hariEl.innerText = hari;
    jamEl.innerText = jam;
    menitEl.innerText = menit;
    detikEl.innerText = detik;
  }

  updateCountdown(); // biar langsung muncul
  setInterval(updateCountdown, 1000);


  /* =========================
     STORY SCROLL ANIMATION
  ========================= */
  const items = document.querySelectorAll(".story-item");

  if (items.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, {
      threshold: 0.3
    });

    items.forEach((item) => {
      observer.observe(item);
    });
  }

getNamaTamu();     // ambil dari URL dulu
syncNamaRSVP();    // baru masuk ke RSVP
loadDoa();
});

const mempelaiSection = document.getElementById("mempelai");

// ayat
const quran = document.querySelector(".quran-text");

// pria
const priaFoto = document.querySelector(".pria-row .foto");
const priaInfo = document.querySelector(".pria-row .info");

// wanita
const wanitaFoto = document.querySelector(".wanita-row .foto");
const wanitaInfo = document.querySelector(".wanita-row .info");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // ayat dulu
      setTimeout(() => {
        if (quran) quran.classList.add("show");
      }, 200);

      // pria
      setTimeout(() => {
        priaFoto.classList.add("show");
        priaInfo.classList.add("show");
      }, 800);

      // wanita
      setTimeout(() => {
        wanitaFoto.classList.add("show");
        wanitaInfo.classList.add("show");
      }, 1600);

    }
  });
}, { threshold: 0.4 });

if (mempelaiSection) {
  observer.observe(mempelaiSection);
}

const divider = document.querySelector(".divider");

const observerDivider = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (divider) divider.classList.add("show");
    }
  });
}, { threshold: 0.3 });

if (divider) {
  observerDivider.observe(divider);
}
setTimeout(() => {
  const tengah = document.querySelector(".tengah");
  if (tengah) tengah.classList.add("show");
}, 1200);

const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

// open modal
document.querySelectorAll(".polaroid img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;

    // trigger animation
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
  });
});

// close modal
function closeModal() {
  modal.classList.remove("show");

  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

closeBtn.onclick = closeModal;

modal.onclick = (e) => {
  if (e.target === modal) {
    closeModal();
  }
};

const targetAkad = new Date("2026-12-11T09:00:00").getTime();
const targetResepsi = new Date("2026-12-12T09:00:00").getTime();


function setReminder(type) {
  let target;

  if (type === "Akad") {
    target = targetAkad;
  } else if (type === "Resepsi") {
    target = targetResepsi;
  }

  const now = new Date().getTime();
  const selisih = target - now;

  if (selisih > 0) {
    const jam = Math.floor(selisih / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));

    showToast(`🔔 Pengingat ${type}\nSisa waktu: ${jam} jam ${menit} menit lagi`);
  } else {
    showToast(`📢 Acara ${type} sudah dimulai atau selesai`);
  }
}

function addToCalendar(type) {

  let title = "";
  let startDate = "";
  let endDate = "";
  let details = "Undangan Pernikahan";

  if (type === "akad") {
    title = "Akad Nikah Surere & Sulala";
    startDate = "20261211T090000";
    endDate   = "20261211T110000";
  }

  if (type === "resepsi") {
    title = "Resepsi Pernikahan Surere dan Sulala";
    startDate = "20261212T090000";
    endDate   = "20261212T150000";
  }

  const url = `https://www.google.com/calendar/render?action=TEMPLATE
  &text=${encodeURIComponent(title)}
  &dates=${startDate}/${endDate}
  &details=${encodeURIComponent(details)}
  &location=${encodeURIComponent("Madiun, Jawa Timur")}`.replace(/\s/g, "");

  window.open(url, "_blank");
}

function toggleLocation(el) {
  el.classList.toggle("open");
}

function toggleWallet(el){
  const wallet = el.querySelector(".wallet");
  wallet.classList.toggle("open");
}

let currentNumber = "";

/* =========================
   OPEN WALLET MODAL
========================= */
function openWallet(name, img, number){
  const modal = document.getElementById("walletModal");
  const logo = document.getElementById("walletLogo");
  const title = document.getElementById("walletName");
  const num = document.getElementById("walletNumber");

  currentNumber = number;

  // reset dulu biar loading smooth
  logo.style.opacity = "0";

  // tampilkan modal
  modal.style.display = "flex";

  // isi data
  title.innerText = name;
  num.innerText = number;

  // loading effect gambar
  setTimeout(() => {
    logo.src = img;
    logo.onload = () => {
      logo.style.opacity = "1";
    };
  }, 200);
}

/* =========================
   CLOSE MODAL
========================= */
function closeModalcard(){
  const modal = document.getElementById("walletModal");
  const logo = document.getElementById("walletLogo");

  modal.style.display = "none";

  // reset image biar gak flicker next open
  logo.src = "";
}

/* =========================
   COPY NUMBER (lebih modern UX)
========================= */
function copyNumber(){
  if(!currentNumber) return;

  navigator.clipboard.writeText(currentNumber).then(() => {
    // ganti showToast biar lebih smooth (opsional)
    showToast("Nomor berhasil di-copy!");
  });
}

/* =========================
   TOAST NOTIFICATION (bonus UX)
========================= */
function showToast(msg, type = "success"){
  let toast = document.createElement("div");

  toast.innerText = msg;

  // POSITION
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%) translateY(20px)";

  // STYLE
  toast.style.background = "rgba(0,0,0,0.85)";
  toast.style.color = "#f5e6c8";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "12px";
  toast.style.fontSize = "13px";
  toast.style.textAlign = "center";

  // BORDER + GLOW
  toast.style.border = type === "error"
    ? "1px solid rgba(255,77,77,0.6)"
    : "1px solid rgba(212,175,55,0.5)";

  toast.style.boxShadow = type === "error"
    ? "0 0 12px rgba(255,77,77,0.4)"
    : "0 0 12px rgba(212,175,55,0.4)";

  // EFFECT
  toast.style.backdropFilter = "blur(6px)";
  toast.style.webkitBackdropFilter = "blur(6px)";

  // ANIMATION
  toast.style.opacity = "0";
  toast.style.transition = "all 0.4s ease";

  toast.style.zIndex = "9999";

  document.body.appendChild(toast);

  // MASUK
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  }, 50);

  // KELUAR
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

function scrollToSection(id){
  const el = document.getElementById(id);
  if(el){
    el.scrollIntoView({behavior:"smooth"});
  }
}

/* MUSIC */
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = true; // dari opening sudah play

function toggleMusic(){

  if(music.paused){
    music.play();
    isPlaying = true;
    musicBtn.classList.add("music-active");
  } else {
    music.pause();
    isPlaying = false;
    musicBtn.classList.remove("music-active");
  }
}

let lastScroll = 0;
const nav = document.querySelector(".bottom-nav");

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;

  if(Math.abs(currentScroll - lastScroll) < 10) return; // biar ga sensitif

  if(currentScroll > lastScroll){
    nav.classList.add("hide");
  } else {
    nav.classList.remove("hide");
  }

  lastScroll = currentScroll;
});

function getNamaTamu(){
  const params = new URLSearchParams(window.location.search);
  let nama = params.get("to");

  const el = document.getElementById("namaTamu");

  if(el){
    if(nama){
      nama = decodeURIComponent(nama);
      el.innerText = nama;
    } else {
      el.innerText = "Tamu Spesial";
    }
  }
}

// jalanin saat halaman load
window.onload = () => {
  getNamaTamu();
};

const scriptURL = "https://script.google.com/macros/s/AKfycbxZCSPBlBO0pQ5PbGT9V0wQ8DOBaqIRBbcIvsyTnI_IOScGoiW2gfXS03sytZKrh-aU/exec";

function kirimRSVP(e){
  e.preventDefault();

  const nama = document.getElementById("rsvpNama")?.innerText || "Tamu";
  const hadir = document.getElementById("kehadiran")?.value;
  const jumlahInput = document.getElementById("jumlah");
  const pesan = document.getElementById("pesan")?.value || "";

  const jumlah = parseInt(jumlahInput?.value);

  // 🔒 VALIDASI
  if(!hadir){
    showToast("Pilih kehadiran dulu ya 🙏");
    return;
  }

  if(!jumlah || jumlah < 1){
    showToast("Minimal 1 orang");
    return;
  }

  if(jumlah > 5){
    showToast("Maksimal 5 orang ya 🙏");
    jumlahInput.value = 5;
    return;
  }

  // 🔥 DATA YANG DIKIRIM
  const data = {
    nama: nama,
    kehadiran: hadir,
    jumlah: jumlah,
    pesan: pesan
  };

  // 🔄 LOADING (optional UX)
  const btn = e.target.querySelector("button");
  if(btn){
    btn.innerText = "Mengirim...";
    btn.disabled = true;
  }

  // 🚀 KIRIM KE GOOGLE SHEETS
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    mode: "no-cors" // 🔥 WAJIB biar ga error di HP
  })
  .then(() => {

    showToast(`Terima kasih ${nama} 🙏\nData berhasil dikirim`);

    e.target.reset();

    if(btn){
      btn.innerText = "Kirim";
      btn.disabled = false;
    }

  })
  .catch((err) => {

    showToast("Gagal kirim, coba lagi ya!");

    console.error("RSVP Error:", err);

    if(btn){
      btn.innerText = "Kirim";
      btn.disabled = false;
    }

  });
}

function syncNamaRSVP(){
  const namaHero = document.getElementById("namaTamu");
  const rsvpNama = document.getElementById("rsvpNama");

  if(namaHero && rsvpNama){
    let nama = namaHero.innerText.trim();

    if(nama === "" || nama === "Tamu Undangan"){
      nama = "Tamu Spesial";
    }

    rsvpNama.innerText = nama;
  }
}

const doaURL = "https://script.google.com/macros/s/AKfycbxZCSPBlBO0pQ5PbGT9V0wQ8DOBaqIRBbcIvsyTnI_IOScGoiW2gfXS03sytZKrh-aU/exec";

function loadDoa(){
  fetch(doaURL)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("doaList");

      container.innerHTML = "";

      data.reverse().forEach((item, i) => {
        if(!item.pesan) return;

        const card = document.createElement("div");
        card.className = "doa-card";

        card.innerHTML = `
          <div class="doa-name">${item.nama}</div>
          <div class="doa-msg">${item.pesan}</div>
        `;

        container.appendChild(card);

        setTimeout(() => {
          card.classList.add("show");
        }, i * 100);
      });
    })
    .catch(() => {
      document.getElementById("doaList").innerHTML =
        "<p>Gagal memuat ucapan</p>";
    });
}

