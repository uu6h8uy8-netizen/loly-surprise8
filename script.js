const PASSWORD = "3/23";
const song = document.getElementById("song");
const musicBtn = document.getElementById("musicBtn");
const screens = [...document.querySelectorAll(".screen")];

function show(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top: 0, behavior: "smooth"});
}
document.getElementById("unlock").addEventListener("click", async () => {
  const value = document.getElementById("password").value.trim();
  if (value !== PASSWORD) {
    document.getElementById("error").textContent = "الكلمة مش مظبوطة.. جربي تاني يا لولي ♡";
    return;
  }
  document.getElementById("error").textContent = "";
  show("welcome");
  musicBtn.hidden = false;
  try { await song.play(); musicBtn.innerHTML = "♫ <span>إيقاف الأغنية</span>"; }
  catch { musicBtn.innerHTML = "♫ <span>تشغيل الأغنية</span>"; }
});
document.getElementById("password").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("unlock").click();
});
musicBtn.addEventListener("click", async () => {
  if (song.paused) {
    try { await song.play(); musicBtn.innerHTML = "♫ <span>إيقاف الأغنية</span>"; }
    catch { musicBtn.innerHTML = "♫ <span>تعذر التشغيل</span>"; }
  } else {
    song.pause(); musicBtn.innerHTML = "♫ <span>تشغيل الأغنية</span>";
  }
});
document.querySelectorAll(".next").forEach(btn => btn.addEventListener("click", () => show(btn.dataset.next)));
document.getElementById("again").addEventListener("click", () => {
  song.pause(); song.currentTime = 0; musicBtn.hidden = true;
  musicBtn.innerHTML = "♫ <span>تشغيل الأغنية</span>";
  document.getElementById("password").value = "";
  show("gate");
});

const start = new Date(2026, 2, 23, 3, 0, 0); // Local time: 23 March 2026, 03:00
function updateCounter() {
  let diff = Math.max(0, Date.now() - start.getTime());
  const day = 86400000, hour = 3600000, minute = 60000;
  const d = Math.floor(diff / day); diff %= day;
  const h = Math.floor(diff / hour); diff %= hour;
  const m = Math.floor(diff / minute); const s = Math.floor((diff % minute) / 1000);
  document.getElementById("days").textContent = d.toLocaleString("ar-EG");
  document.getElementById("hours").textContent = h.toLocaleString("ar-EG");
  document.getElementById("minutes").textContent = m.toLocaleString("ar-EG");
  document.getElementById("seconds").textContent = s.toLocaleString("ar-EG");
}
updateCounter(); setInterval(updateCounter, 1000);
