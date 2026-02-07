let escapeCount = 0;
let yesScale = 1;

setInterval(() => {
  yesScale += 0.03;
  yesBtn.style.transform = `translateX(-130%) scale(${yesScale})`;
}, 2500);

const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const arena = document.querySelector(".arena");
const popup = document.getElementById("popup");

function moveNo() {
  escapeCount++;

  const arenaRect = arena.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  // faster movement each time
  const speed = Math.max(0.05, 0.25 - escapeCount * 0.02);
  noBtn.style.transition = `left ${speed}s ease-out, bottom ${speed}s ease-out`;

  let x, y, overlap;

  do {
    // farther jumps each time
    const factor = Math.min(1 + escapeCount * 0.4, 3);

    x = Math.random() * (arenaRect.width - noRect.width) * factor;
    y = Math.random() * (arenaRect.height - noRect.height) * factor;

    x = Math.min(x, arenaRect.width - noRect.width);
    y = Math.min(y, arenaRect.height - noRect.height);

    const noFuture = {
      left: arenaRect.left + x,
      right: arenaRect.left + x + noRect.width,
      top: arenaRect.top + y,
      bottom: arenaRect.top + y + noRect.height
    };

    overlap = !(
      noFuture.right < yesRect.left ||
      noFuture.left > yesRect.right ||
      noFuture.bottom < yesRect.top ||
      noFuture.top > yesRect.bottom
    );
  } while (overlap);

  noBtn.style.left = `${x}px`;
  noBtn.style.bottom = `${y}px`;
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", moveNo);

const chimeSound = document.getElementById("chimeSound");

yesBtn.addEventListener("click", () => {
  chimeSound.currentTime = 0;
  chimeSound.play();

  fireConfetti();
  popup.style.display = "flex";
});


function closePopup() {
  popup.style.display = "none";
}

function fireConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });

  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.7 }
    });
  }, 300);
}


const heartContainer = document.querySelector(".floating-hearts");
const hearts = ["💖", "💕", "💘", "💝", "💗", "💓", "💞"];

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart-float";
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  const size = Math.random() * 16 + 14; // 14px - 30px
  heart.style.fontSize = `${size}px`;

  // RANDOM position across entire screen
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-30px";

  const duration = Math.random() * 6 + 6; // 6s - 12s
  heart.style.animationDuration = `${duration}s`;

  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// control density here 👇
setInterval(createHeart, 300);
