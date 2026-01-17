/* =========================
   Digital Clock (12 Hour)
========================= */
function updateClock() {
    const clock = document.getElementById("digital-clock");
    if (!clock) return;

    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert to 12-hour format
    hours = String(hours).padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds} ${period}`;
}

// Initial call
updateClock();

// Update every second
setInterval(updateClock, 1000);

/* =========================
   Loader Handling
========================= */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return;

    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
    }, 600);
});