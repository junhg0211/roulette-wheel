let roulette, rouletteBall;
let result;

const sequence = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

function setResult(r) {
  result.innerText = r;
}

function roll() {
  const start = new Date();
  const duration = 1000 * 9;
  const direction = Math.random() > 0.5 ? 1 : -1;

  const r1 = Math.random() * Math.PI * 2;
  const r2 = Math.random() * Math.PI * 2;

  const delta = (Math.PI / 37 - r2) % ((Math.PI * 2) / 37);

  let interval = setInterval(() => {
    now = new Date();
    const dt = (now - start) / duration;

    const rtheta = Math.pow(dt - 1, 2) * 50 * direction + r1;
    const theta = Math.pow(dt - 1, 7) * 30 * direction + r2 + rtheta + delta;
    const dr = Math.pow(dt - 1, 2) * 70 * (Math.random() / 6 + 1);
    const scale =
      (Math.pow(2 * (dt - 0.5), 4) - 2 * Math.pow(2 * (dt - 0.5), 2) + 1) *
        0.8 +
      1;

    // render
    roulette.style.transform = `rotate(${-rtheta}rad)`;

    const rbRect = rouletteBall.getBoundingClientRect();

    const cx = 512 / 2 - rbRect.width / 2;
    const cy = 512 / 2 - rbRect.height / 2;
    const r = 160 + dr;
    const dx = r * Math.cos(theta);
    const dy = r * Math.sin(theta);
    const x = cx + dx;
    const y = cy + dy;
    rouletteBall.style.top = `${x}px`;
    rouletteBall.style.left = `${y}px`;
    rouletteBall.style.transform = `scale(${scale})`;

    const index = Math.round((rtheta - theta) / ((Math.PI * 2) / 37) - 0.5);
    setResult(sequence[(37 * 10 + index + 38 / 2) % 37]);
  }, 1000 / 60);

  setTimeout(() => {
    clearInterval(interval);
  }, duration);
}

document.addEventListener("DOMContentLoaded", () => {
  roulette = document.querySelector("#roulette");
  rouletteBall = document.querySelector("#roulette-ball");
  result = document.querySelector("#result");
});
