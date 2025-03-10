
const track = document.getElementById("container-track");
const sections = document.querySelectorAll(".section");
const sidebar = document.querySelector(".sidebar");
const sectionCount = sections.length;
const step = 10 / (sectionCount - 1);

let isHorizontal = window.innerWidth > 768;

// Mise à jour de la visibilité de la sidebar
const updateSidebarVisibility = () => {
    const currentPercentage = parseFloat(track.dataset.prevPercentage || "0") || 0;

    if (isHorizontal && currentPercentage >= -5) {
        sidebar.classList.add("visible");
    } else {
        sidebar.classList.remove("visible");
    }
};

// Gestion de la responsivité
window.addEventListener("resize", () => {
    isHorizontal = window.innerWidth > 768;
    resetTrackPosition();
});

function resetTrackPosition() {
    track.dataset.prevPercentage = "0";
    track.style.transform = isHorizontal ? `translate(0%, -50%)` : `translate(-50%, 0%)`;
    updateSidebarVisibility();
}

// Gestion des touches de direction
window.addEventListener("keydown", e => {
    let currentPercentage = parseFloat(track.dataset.prevPercentage || "0");

    if (e.key === "ArrowDown") {
        currentPercentage -= step;
    } else if (e.key === "ArrowUp") {
        currentPercentage += step;
    } else if (isHorizontal && e.key === "ArrowLeft") {
        currentPercentage += step;
    } else if (isHorizontal && e.key === "ArrowRight") {
        currentPercentage -= step;
    } else {
        return;
    }

    currentPercentage = Math.max(Math.min(currentPercentage, 0), -100);

    track.dataset.prevPercentage = currentPercentage;
    if (isHorizontal) {
        track.style.transform = `translate(${currentPercentage}%, -50%)`;
    } else {
        track.style.transform = `translate(-50%, ${currentPercentage}%)`;
    }

    updateSidebarVisibility();
});

// Gestion du défilement avec la souris
window.addEventListener("wheel", e => {
    let currentPercentage = parseFloat(track.dataset.prevPercentage || "0");
    const delta = Math.sign(e.deltaY);

    if (delta > 0) {
        currentPercentage -= step;
    } else {
        currentPercentage += step;
    }

    currentPercentage = Math.max(Math.min(currentPercentage, 0), -100);

    track.dataset.prevPercentage = currentPercentage;
    if (isHorizontal) {
        track.style.transform = `translate(${currentPercentage}%, -50%)`;
    } else {
        track.style.transform = `translate(-50%, ${currentPercentage}%)`;
    }

    updateSidebarVisibility();
});

window.addEventListener("wheel", e => e.preventDefault(), { passive: false });
